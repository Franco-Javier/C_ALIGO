-- =====================================================
-- C_ALIGO · Datos de prueba (OPCIONAL)
-- Ejecutar en el SQL Editor de Supabase DESPUÉS de schema.sql.
--
-- - No crea usuarios: los perfiles nacen al entrar con GitHub (trigger crear_perfil_nuevo).
--   Por eso el contenido no tiene autor (creado_por, publicado_por... = null).
-- - Fechas relativas a now(): los "próximos eventos" siguen siéndolo.
-- - Todos los ids empiezan por 5eed0000: se pueden borrar con el bloque del final.
-- - Es idempotente (on conflict do nothing): se puede ejecutar varias veces.
-- =====================================================
begin;

-- ---------- Eventos ----------
insert into eventos (id, titulo, descripcion, tipo, fecha_inicio, fecha_fin, lugar, validado_utp) values
  ('5eed0000-0000-4000-a000-000000000101', 'Taller de Git y GitHub',
   'Desde el primer commit hasta los pull requests. Trae tu laptop.', 'workshop',
   now() + interval '3 days', now() + interval '3 days 2 hours', 'Aula 3, UTP Coclé', true),
  ('5eed0000-0000-4000-a000-000000000102', 'Charla: Introducción al pentesting',
   'Qué es, cómo empezar y laboratorios gratuitos para practicar.', 'charla',
   now() + interval '10 days', now() + interval '10 days 90 minutes', 'Auditorio, UTP Coclé', true),
  ('5eed0000-0000-4000-a000-000000000103', 'Hackathon C_ALIGO',
   '24 horas para construir una solución para la región de Coclé.', 'hackathon',
   now() + interval '30 days', now() + interval '31 days', 'Laboratorio de Cómputo, UTP Coclé', false),
  ('5eed0000-0000-4000-a000-000000000104', 'Reunión de directiva',
   'Planificación del semestre. Solo visible para miembros.', 'reunion',
   now() + interval '5 days', now() + interval '5 days 1 hour', 'Google Meet', false),
  ('5eed0000-0000-4000-a000-000000000105', 'Gira a centro de datos',
   'Visita guiada a la infraestructura de un centro de datos en Panamá.', 'gira',
   now() - interval '30 days', now() - interval '30 days' + interval '7 hours', 'Ciudad de Panamá', true),
  ('5eed0000-0000-4000-a000-000000000106', 'Stand en la Feria de Ingeniería',
   'Mostramos los proyectos de la comunidad a los nuevos estudiantes.', 'stand',
   now() - interval '50 days', now() - interval '50 days' + interval '7 hours', 'Vestíbulo, UTP Coclé', true)
on conflict (id) do nothing;

-- ---------- Proyectos ----------
insert into proyectos (id, nombre, descripcion, estado, repo_github, imagen_url) values
  ('5eed0000-0000-4000-a000-000000000201', 'Plataforma C_ALIGO',
   'La web de la comunidad: eventos, proyectos, foros y perfiles.', 'en_progreso',
   'Franco-Javier/C_ALIGO', '/mock/proyecto-1.svg'),
  ('5eed0000-0000-4000-a000-000000000202', 'Sistema de reservas UTP',
   'Reserva de laboratorios y aulas para estudiantes y docentes.', 'en_progreso',
   null, '/mock/proyecto-2.svg'),
  ('5eed0000-0000-4000-a000-000000000203', 'Laboratorio de redes virtual',
   'Topologías de práctica con Packet Tracer y GNS3.', 'pausado', null, null),
  ('5eed0000-0000-4000-a000-000000000204', 'Bot de avisos para Discord',
   'Publica los eventos de la comunidad en el servidor.', 'idea', null, null)
on conflict (id) do nothing;

-- ---------- Evidencias (fotos: placeholders de /public/mock) ----------
insert into evidencias (id, titulo, descripcion, fotos, evento_id, fecha) values
  ('5eed0000-0000-4000-a000-000000000301', 'Gira al centro de datos',
   'Conocimos racks, enfriamiento y redundancia eléctrica.',
   array['/mock/evidencia-1.svg', '/mock/evidencia-2.svg'],
   '5eed0000-0000-4000-a000-000000000105', (now() - interval '30 days')::date),
  ('5eed0000-0000-4000-a000-000000000302', 'Stand en la Feria de Ingeniería',
   'Más de 80 estudiantes pasaron por el stand.',
   array['/mock/evidencia-2.svg'],
   '5eed0000-0000-4000-a000-000000000106', (now() - interval '50 days')::date),
  ('5eed0000-0000-4000-a000-000000000303', 'Sprint de la plataforma',
   'Primera jornada de trabajo en la web de la comunidad.',
   array['/mock/evidencia-3.svg'], null, (now() - interval '60 days')::date)
on conflict (id) do nothing;

-- ---------- Badges ----------
insert into badges (id, nombre, descripcion, proyecto_id) values
  ('5eed0000-0000-4000-a000-000000000401', 'Fundador', 'Miembro fundador de C_ALIGO', null),
  ('5eed0000-0000-4000-a000-000000000402', 'Primer commit', 'Contribuyó a la plataforma C_ALIGO',
   '5eed0000-0000-4000-a000-000000000201')
on conflict (id) do nothing;

-- ---------- Noticias (las reales llegan con el cron) ----------
insert into noticias (id, titulo, resumen, url, fuente, publicado_en) values
  ('5eed0000-0000-4000-a000-000000000501', 'Noticia de prueba 1',
   'Resumen de ejemplo para ver la tarjeta.', 'https://example.com/caligo-seed/1', 'Seed', now() - interval '1 day'),
  ('5eed0000-0000-4000-a000-000000000502', 'Noticia de prueba 2',
   'Resumen de ejemplo para ver la tarjeta.', 'https://example.com/caligo-seed/2', 'Seed', now() - interval '2 days')
on conflict (id) do nothing;

-- ---------- Materiales (solo visibles para miembros) ----------
insert into materiales (id, titulo, descripcion, tipo, url, tema) values
  ('5eed0000-0000-4000-a000-000000000601', 'Documentación oficial de Python',
   'El tutorial oficial, desde cero.', 'link', 'https://docs.python.org/es/3/tutorial/', 'Python'),
  ('5eed0000-0000-4000-a000-000000000602', 'Pro Git (libro gratuito)',
   'El libro de referencia de Git, en español.', 'documento', 'https://git-scm.com/book/es/v2', 'Git')
on conflict (id) do nothing;

commit;

-- =====================================================
-- DESPUÉS de que cada persona entre con GitHub una vez:
-- asignar la directiva (desde el SQL Editor, auth.uid() es null y el trigger lo permite).
-- =====================================================
-- update perfiles set rol = 'presidente', estado = 'activo', puzzle_resuelto_en = now()
--   where usuario_github = 'Franco-Javier';
-- update proyectos set responsable_id = (select id from perfiles where usuario_github = 'Franco-Javier')
--   where id = '5eed0000-0000-4000-a000-000000000201';
-- insert into perfil_badges (perfil_id, badge_id)
--   select id, '5eed0000-0000-4000-a000-000000000401' from perfiles where usuario_github = 'Franco-Javier'
--   on conflict do nothing;

-- =====================================================
-- BORRAR los datos de prueba
-- =====================================================
-- delete from evidencias where id::text like '5eed0000%';
-- delete from badges     where id::text like '5eed0000%';
-- delete from proyectos  where id::text like '5eed0000%';
-- delete from eventos    where id::text like '5eed0000%';
-- delete from noticias   where id::text like '5eed0000%';
-- delete from materiales where id::text like '5eed0000%';
