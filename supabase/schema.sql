-- =====================================================
-- C_ALIGO - Esquema de base de datos (Supabase / PostgreSQL)
-- Ejecutar en: Supabase > SQL Editor, UNA sola vez en un proyecto limpio
-- (no es idempotente: `create type` y los datos iniciales fallan al repetirse).
-- =====================================================

-- ---------- TIPOS ----------
create type rol_usuario as enum ('presidente', 'vicepresidente', 'coordinador', 'miembro');
create type estado_usuario as enum ('pendiente', 'activo', 'inactivo');
create type area_carrera as enum ('programacion', 'ciberseguridad', 'redes');
create type estado_proyecto as enum ('idea', 'en_progreso', 'pausado', 'terminado');
create type tipo_evento as enum ('workshop', 'charla', 'hackathon', 'gira', 'stand', 'reunion');
create type tipo_material as enum ('link', 'documento', 'video', 'curso');

-- ---------- PERFILES ----------
-- Se crea automáticamente al iniciar sesión con GitHub
create table perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  usuario_github text unique,
  avatar_url text,
  carrera text,
  area area_carrera,
  bio text,
  rol rol_usuario not null default 'miembro',
  estado estado_usuario not null default 'pendiente',
  puzzle_resuelto_en timestamptz,
  ultima_actividad timestamptz default now(),
  creado_en timestamptz default now()
);

-- ---------- BADGES ----------
create table badges (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  icono_url text,
  proyecto_id uuid, -- opcional: badge ligado a un proyecto
  creado_en timestamptz default now()
);

create table perfil_badges (
  perfil_id uuid references perfiles(id) on delete cascade,
  badge_id uuid references badges(id) on delete cascade,
  otorgado_en timestamptz default now(),
  primary key (perfil_id, badge_id)
);

-- ---------- PROYECTOS ----------
create table proyectos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  estado estado_proyecto not null default 'idea',
  repo_github text, -- formato: usuario/repositorio
  imagen_url text,
  responsable_id uuid references perfiles(id),
  creado_en timestamptz default now()
);

alter table badges
  add constraint badges_proyecto_fk foreign key (proyecto_id) references proyectos(id) on delete set null;

create table proyecto_miembros (
  proyecto_id uuid references proyectos(id) on delete cascade,
  perfil_id uuid references perfiles(id) on delete cascade,
  funcion text, -- ej: frontend, backend, pentesting
  unido_en timestamptz default now(),
  primary key (proyecto_id, perfil_id)
);

-- ---------- FOROS (tipo Discord) ----------
create table foros (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  foro_padre_id uuid references foros(id) on delete cascade, -- null = foro general
  orden int default 0,
  creado_en timestamptz default now()
);

create table hilos (
  id uuid primary key default gen_random_uuid(),
  foro_id uuid references foros(id) on delete cascade,
  titulo text not null,
  autor_id uuid references perfiles(id),
  fijado boolean default false,
  creado_en timestamptz default now()
);

create table mensajes (
  id uuid primary key default gen_random_uuid(),
  hilo_id uuid references hilos(id) on delete cascade,
  autor_id uuid references perfiles(id),
  contenido text not null,
  creado_en timestamptz default now(),
  editado_en timestamptz
);

-- ---------- EVENTOS ----------
create table eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  tipo tipo_evento not null,
  fecha_inicio timestamptz not null,
  fecha_fin timestamptz,
  lugar text,
  validado_utp boolean default false,
  creado_por uuid references perfiles(id),
  creado_en timestamptz default now()
);

create table evento_asistentes (
  evento_id uuid references eventos(id) on delete cascade,
  perfil_id uuid references perfiles(id) on delete cascade,
  primary key (evento_id, perfil_id)
);

-- ---------- EVIDENCIAS (inicio) ----------
create table evidencias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  fotos text[] default '{}', -- URLs de Supabase Storage
  evento_id uuid references eventos(id) on delete set null,
  proyecto_id uuid references proyectos(id) on delete set null,
  publicado_por uuid references perfiles(id),
  fecha date default current_date,
  creado_en timestamptz default now()
);

-- ---------- MATERIALES DE ESTUDIO ----------
create table materiales (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  tipo tipo_material not null,
  url text not null,
  tema text, -- ej: Python, C#, Pentesting
  subido_por uuid references perfiles(id),
  creado_en timestamptz default now()
);

-- ---------- HERRAMIENTAS ----------
create table herramientas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  categoria text, -- ej: Editor, Diseño, Control de versiones
  url_descarga text not null,
  icono_url text,
  orden int default 0
);

-- ---------- NOTICIAS (se llenan con Vercel Cron) ----------
create table noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  resumen text,
  url text unique not null,
  fuente text,
  publicado_en timestamptz,
  creado_en timestamptz default now()
);

-- =====================================================
-- FUNCIONES DE APOYO
-- =====================================================

-- Todas las funciones `security definer` fijan `search_path = ''` y usan nombres
-- con esquema (public.perfiles). Así no dependen de quién las llame: el trigger de
-- auth.users corre como supabase_auth_admin, cuyo search_path no incluye `public`.

-- ¿El usuario actual es de la directiva?
create or replace function public.es_directiva()
returns boolean language sql security definer stable set search_path = '' as $$
  select exists (
    select 1 from public.perfiles
    where id = auth.uid() and rol in ('presidente', 'vicepresidente', 'coordinador')
  );
$$;

-- ¿El usuario actual ya pasó el puzzle?
create or replace function public.es_miembro_activo()
returns boolean language sql security definer stable set search_path = '' as $$
  select exists (
    select 1 from public.perfiles
    where id = auth.uid() and estado in ('activo', 'inactivo')
  );
$$;

-- Crear perfil automáticamente al registrarse con GitHub.
-- GitHub no siempre manda `full_name` (si el usuario no puso nombre), por eso hay
-- varios respaldos: si `nombre` quedara null, el registro completo fallaría.
create or replace function public.crear_perfil_nuevo()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.perfiles (id, nombre, usuario_github, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'user_name',
      new.raw_user_meta_data->>'preferred_username',
      'Miembro nuevo'
    ),
    coalesce(new.raw_user_meta_data->>'user_name', new.raw_user_meta_data->>'preferred_username'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function crear_perfil_nuevo();

-- =====================================================
-- SEGURIDAD (Row Level Security)
-- =====================================================
alter table perfiles enable row level security;
alter table badges enable row level security;
alter table perfil_badges enable row level security;
alter table proyectos enable row level security;
alter table proyecto_miembros enable row level security;
alter table foros enable row level security;
alter table hilos enable row level security;
alter table mensajes enable row level security;
alter table eventos enable row level security;
alter table evento_asistentes enable row level security;
alter table evidencias enable row level security;
alter table materiales enable row level security;
alter table herramientas enable row level security;
alter table noticias enable row level security;

-- Público (sin login): inicio, eventos, proyectos, herramientas, noticias
create policy "publico ve evidencias" on evidencias for select using (true);
-- Las reuniones son internas: solo las ven los miembros que pasaron el puzzle
create policy "publico ve eventos" on eventos for select using (tipo <> 'reunion' or es_miembro_activo());
create policy "publico ve proyectos" on proyectos for select using (true);
create policy "publico ve herramientas" on herramientas for select using (true);
create policy "publico ve noticias" on noticias for select using (true);
create policy "publico ve perfiles" on perfiles for select using (true);
create policy "publico ve badges" on badges for select using (true);
create policy "publico ve perfil_badges" on perfil_badges for select using (true);
create policy "publico ve proyecto_miembros" on proyecto_miembros for select using (true);

-- Cada uno edita su propio perfil; la directiva puede editar cualquiera (asignar roles)
create policy "editar mi perfil" on perfiles for update using (id = auth.uid());
create policy "directiva edita perfiles" on perfiles for update using (es_directiva());

-- Protección: un miembro NO puede cambiarse a sí mismo rol, estado ni puzzle,
-- ni su usuario de GitHub (es la URL pública de su perfil y viene de OAuth).
-- Solo la directiva o el servidor (service role, donde auth.uid() es null) pueden.
create or replace function public.proteger_campos_perfil()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is not null and not public.es_directiva() then
    new.rol := old.rol;
    new.estado := old.estado;
    new.puzzle_resuelto_en := old.puzzle_resuelto_en;
    new.usuario_github := old.usuario_github;
    new.creado_en := old.creado_en;
  end if;
  return new;
end;
$$;

create trigger proteger_perfil
  before update on perfiles
  for each row execute function proteger_campos_perfil();

-- Solo miembros que pasaron el puzzle: foros y materiales
create policy "miembros ven foros" on foros for select using (es_miembro_activo());
create policy "miembros ven hilos" on hilos for select using (es_miembro_activo());
create policy "miembros crean hilos" on hilos for insert with check (es_miembro_activo() and autor_id = auth.uid());
create policy "miembros ven mensajes" on mensajes for select using (es_miembro_activo());
create policy "miembros escriben" on mensajes for insert with check (es_miembro_activo() and autor_id = auth.uid());
create policy "editar mi mensaje" on mensajes for update using (autor_id = auth.uid());
create policy "miembros ven materiales" on materiales for select using (es_miembro_activo());
create policy "miembros suben materiales" on materiales for insert with check (es_miembro_activo() and subido_por = auth.uid());
create policy "miembros se inscriben" on evento_asistentes for insert with check (es_miembro_activo() and perfil_id = auth.uid());
create policy "miembros se desinscriben" on evento_asistentes for delete using (perfil_id = auth.uid());
create policy "miembros ven asistentes" on evento_asistentes for select using (es_miembro_activo());

-- Solo directiva: crear/editar contenido oficial
create policy "directiva eventos" on eventos for all using (es_directiva());
create policy "directiva evidencias" on evidencias for all using (es_directiva());
create policy "directiva proyectos" on proyectos for all using (es_directiva());
create policy "directiva proyecto_miembros" on proyecto_miembros for all using (es_directiva());
create policy "directiva badges" on badges for all using (es_directiva());
create policy "directiva perfil_badges" on perfil_badges for all using (es_directiva());
create policy "directiva foros" on foros for all using (es_directiva());
create policy "directiva fija hilos" on hilos for update using (es_directiva());
create policy "directiva herramientas" on herramientas for all using (es_directiva());
create policy "directiva modera mensajes" on mensajes for delete using (es_directiva() or autor_id = auth.uid());

-- =====================================================
-- PERMISOS DE LA API (PostgREST)
-- RLS decide qué filas; estos GRANT deciden qué tablas expone la API.
-- Supabase los da por defecto en `public`, pero se dejan explícitos por si el
-- proyecto se crea con la exposición automática desactivada.
-- =====================================================
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
grant execute on function public.es_directiva(), public.es_miembro_activo() to anon, authenticated;

-- =====================================================
-- ÍNDICES (llaves foráneas y columnas por las que se filtra u ordena)
-- =====================================================
create index on hilos (foro_id);
create index on mensajes (hilo_id, creado_en);
create index on mensajes (autor_id);
create index on eventos (fecha_inicio);
create index on evento_asistentes (perfil_id);
create index on evidencias (fecha desc);
create index on evidencias (evento_id);
create index on evidencias (proyecto_id);
create index on proyecto_miembros (perfil_id);
create index on perfil_badges (badge_id);
create index on badges (proyecto_id);
create index on materiales (creado_en desc);
create index on foros (foro_padre_id);
create index on noticias (publicado_en desc);

-- =====================================================
-- REALTIME (§7.6): los mensajes nuevos llegan sin recargar
-- =====================================================
alter publication supabase_realtime add table mensajes;

-- =====================================================
-- STORAGE (§8.5): 3 buckets públicos de lectura
-- La lectura pública no necesita política (bucket público). Subir y borrar sí.
-- Archivos nombrados como {uuid}-{nombre-limpio}.
-- =====================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('evidencias', 'evidencias', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('badges', 'badges', true, 1048576, array['image/png', 'image/svg+xml', 'image/webp']),
  ('materiales', 'materiales', true, 20971520, null)
on conflict (id) do nothing;

-- Una política por bucket (bucket_id = '...'): así el dashboard las muestra en cada bucket.
create policy "directiva sube evidencias" on storage.objects for insert to authenticated
  with check (bucket_id = 'evidencias' and public.es_directiva());
create policy "directiva borra evidencias" on storage.objects for delete to authenticated
  using (bucket_id = 'evidencias' and public.es_directiva());
create policy "directiva sube badges" on storage.objects for insert to authenticated
  with check (bucket_id = 'badges' and public.es_directiva());
create policy "directiva borra badges" on storage.objects for delete to authenticated
  using (bucket_id = 'badges' and public.es_directiva());
create policy "miembros suben archivos de materiales" on storage.objects for insert to authenticated
  with check (bucket_id = 'materiales' and public.es_miembro_activo());
create policy "autor o directiva borra archivos de materiales" on storage.objects for delete to authenticated
  using (bucket_id = 'materiales' and (owner_id = auth.uid()::text or public.es_directiva()));

-- =====================================================
-- INACTIVIDAD AUTOMÁTICA (activar extensión pg_cron en Supabase)
-- Días por definir: aquí se deja 30 como valor provisional
-- =====================================================
-- create extension if not exists pg_cron;
-- select cron.schedule('marcar-inactivos', '0 3 * * *', $$
--   update perfiles set estado = 'inactivo'
--   where estado = 'activo' and ultima_actividad < now() - interval '30 days';
-- $$);

-- =====================================================
-- DATOS INICIALES
-- =====================================================
insert into foros (nombre, descripcion, orden) values
  ('General', 'Conversación libre de la comunidad', 1),
  ('Programación', 'Python, C, C#, Java y más', 2),
  ('Ciberseguridad', 'Pentesting, HackTheBox, CTFs', 3),
  ('Redes', 'Infraestructura y redes informáticas', 4),
  ('IA y Agentes', 'Inteligencia artificial y agentes', 5);

insert into herramientas (nombre, categoria, url_descarga, orden) values
  ('GitHub Desktop', 'Control de versiones', 'https://desktop.github.com', 1),
  ('VS Code', 'Editor', 'https://code.visualstudio.com/download', 2),
  ('NetBeans', 'IDE', 'https://netbeans.apache.org/download', 3),
  ('Figma', 'Diseño', 'https://www.figma.com/downloads', 4),
  ('Framer', 'Diseño web', 'https://www.framer.com', 5),
  ('Blender', '3D', 'https://www.blender.org/download', 6);
