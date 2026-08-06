# award-craft — Design Doc

**Fecha:** 2026-08-06
**Estado:** Aprobado por Alan (brainstorming session, Claude Code)
**Versión objetivo:** v0.1.0

## 1. Visión

Plugin de Claude Code que **construye y eleva landing pages nivel Awwwards** sobre un stack fijo, con doctrina destilada de `C:\Obsidian\wiki\Web Design\`, assets generados exclusivamente vía **Higgsfield MCP**, y **verify visual obligatorio** como definition of done.

Principio rector (del research del vault): *context tells, loops enforce* — la doctrina pasiva se ignora bajo presión de generación; el plugin orquesta y verifica, no solo informa.

**Delegaciones (no duplicar):**
- Linting de diseño / anti-patrones genéricos → **impeccable** (ya instalado, trae su propio hook)
- Uso correcto del API GSAP → **gsap-skills** (oficial GreenSock)
- Generación de imagen/video → **Higgsfield MCP**

## 2. Decisiones tomadas (con alternativas descartadas)

| # | Decisión | Alternativas descartadas |
|---|---|---|
| 1 | **Constructor guiado end-to-end** (craft + elevate) | Solo capa de doctrina (contexto pasivo se ignora); solo auditor (no crea) |
| 2 | **Stack fijo: Next.js + Tailwind + GSAP + Lenis, R3F opcional por proyecto** | Stack-agnóstico (diluye recipes; las 3 landings activas de Alan ya usan este stack: Tulum, alanvaa, tu-tribu) |
| 3 | **Ambos entrypoints: `/craft` y `/elevate`** | Solo greenfield (pierde Tulum/alanvaa); solo elevate (pierde tu-tribu) |
| 4 | **Verify loop obligatorio dentro de craft/elevate; sin hooks propios** | Verify opcional (reabre "edit = done"); hooks propios (duplica impeccable) |
| 5 | **Nombre: `award-craft`** | web-forge (confunde con forge-master) |
| 6 | **Arquitectura: 2 orquestadores + subskills expuestas como comandos sueltos** | Pipeline de 5 fases gateado estilo agent-cycle (demasiada ceremonia para un run de horas); monolito puro (pierde re-verify/re-assets à la carte tras ediciones manuales de Alan) |

**Un solo gate humano** en cada flujo: aprobación del design plan (craft) / del plan de elevación (elevate). Es el único punto donde el taste de Alan es insustituible.

## 3. Superficie de comandos

| Comando | Función |
|---|---|
| `/award-craft:craft <brief> [@docs] [--brand <ruta>]` | Landing nueva end-to-end: intake → design plan (GATE) → build → assets → verify |
| `/award-craft:elevate [ruta]` | Gap-analysis de landing existente → plan priorizado (GATE) → aplicar → verify |
| `/award-craft:verify` | Solo el loop de verificación (re-correr tras ediciones manuales) |
| `/award-craft:assets <slot>` | Regenerar assets de un slot desde DESIGN.md sin tocar código |

## 4. Estructura del repo

```
award-craft/                          # C:\Proyectos\award-craft
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   ├── direction/
│   │   ├── SKILL.md                  # two-pass, reglas de drift, signature moment
│   │   └── references/
│   │       ├── awwwards-rubric.md    # 40/30/20/10, anatomía de página, checklist 12 pts
│   │       ├── typography.md         # pairing, escala extrema, tracking display
│   │       ├── motion-system.md      # curvas firma, bandas de duración, stagger
│   │       └── trends.md             # 2025-26: kinetic type, dark luxury, etc.
│   ├── build-recipes/
│   │   ├── SKILL.md                  # orden de construcción, qué patrón cuándo
│   │   └── references/
│   │       ├── lenis-setup.md        # ticker GSAP, lagSmoothing(0)
│   │       ├── scrolltrigger-patterns.md  # pin+scrub, storytelling, horizontal, parallax, batch, matchMedia
│   │       ├── scroll-video.md       # canvas sequence, ffmpeg, preload/decode
│   │       ├── page-anatomy.md       # preloader, hero, overlay menu, footer
│   │       ├── anti-patterns.md      # checklist de errores documentados
│   │       └── r3f.md               # solo si el design plan pide 3D
│   ├── assets/
│   │   ├── SKILL.md                  # brief-por-slot, mapa de ratios, tools Higgsfield, post-specs
│   │   └── references/
│   │       └── prompting.md          # vocabulario premium, negative space, loops seamless
│   └── verify/
│       ├── SKILL.md                  # protocolo del loop
│       └── references/
│           └── checklist.md          # los 12 checks cuantitativos
├── commands/
│   ├── craft.md
│   ├── elevate.md
│   ├── verify.md
│   └── assets.md
├── templates/
│   ├── DESIGN.md.template
│   ├── PRODUCT.md.template
│   └── design-plan.template.md
├── docs/superpowers/specs/           # este doc
├── validate.mjs
├── README.md
├── CHANGELOG.md
└── LICENSE
```

**Regla de tokens:** cada SKILL.md < 5.000 tokens; doctrina profunda en `references/` con carga a demanda (progressive disclosure). El vault (`wiki/Web Design/`) es la fuente de verdad; el plugin embebe el destilado portable. Al actualizar el wiki, regenerar references manualmente (no hay sync automático en v1).

## 5. Flujo `/craft`

```
0. PREFLIGHT — verificar dependencias:
   Core (detiene si falta):     gsap-skills, impeccable
   Core para fase assets:       Higgsfield MCP conectado (si falta: build continúa,
                                fase assets queda bloqueada y se reporta)
   Opcional (solo aviso):       remotion / hyperframes (video a medida), ffmpeg (frames)

1. INTAKE — inputs aceptados en cualquier combinación:
   - Brief en texto
   - Documentos: @PRD.md, @brand.md, @guion.md (guión del landing: secciones, copy, narrativa)
   - --brand <ruta>: carpeta de negocio externa con PRODUCT.md / DESIGN.md

   Resolución de brand source (en orden):
   a) PRODUCT.md / DESIGN.md en el repo destino → usarlos
   b) Carpeta externa (--brand o preguntada) → IMPORTAR como copia de trabajo local
      con frontmatter de procedencia (source: <ruta>, imported: <fecha>).
      La carpeta de negocio NUNCA se escribe — es fuente, no destino.
   c) No existen → crearlos vía entrevista

   SIEMPRE genera preguntas de comprensión (aunque haya docs): oferta, audiencia,
   CTA principal, tono (3 adjetivos), referencias/anti-referencias visuales,
   qué sección del guión es el clímax (candidata a signature moment).
   Si docs + respuestas no bastan → entrevista profunda (una pregunta a la vez)
   hasta poder escribir PRODUCT.md sin huecos.

   Si hay guión: el scroll narrative se estructura sobre él — el guión ES la
   estructura de la página.

2. DESIGN PLAN (skill direction):
   - Tokens: 4-6 colores nombrados con hex, 2-3 type roles (display/body/utility)
   - Motion identity: 1 curva firma + variantes exit/emphasized, bandas de duración,
     unidad de stagger
   - Dirección de arte + wireframe ASCII por sección del guión
   - UN signature moment justificado contra el brief
   - Sección "Drift vs brand source": cada desviación de la identidad importada,
     con razón — se aprueba conscientemente, no por accidente.
     Identidad núcleo hereda (paleta, tipografía, voz, anti-referencias);
     lo específico del landing puede desviarse (signature, tokens de sección, motion).

   ═══ GATE: aprobación de Alan ═══  → escribe DESIGN.md en el repo destino

3. SCAFFOLD + BUILD (skill build-recipes):
   Next + Tailwind + GSAP + Lenis desde recipes; scroll narrative según guión;
   placeholders de assets con ratios exactos por slot; matchMedia con variante
   prefers-reduced-motion desde el inicio (no retrofit).

4. ASSETS (skill assets):
   Brief por slot derivado de DESIGN.md (paleta, mood, anti-referencias)
   → Higgsfield MCP → post-specs (ratio, formato WebP/AVIF, peso) → integrar
   en /public con naming por slot (hero-16x9, card-3x2, bg-loop-21x9).

5. VERIFY (skill verify): ver §8.

6. REPORTE FINAL: qué se construyó, score contra checklist, pendientes,
   sugerencias de retro-sync al brand source (drift que merece subir a la marca —
   Alan decide y ejecuta; el plugin nunca escribe en la carpeta de negocio).
```

## 6. Flujo `/elevate`

```
0. PREFLIGHT (igual que craft)
1. LECTURA del proyecto: stack, secciones, animaciones existentes
2. GAP-ANALYSIS contra checklist Awwwards (12 pts) + detectores impeccable
   → informe: qué tiene, qué falta, qué está mal
3. PLAN DE ELEVACIÓN priorizado por impacto/esfuerzo
   ═══ GATE: Alan aprueba qué items aplicar ═══
4. APLICAR items aprobados (mismas recipes de build)
5. VERIFY (§8)
6. REPORTE antes/después
```

## 7. Pipeline de assets (Higgsfield MCP)

- **Generador único en v1**: Higgsfield MCP. Remotion/hyperframes solo como aviso de preflight para video a medida (fuera de alcance v1).
- Brief por slot se deriva de DESIGN.md — nunca prompting ad-hoc: bloque de visual-DNA (estilo, paleta con hex, lighting recipe, grade, textura, composición, mood, Never-list) + especificación del slot (ratio, negative space para UI).
- Mapa de ratios: hero 16:9/21:9 desktop + 9:16 mobile (composición separada, no crop), cards 3:2, retratos 4:5, dividers 21:9/8:1, loops 6-10s <4MB muted.
- Post-specs: WebP/AVIF, <500KB imágenes, variantes por breakpoint, grain unificador.
- `/award-craft:assets <slot>` regenera un slot suelto sin tocar código.

## 8. Verify — checklist cuantitativo

Protocolo: build OK → dev server → screenshots desktop (1280) + mobile (375) →
crítica contra checklist → fix → re-shoot → prefijo `verified_` por pantalla →
una pasada final confirmando el set completo. **Máx 3 iteraciones por issue**; lo
que no converge se reporta como pendiente — nunca loop infinito.

Los 12 checks (cuantitativos, no opinables):

1. Variante `prefers-reduced-motion` existe y renderiza el contenido completo
2. Animaciones continuas usan solo `transform`/`opacity` (grep + inspección)
3. `ease: "none"` en containerAnimation/parallax; scrub numérico (0.5–1.5) en storytelling
4. El signature moment del design plan existe y funciona
5. Colores usados ⊆ paleta de DESIGN.md; fuentes ⊆ definidas
6. Ratios por slot correctos; pesos dentro de budget (<500KB img, <4MB loop)
7. Sin `markers: true`; sin `will-change` global
8. Triggers con pin creados en orden de documento
9. Coreografía mobile diseñada (screenshot 375px evaluado como diseño propio,
   no desktop degradado)
10. Contraste AA en texto sobre media
11. Staggers con cap de total; duraciones dentro de las bandas del motion system
12. Score final contra el checklist Awwwards de 12 puntos → reporte

## 9. Manejo de errores

| Falla | Comportamiento |
|---|---|
| Dependencia core ausente | Preflight detiene con instrucción de instalación |
| Higgsfield MCP caído / sin credits | Build continúa con placeholders; fase assets marcada bloqueada en reporte |
| Verify no converge (3 iteraciones) | Reporta fallos restantes como pendientes, termina limpio |
| Brand source ilegible / conflictivo | Pregunta a Alan en vez de adivinar |
| Guión y brand source contradictorios | Lo señala en el design plan, propone resolución, gate decide |

## 10. Testing del plugin

- **`validate.mjs`** (convención forge-master): estructura del plugin, frontmatter de skills, comandos referencian skills existentes, budget de tokens por reference.
- **Golden brief**: brief sintético fijo (incluido en el repo) → `/craft` en repo temporal → el checklist debe pasar. Regresión barata antes de cada release.
- **Dogfood**: (1) tu-tribu — greenfield, plan 01 ya escrito; (2) `/elevate` sobre alanvaa. Hallazgos alimentan v0.2; los casos reales no redefinen defaults del plan salvo decisión explícita de Alan.
- **Triggering**: descriptions de skills con "use when…" explícito.

## 11. NO-goals v0.1

- Hooks propios del plugin (impeccable ya cubre linting; revisar en v0.2 si el dogfood muestra huecos)
- Stack-agnóstico (Astro/Nuxt/vanilla)
- Retro-sync automático al brand source (solo sugerencias en reporte; Alan ejecuta)
- Video a medida con remotion/hyperframes (aviso de preflight, integración futura)
- Sitios multi-página / rutas múltiples — v0.1 optimiza single-page landing (supuesto razonable derivado del alcance "landing"; escalar a multi-página es candidato v0.2+)
- Score numérico tipo jurado Awwwards como comando standalone
- Publicación en marketplaces externos (marketplace.json local por convención, distribución después)

## 12. Criterio de éxito v0.1

`/craft` produce, desde el guión + brand source de tu-tribu, una landing que:
1. Pasa los 12 checks de verify sin intervención manual en el loop
2. Tiene un signature moment aprobado en el gate y presente en producción
3. Usa exclusivamente assets generados vía Higgsfield MCP integrados a ratio/peso correcto
4. Respeta la identidad del brand source con drift explícitamente aprobado
