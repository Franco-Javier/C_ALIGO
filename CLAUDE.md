# C_ALIGO — Instrucciones para el agente
@AGENTS.md
> Este archivo es el contexto principal del proyecto. Léelo completo antes de escribir código.
> Si algo no está definido aquí, pregunta antes de inventarlo.

---

## 1. Contexto del proyecto

**C_ALIGO** es una comunidad de programación de la Facultad de Sistemas (FISC) de la UTP, Centro Regional de Coclé, Panamá. Es independiente, al estilo de Comunidad Dojo. Sus ejes son la programación, la ciberseguridad, las redes y la IA.

La plataforma web sirve para:
- Mostrar al público el **impacto** de la comunidad: fotos de hackathons, charlas, giras y stands.
- Coordinar a los miembros: eventos, proyectos, foros, materiales y herramientas.
- Dar **trazabilidad** a cada miembro con su perfil, rol, GitHub, badges y contribuciones.

**Directiva actual:** Francisco Herazo (presidente), María Vergara (vicepresidenta), Isacar (coordinador de proyectos).

**Reglas de negocio:**
- Se entra con GitHub y luego hay que resolver un **mini puzzle de programación** para pasar de `pendiente` a `activo`.
- Nunca se elimina a un miembro. Si no tiene actividad durante X días, pasa a `inactivo`.
- No hay cuotas ni pagos dentro de la plataforma.
- Las áreas de carrera son `programacion`, `ciberseguridad` y `redes`.

---

## 2. Stack (no cambiar sin consultar)

| Capa | Tecnología |
|---|---|
| Framework | **Next.js** (App Router) + **TypeScript** |
| Estilos | **Tailwind CSS** |
| Íconos | `lucide-react` |
| Base de datos / Auth / Storage / Realtime | **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) |
| Login | Supabase Auth con **GitHub OAuth** (único proveedor) |
| Integración externa | GitHub REST API (repos y perfil público) |
| Noticias | Vercel Cron + `rss-parser` |
| Despliegue | Vercel, conectado al repo de GitHub (rama `main`) |

**Costo objetivo: $0.** Solo se usan los planes gratuitos. No agregues servicios de pago.

---

## 3. Identidad visual

Estilo **oscuro, futurista y de alto contraste**, con el neón verde como protagonista. Debe sentirse como una terminal moderna, no como un panel corporativo.

### Tokens (definir en `app/globals.css` como variables CSS y mapear en Tailwind)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0A0A0A` | Fondo general |
| `--surface` | `#141414` | Tarjetas, sidebar |
| `--surface-2` | `#1E1E1E` | Inputs, hover |
| `--border` | `#2A2A2A` | Bordes |
| `--text` | `#F5F5F5` | Texto principal |
| `--text-muted` | `#9A9A9A` | Texto secundario |
| `--primary` | `#82D173` | **Verde Mantis** (logo): botones, links, acentos |
| `--primary-glow` | `rgba(130,209,115,0.35)` | Brillo neón (box-shadow) |
| `--danger` | `#FF5C5C` | Errores, eliminar |
| `--warning` | `#FFC857` | Estados pausados / pendientes |

### Tipografía (Google Fonts con `next/font`)
- **Space Grotesk**: títulos y navegación.
- **Inter**: texto general.
- **JetBrains Mono**: detalles "de código", como etiquetas, contadores, el puzzle y nombres de usuario de GitHub.

### Estilo de componentes
- Bordes redondeados de `rounded-xl` en tarjetas y `rounded-lg` en botones.
- Botón primario: fondo `--primary`, texto negro y brillo `--primary-glow` en hover.
- Las tarjetas usan `--surface` con borde `--border`. En hover, el borde cambia a `--primary`.
- Detalles decorativos como prefijo `>_` o `//` en títulos de sección, en mono y verde.
- Logo: lobo/zorro en verde, blanco y negro, en `public/logo.svg` (lo proveerá el equipo; mientras tanto usa un placeholder).
- **Mobile first.** Todo debe verse bien desde 360px de ancho.

### Badges de estado de proyecto
| Estado | Color |
|---|---|
| `idea` | gris `--text-muted` |
| `en_progreso` | verde `--primary` |
| `pausado` | amarillo `--warning` |
| `terminado` | blanco con borde verde |

---

## 4. Estructura de carpetas

```
c-aligo/
├── CLAUDE.md                     # Este archivo
├── .env.example                  # Variables sin valores reales
├── .env.local                    # Variables reales (NO se sube a GitHub)
├── vercel.json                   # Cron de noticias
├── supabase/
│   └── schema.sql                # Esquema completo de la BD
├── public/
│   └── logo.svg
├── types/
│   └── database.ts               # Tipos TS que reflejan el esquema SQL
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Cliente para componentes "use client"
│   │   ├── server.ts             # Cliente para Server Components / Actions
│   │   └── admin.ts              # Cliente con SERVICE_ROLE (solo servidor)
│   ├── data/                     # Funciones de lectura por módulo
│   │   ├── eventos.ts
│   │   ├── proyectos.ts
│   │   └── ...
│   ├── mock/                     # Datos falsos (Fase 0, antes de Supabase)
│   ├── github.ts                 # Llamadas a la API de GitHub
│   └── utils.ts
├── components/
│   ├── layout/                   # Navbar, Sidebar, Footer, MobileNav
│   ├── ui/                       # Button, Card, Badge, Input, Modal, Avatar, Tag
│   └── modulos/                  # Componentes de cada sección
│       ├── inicio/
│       ├── eventos/
│       ├── proyectos/
│       ├── foros/
│       ├── perfil/
│       └── admin/
├── app/
│   ├── layout.tsx                # Fuentes, tema, Navbar
│   ├── globals.css               # Tokens
│   ├── page.tsx                  # Inicio (público)
│   ├── login/page.tsx
│   ├── auth/callback/route.ts    # Retorno de GitHub OAuth
│   ├── puzzle/page.tsx
│   ├── eventos/page.tsx
│   ├── eventos/[id]/page.tsx
│   ├── proyectos/page.tsx
│   ├── proyectos/[id]/page.tsx
│   ├── foros/page.tsx
│   ├── foros/[foroId]/page.tsx
│   ├── foros/[foroId]/[hiloId]/page.tsx
│   ├── materiales/page.tsx
│   ├── herramientas/page.tsx
│   ├── noticias/page.tsx
│   ├── impacto/page.tsx          # Todas las evidencias (público)
│   ├── miembros/page.tsx
│   ├── perfil/[usuario]/page.tsx
│   ├── perfil/editar/page.tsx
│   ├── admin/                    # Panel de directiva
│   │   ├── page.tsx
│   │   ├── eventos/page.tsx
│   │   ├── evidencias/page.tsx
│   │   ├── proyectos/page.tsx
│   │   ├── miembros/page.tsx
│   │   └── badges/page.tsx
│   └── api/
│       ├── puzzle/route.ts       # Valida la respuesta del puzzle
│       └── cron/noticias/route.ts
└── middleware.ts                 # Protección de rutas (o proxy.ts según la versión de Next.js instalada)
```

---

## 5. Roles y acceso

| Ruta | Visitante | Pendiente | Miembro (activo/inactivo) | Directiva |
|---|---|---|---|---|
| `/`, `/impacto`, `/eventos`, `/proyectos`, `/herramientas`, `/noticias`, `/miembros`, `/perfil/[usuario]` | ✅ | ✅ | ✅ | ✅ |
| `/login` | ✅ | ↪ `/puzzle` | ↪ `/` | ↪ `/` |
| `/puzzle` | ↪ `/login` | ✅ | ↪ `/` | ↪ `/` |
| `/foros/*`, `/materiales`, `/perfil/editar` | ↪ `/login` | ↪ `/puzzle` | ✅ | ✅ |
| `/admin/*` | ↪ `/login` | ↪ `/puzzle` | ❌ 403 | ✅ |

- **Directiva** = rol `presidente`, `vicepresidente` o `coordinador`.
- El `middleware` hace la redirección. **La seguridad real está en RLS (Supabase).** No confíes solo en ocultar botones.

---

## 6. Layout global

### Escritorio
```
┌──────────────────────────────────────────────────────────────────┐
│ [logo] C_ALIGO   Inicio Eventos Proyectos Foros Materiales ...   │
│                                        [🔔]  [avatar ▾] / [Entrar]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                        CONTENIDO DE LA PÁGINA                    │
│                       (max-w-6xl, centrado)                      │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ //C_ALIGO · FISC UTP Coclé · Instagram · GitHub                  │
└──────────────────────────────────────────────────────────────────┘
```

### Móvil
- Navbar superior con el logo y el avatar.
- **Barra inferior fija** con 5 íconos: Inicio, Eventos, Proyectos, Foros y Más. "Más" abre un menú con Materiales, Herramientas, Noticias, Miembros, Impacto y Admin. (Impacto no va en el navbar de escritorio; ahí se llega desde el Inicio.)

### Menú del avatar
Mi perfil · Editar perfil · Panel admin (solo directiva) · Cerrar sesión.

---

## 7. Pantallas: esquema visual + datos

Cada pantalla indica **qué tablas lee**, **qué escribe** y **quién puede hacerlo**.
Tipos de referencia: ver `supabase/schema.sql`.

### 7.1 Inicio `/` (público)
```
┌──────────────────────────────────────────────────────┐
│  HERO                                                │
│  >_ C_ALIGO                                          │
│  Comunidad de programación · FISC UTP Coclé          │
│  [Únete a la comunidad]   [Ver proyectos]            │
├──────────────────────────────────────────────────────┤
│  CONTADORES (mono, verde)                            │
│  [ 12 miembros ] [ 5 proyectos ] [ 8 eventos ]       │
├──────────────────────────────────────────────────────┤
│  // IMPACTO  (evidencias, grid 3 col / 1 col móvil)  │
│  ┌────────┐ ┌────────┐ ┌────────┐                    │
│  │ foto   │ │ foto   │ │ foto   │                    │
│  │ título │ │ título │ │ título │                    │
│  │ fecha  │ │ fecha  │ │ fecha  │                    │
│  └────────┘ └────────┘ └────────┘    [Ver todo →]    │
├──────────────────────────────────────────────────────┤
│  // PRÓXIMOS EVENTOS (3 tarjetas)                    │
├──────────────────────────────────────────────────────┤
│  // PROYECTOS ACTIVOS (estado = en_progreso)         │
├──────────────────────────────────────────────────────┤
│  // ÚLTIMAS NOTICIAS (5 titulares)                   │
└──────────────────────────────────────────────────────┘
```
- **Lee:** `evidencias` (las 6 más recientes por `fecha`), `eventos` (`fecha_inicio >= now()`, 3), `proyectos` (`estado = 'en_progreso'`), `noticias` (5), y conteos de `perfiles` (estado ≠ pendiente), `proyectos` y `eventos`.
- Al hacer clic en una evidencia se abre un **modal tipo galería** con todas las `fotos[]` y la descripción.
- "Ver todo →" de Impacto lleva a `/impacto` (§7.14).
- El botón "Únete" lleva a `/login`.

### 7.2 Login `/login`
```
┌──────────────────────────────┐
│          [logo grande]       │
│          >_ C_ALIGO          │
│  Entra con tu cuenta GitHub  │
│  [  Continuar con GitHub ]   │
│  // Al entrar deberás        │
│     resolver un puzzle       │
└──────────────────────────────┘
```
- Llama a `supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: <origen>/auth/callback } })`.
- `/auth/callback` intercambia el código por la sesión y redirige a `/puzzle` si el estado es `pendiente`, o a `/` si no.
- El perfil se crea **automáticamente** con el trigger `crear_perfil_nuevo` de la BD. No lo insertes desde el front.

### 7.3 Puzzle `/puzzle` (solo pendientes)
```
┌──────────────────────────────────────────┐
│ >_ Reto de ingreso                       │
│ ┌──────────────────────────────────────┐ │
│ │ // ¿Qué imprime este código?         │ │
│ │ for (i = 0; i < 3; i++) print(i*2)   │ │  ← bloque mono
│ └──────────────────────────────────────┘ │
│ Respuesta: [___________________]         │
│ [Enviar]                                 │
│ ✖ Incorrecto, intenta de nuevo  (rojo)   │
└──────────────────────────────────────────┘
```
- La **pregunta** se muestra desde el front. La **respuesta correcta NUNCA llega al navegador.**
- `POST /api/puzzle` compara la respuesta en el servidor contra la variable `PUZZLE_RESPUESTA`. Si es correcta, usa el **cliente admin** (`SERVICE_ROLE`) para hacer `update perfiles set estado='activo', puzzle_resuelto_en=now()` y luego redirige a `/perfil/editar` para completar los datos.
- Si falla, se muestra un mensaje genérico y no se revela la respuesta.
- Por ahora es **un solo puzzle** definido en variables de entorno. Más adelante podría pasar a una tabla.

### 7.4 Eventos `/eventos` y `/eventos/[id]`
```
Filtros: [Todos] [Workshop] [Charla] [Hackathon] [Gira] [Stand]
         ( Próximos | Pasados )

┌───────────────────────────────────────────────┐
│ 24 OCT │ Taller de Git y GitHub   [WORKSHOP]  │
│  JUE   │ 📍 Aula 3, UTP Coclé  · 2:00 pm      │
│        │ ✔ Validado UTP     [Asistiré]        │
└───────────────────────────────────────────────┘
```
- **Lee:** `eventos`, más el conteo de `evento_asistentes`.
- **Escribe:** el miembro marca "Asistiré" con un insert en `evento_asistentes`, y lo quita con delete.
- La etiqueta "✔ Validado UTP" se muestra solo si `validado_utp = true`.
- **Reuniones (`tipo = 'reunion'`) son internas:** visitantes y pendientes no las ven en la lista, el Inicio, los contadores ni el detalle (404). Los miembros sí, con un chip "Reunión" extra en los filtros.
- Quitar la asistencia requiere la política `"miembros se desinscriben"` (DELETE en `evento_asistentes`).
- El detalle muestra la descripción, la lista de asistentes (avatares) y las evidencias vinculadas (`evidencias.evento_id`).

### 7.5 Proyectos `/proyectos` y `/proyectos/[id]`
```
Lista (grid de tarjetas):
┌────────────────────────────────┐
│ [imagen]                       │
│ Sistema de reservas UTP        │
│ [EN PROGRESO]                  │
│ Descripción corta...           │
│ (av)(av)(av) +2   ⭐ 4  ⑂ repo │
└────────────────────────────────┘

Detalle:
┌──────────────────────────────────────────────┐
│ Nombre del proyecto        [EN PROGRESO]     │
│ Responsable: (av) @usuario                   │
│ Descripción completa                         │
│──────────────────────────────────────────────│
│ // EQUIPO                                    │
│ (av) Nombre · función    (av) Nombre · ...   │
│──────────────────────────────────────────────│
│ // REPOSITORIO  usuario/repo  [Abrir GitHub] │
│ Lenguaje · ⭐ estrellas · Último commit      │
│ Últimos 5 commits (mensaje, autor, fecha)    │
│──────────────────────────────────────────────│
│ // BADGES DEL PROYECTO                       │
└──────────────────────────────────────────────┘
```
- **Lee:** `proyectos`, `proyecto_miembros` + `perfiles`, `badges` (filtrado por `proyecto_id`).
- **GitHub:** si existe `repo_github`, `lib/github.ts` consulta `GET /repos/{repo}` y `GET /repos/{repo}/commits?per_page=5`. Usa `fetch` con `next: { revalidate: 3600 }` para cachear 1 hora. Usa `GITHUB_TOKEN` en el servidor si está disponible. Si el repo es privado o falla, muestra solo el enlace.
- Solo la directiva crea o edita proyectos (desde `/admin/proyectos`).

### 7.6 Foros `/foros` → `/foros/[foroId]` → `/foros/[foroId]/[hiloId]` (solo miembros)
```
Escritorio (3 columnas, estilo Discord):
┌──────────────┬──────────────────────────────┬────────────┐
│ # General    │ Hilo: ¿Qué stack usar?       │ EN LÍNEA   │
│ # Programac. │──────────────────────────────│ (av) Ana   │
│   └ # Python │ (av) Ana · 10:32             │ (av) José  │
│ # Ciberseg.  │ Yo propongo Next.js...       │            │
│ # Redes      │                              │            │
│ # IA y Agent │ (av) José · 10:35            │            │
│              │ +1, y Supabase para la BD    │            │
│              │──────────────────────────────│            │
│              │ [Escribe un mensaje...] [➤]  │            │
└──────────────┴──────────────────────────────┴────────────┘
Móvil: lista de foros → lista de hilos → chat (navegación por pantallas).
```
- **Lee:** `foros` (los subforos usan `foro_padre_id`), `hilos` (los fijados primero) y `mensajes` + `perfiles` del autor.
- **Escribe:** un miembro crea un `hilo` y envía `mensajes`. Puede editar sus propios mensajes y borrarlos. La directiva puede borrar cualquiera.
- **Realtime:** suscribirse a `INSERT` en `mensajes` filtrado por `hilo_id` para que los nuevos aparezcan sin recargar. Hay que activar Realtime en la tabla `mensajes` dentro de Supabase.
- "En línea" usa **Supabase Presence** (opcional, Fase 3).
- Cada mensaje enviado actualiza `perfiles.ultima_actividad = now()`.

### 7.7 Materiales `/materiales` (solo miembros)
```
[Buscar...]   Tema: [Todos ▾]   Tipo: [Link][Documento][Video][Curso]
┌─────────────────────────────────────────────┐
│ 📄 Guía de Python desde cero   [DOCUMENTO]  │
│ #Python · subido por @ana · 12 oct          │
│ [Abrir]                                     │
└─────────────────────────────────────────────┘
[+ Subir material]
```
- **Lee:** `materiales`.
- **Escribe:** cualquier miembro inserta. Si es un documento, primero se sube al bucket **`materiales`** de Storage y se guarda la URL.
- Filtros por `tema` y `tipo`, con búsqueda por `titulo` (`ilike`).

### 7.8 Herramientas `/herramientas` (público)
```
// Editor            // Diseño            // Control de versiones
┌────────────┐ ┌────────────┐ ┌────────────┐
│  [ícono]   │ │  [ícono]   │ │  [ícono]   │
│  VS Code   │ │  Figma     │ │  GitHub D. │
│ [Descargar]│ │ [Descargar]│ │ [Descargar]│
└────────────┘ └────────────┘ └────────────┘
```
- **Lee:** `herramientas` ordenadas por `orden`, en un solo grid (2 col móvil, 3 tablet, 4 escritorio). La `categoria` va como etiqueta en cada tarjeta.
- Toda la tarjeta es clicable y abre `url_descarga` en una pestaña nueva.

### 7.9 Noticias `/noticias` (público)
- **Lee:** `noticias` ordenadas por `publicado_en desc`, con paginación de 20.
- Cada tarjeta muestra el título, la fuente, la fecha, el resumen y un botón "Leer en la fuente".
- Las llena `/api/cron/noticias`, que corre 1 vez al día desde `vercel.json`. Lee 3–5 feeds RSS de tecnología e IA (definidos en una constante), los parsea con `rss-parser` y hace `upsert` por `url` usando el cliente admin. Protege la ruta con el header `Authorization: Bearer ${CRON_SECRET}`.

### 7.10 Miembros `/miembros` (público)
- Grid de tarjetas con avatar, nombre, `@usuario_github`, rol y área.
- Filtros por área y rol. Los inactivos se muestran con opacidad reducida y la etiqueta "inactivo".
- No muestra a los `pendiente`.

### 7.11 Perfil `/perfil/[usuario]` (público)
```
┌──────────────────────────────────────────────┐
│ (avatar grande)  Francisco Herazo            │
│                  @usuario · [PRESIDENTE]     │
│                  Desarrollo de Software      │
│                  Área: programación          │
│                  Bio...                      │
│                  [GitHub ↗]                  │
├──────────────────────────────────────────────┤
│ // BADGES   [🏅][🏅][🏅]                       │
├──────────────────────────────────────────────┤
│ // PROYECTOS  (tarjetas donde participa)     │
├──────────────────────────────────────────────┤
│ // ACTIVIDAD                                 │
│ Eventos asistidos: 4 · Mensajes: 37          │
│ Repos públicos (GitHub API, top 4 recientes) │
└──────────────────────────────────────────────┘
```
- **Lee:** `perfiles` (por `usuario_github`), `perfil_badges` + `badges`, `proyecto_miembros` + `proyectos`, conteo de `evento_asistentes` y `mensajes`, y GitHub `GET /users/{usuario}/repos?sort=updated&per_page=4`.
- El conteo de mensajes solo es visible para miembros, porque RLS lo exige. Para visitantes, ocultar ese dato.

### 7.12 Editar perfil `/perfil/editar`
- Formulario con nombre, carrera, área (select de 3 opciones) y bio.
- **Escribe:** `update perfiles where id = auth.uid()`.
- **No incluir** rol ni estado. La BD los protege de todos modos con un trigger.

### 7.13 Panel admin `/admin/*` (solo directiva)
```
┌──────────────┬───────────────────────────────────────┐
│ Resumen      │ // RESUMEN                            │
│ Eventos      │ [Miembros activos] [Pendientes]       │
│ Evidencias   │ [Inactivos] [Proyectos] [Eventos mes] │
│ Proyectos    │                                       │
│ Miembros     │ Últimos registros (tabla)             │
│ Badges       │                                       │
│ Foros        │                                       │
│ Herramientas │                                       │
└──────────────┴───────────────────────────────────────┘
```
Cada sección es una **tabla + botón "Nuevo" + modal de formulario** (crear y editar) + eliminar con confirmación.

| Sección | Tabla | Notas |
|---|---|---|
| Eventos | `eventos` | Casilla "Validado por UTP" |
| Evidencias | `evidencias` | Subida **múltiple** de fotos al bucket `evidencias`, comprimir antes de subir y guardar las URLs en `fotos[]`. Vincular opcionalmente a un evento o proyecto |
| Proyectos | `proyectos`, `proyecto_miembros` | Agregar y quitar integrantes con su función |
| Miembros | `perfiles` | Cambiar rol, área y estado (incluye reactivar). **Nunca eliminar** |
| Badges | `badges`, `perfil_badges` | Crear el badge (ícono al bucket `badges`) y otorgarlo a miembros |
| Foros | `foros` | Crear foros y subforos, fijar hilos |
| Herramientas | `herramientas` | CRUD simple |

### 7.14 Impacto `/impacto` (público)
```
>_ Impacto
Filtros: [Todos] [Workshop] [Charla] [Hackathon] [Gira] [Stand]
┌────────┐ ┌────────┐ ┌────────┐
│ foto   │ │ foto   │ │ foto   │   (grid 3 col / 1 col móvil)
│ título │ │ título │ │ título │
│ fecha  │ │ fecha  │ │ fecha  │
└────────┘ └────────┘ └────────┘
```
- **Lee:** todas las `evidencias`, ordenadas por `fecha desc`.
- Filtro opcional por el **tipo del evento vinculado** (`?tipo=hackathon` → `evidencias.evento_id` → `eventos.tipo`). Las evidencias sin evento solo aparecen en "Todos".
- Reutiliza las tarjetas y el modal de galería del Inicio (`components/modulos/evidencias/`).
- Se accede desde "Ver todo →" del Inicio y desde el menú "Más" en móvil.

---

## 8. Conexión con Supabase

### Variables de entorno (`.env.example`)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # SOLO servidor. Nunca en componentes cliente.
GITHUB_TOKEN=                      # Opcional, sube el límite de la API de GitHub
PUZZLE_RESPUESTA=
CRON_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Patrones obligatorios
1. **Leer datos:** en **Server Components** con `lib/supabase/server.ts`, mediante las funciones de `lib/data/*`. No hagas fetch desde el cliente salvo para realtime o interacciones.
2. **Escribir datos:** con **Server Actions** (`"use server"`) usando el cliente de servidor, y después `revalidatePath()`.
3. **Cliente admin** (`SERVICE_ROLE`): **solo** en `/api/puzzle` y `/api/cron/noticias`. Nunca lo importes en código cliente.
4. **Realtime:** usa `lib/supabase/client.ts` en un componente `"use client"` y cancela la suscripción al desmontar.
5. **Storage:** usa 3 buckets públicos de lectura: `evidencias`, `materiales` y `badges`. Nombra los archivos como `{uuid}-{nombre-limpio}`.
6. **Imágenes:** usa `next/image` y agrega el dominio de Supabase Storage y `avatars.githubusercontent.com` en `next.config`.
7. **Tipos:** `types/database.ts` debe reflejar exactamente `supabase/schema.sql`. Cuando exista el proyecto de Supabase, se podrán regenerar con `supabase gen types`.
8. **Errores:** cada Server Action devuelve `{ ok: true }` o `{ ok: false, error: string }`. Muestra los errores en un toast. Nunca dejes la pantalla en blanco.
9. **Estados vacíos:** cada lista tiene un mensaje para cuando no hay datos, por ejemplo "// Aún no hay eventos" con un botón de acción si el usuario tiene permiso.
10. **Carga:** usa `loading.tsx` con skeletons en cada ruta principal.

---

## 9. Fase 0: trabajar SIN Supabase (datos mock)

Todavía no existe el proyecto en Supabase. Para avanzar con la interfaz:
- Crea `lib/mock/*.ts` con datos falsos realistas que usen **los mismos tipos** de `types/database.ts`. Por ejemplo, usa los foros y herramientas iniciales del `schema.sql` y 4–6 miembros de ejemplo.
- Las funciones de `lib/data/*` deben devolver los datos mock cuando `NEXT_PUBLIC_SUPABASE_URL` esté vacío, y consultar Supabase cuando exista. Así el cambio es transparente y **las pantallas no se reescriben**.
- Simula la sesión con una constante `MOCK_USUARIO` (rol `presidente`, estado `activo`) para poder ver todas las pantallas. Para probar otros roles, usa el panel "entrar como" de `/login` (cookie `caligo_mock_session`).

---

## 10. Orden de construcción

| Fase | Contenido |
|---|---|
| **0** | Setup, tokens, fuentes, layout global (navbar, barra móvil, footer), componentes `ui/`, tipos y mocks |
| **1 (MVP)** | Inicio, Eventos, Proyectos (sin GitHub), Herramientas, Miembros, Perfil público |
| **2** | Conexión real a Supabase, login con GitHub, callback, puzzle, middleware, editar perfil, panel admin (eventos, evidencias, proyectos, miembros) |
| **3** | Foros con realtime, Materiales con Storage, integración con GitHub API, badges |
| **4** | Noticias con cron, job de inactividad, Presence en foros, notificaciones (campana 🔔 del navbar), pulido y SEO |

### Pendientes y decisiones
- **Notificaciones (Fase 4):** la campana 🔔 del navbar está oculta. Falta definir qué notifica y proponer su tabla (`ALTER TABLE` / `create table`) antes de construirla.
- **Redes sociales:** `lib/site.ts` tiene URLs placeholder; la comunidad aún no tiene Instagram ni organización de GitHub.
- **Mocks:** los usuarios de GitHub de María e Isacar son inventados; se reemplazan con los reales en la Fase 2.
- **Breakpoint:** la navegación de escritorio aparece desde `lg` (1024px); por debajo se usa la barra inferior.
- **`/dev/ui`:** página temporal de revisión de componentes. Borrarla antes de producción.
- **Hero:** usar el logo final grande a la derecha en escritorio cuando esté listo.
- **SEO (Fase 4):** `notFound()` llamado dentro de un `<Suspense>` muestra la página 404 pero responde con código HTTP **200** (el streaming ya empezó). Revisar en las rutas de detalle (`/eventos/[id]`, etc.).
- **Esquema (revisar):** la política `"publico ve eventos"` pasó de `using (true)` a `using (tipo <> 'reunion' or es_miembro_activo())`, para que RLS también oculte las reuniones.
- **Esquema (revisar):** se agregó `create policy "directiva fija hilos" on hilos for update using (es_directiva());`. Sin ella, fijar un hilo desde `/admin/foros` no actualizaría nada (`hilos` no tenía política de UPDATE).
- **Decisión (revisar) · Proyectos:** `/proyectos` no tiene filtros (el §7.5 no los pide). El detalle muestra solo el enlace al repo; lenguaje, estrellas y commits llegan con la GitHub API.
- **Decisión (revisar) · Herramientas:** `icono_url` se muestra con `next/image` `unoptimized`, porque puede venir de cualquier dominio. Sin ícono se usa uno de lucide según la categoría (`components/modulos/herramientas/CategoriaIcon.tsx`, por palabra clave; `Package` si no coincide).
- **Decisión (revisar) · Perfil público:** el perfil de un `pendiente` responde 404 (salvo para él mismo), igual que en `/miembros`. Los conteos de eventos asistidos **y** de mensajes se ocultan a visitantes y pendientes, porque RLS de `evento_asistentes` también es solo para miembros. Los repos de GitHub quedan para la Fase 3.
- **Decisión (revisar) · Sesión mock:** la cookie `caligo_mock_session` guarda el id del perfil con el que se navega (o `anon` para visitante). Sin cookie se usa `MOCK_USUARIO`. En `/login`, y solo en modo mock, hay un panel "entrar como" con los perfiles de ejemplo. "Continuar con GitHub" en mock entra como el perfil `pendiente` (Carlos).
- **Decisión (revisar) · Datos mock compartidos:** los arrays de `lib/mock` viven en `globalThis` (`lib/mock/store.ts`), porque los Route Handlers y las páginas usan bundles distintos y no verían las mutaciones de los otros. Se pierden al reiniciar el servidor.
- **Decisión (revisar) · Puzzle:** la respuesta se compara sin espacios, comas, corchetes ni comillas ("0, 2, 4" = "024"). En modo mock, si `PUZZLE_RESPUESTA` está vacía se usa `"0 2 4"` (`lib/mock/puzzle.ts`). Si es correcta, se va a `/perfil/editar?bienvenida=1`.
- **Integración (Fase 2) · Acceso:** las redirecciones del §5 se hacen hoy en cada página con `lib/auth/guards.ts`. Como corren dentro de `<Suspense>`, la redirección llega por streaming con código 200. Falta el `proxy.ts` (antes `middleware.ts`), que además debe refrescar la sesión de Supabase. El 403 de `/admin` usa `forbidden()`, que requiere `experimental.authInterrupts`.
- **Decisión (revisar) · Foros:** en escritorio son 2 columnas (foros + contenido); la columna "En línea" se agrega con Presence. `/foros` muestra los foros como tarjetas, que en móvil hacen de primera pantalla. Un hilo nuevo se crea con título + primer mensaje. Enter envía y Shift+Enter hace salto de línea. Sin realtime: los mensajes de otros aparecen al recargar.
- **Decisión (revisar) · Materiales:** la búsqueda y el tema se envían con un formulario GET; el tipo se filtra con chips. El filtro de tema lista los temas que ya existen, y al subir el tema es texto libre con sugerencias. Por ahora todo material es un **enlace**: la subida de documentos al bucket `materiales` llega con Storage.
- **Decisión (revisar) · Admin evidencias:** sin Storage, las fotos se escriben como URLs, una por línea, y solo se aceptan rutas locales o URLs de Supabase Storage (las que `next/image` permite). La subida múltiple con compresión y el borrado de archivos del bucket llegan con la integración.
- **Decisión (revisar) · Admin miembros:** nadie puede cambiar **su propio** rol ni estado desde el panel, para evitar que la directiva se quede fuera por error. Se incluyen los pendientes, que se pueden activar a mano.
- **SEO (Fase 4):** el detalle de evento usa el título fijo "Evento"; falta `generateMetadata` con el título real (igual en los demás detalles).

#### Checklist de integración (lo que la interfaz ya deja preparado)
Todas las Server Actions y Route Handlers ya tienen su rama de Supabase escrita; hoy solo corre la rama mock.
1. **Supabase:** crear el proyecto, ejecutar `supabase/schema.sql`, llenar `.env.local` y regenerar `types/database.ts` con `supabase gen types`.
2. **Auth:** activar GitHub OAuth, configurar `NEXT_PUBLIC_SITE_URL` y crear `proxy.ts` (redirecciones del §5 + refresco de sesión). Probar `/login` → `/auth/callback` → `/puzzle` → `/perfil/editar`.
3. **Puzzle:** definir `PUZZLE_RESPUESTA` (y `SUPABASE_SERVICE_ROLE_KEY`, que usa `/api/puzzle`).
4. **Storage:** crear los buckets `evidencias`, `materiales` y `badges`. Subida múltiple con compresión en admin evidencias, subida de documentos en Materiales e íconos de badges.
5. **Realtime:** activarlo en `mensajes` y suscribirse a INSERT por `hilo_id` en el chat. Presence ("En línea") en la Fase 4.
6. **GitHub API:** `lib/github.ts` (repo + últimos 5 commits en `/proyectos/[id]`, top 4 repos en `/perfil/[usuario]`).
7. **Cron:** `/api/cron/noticias` + `vercel.json` + `CRON_SECRET`.
8. **Limpieza:** borrar `/dev/ui` y el panel "entrar como" de `/login` queda inactivo solo (depende del modo mock).

**Trabaja una fase a la vez.** Al terminar cada una:
1. `npm run build` sin errores.
2. Haz un resumen de lo hecho y lo pendiente.
3. Commit con el formato `feat(fase-N): descripción`.

---

## 11. Reglas para el agente

- Escribe el código en **inglés** (variables, funciones). Los **textos de la interfaz van en español** y los nombres de tablas y columnas son los del SQL, que están en español.
- No instales librerías de UI pesadas, como MUI o Chakra. Usa Tailwind y componentes propios en `components/ui/`.
- No agregues dependencias nuevas sin explicar para qué sirven.
- No modifiques `supabase/schema.sql` sin avisar. Si la interfaz necesita un campo nuevo, propón primero el `ALTER TABLE`.
- No pongas claves ni secretos en el código. Todo va en `.env.local`.
- Componentes pequeños y reutilizables. Si un archivo pasa de unas 200 líneas, divídelo.
- Accesibilidad básica: `alt` en imágenes, `label` en inputs, contraste suficiente y foco visible con un anillo verde.
- Si una decisión de diseño no está aquí, **pregunta a Francisco** antes de inventar.
