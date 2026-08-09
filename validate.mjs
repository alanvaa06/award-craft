// validate.mjs — structural acceptance test for the award-craft plugin.
// Dependency-free Node ESM. Exit 0 = all green, non-zero = failures.
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';

let failures = 0;
const fail = (m) => { console.error('FAIL: ' + m); failures++; };
const ok = (m) => console.log('ok:   ' + m);

// 1. plugin.json
const PJ = '.claude-plugin/plugin.json';
try {
  const j = JSON.parse(readFileSync(PJ, 'utf8'));
  if (j.name !== 'award-craft') fail(`${PJ}: name "${j.name}" != "award-craft"`);
  for (const f of ['displayName', 'version', 'description', 'homepage', 'repository', 'license'])
    if (!j[f]) fail(`${PJ}: missing ${f}`);
  if (!failures) ok(`${PJ} valid`);
} catch (e) { fail(`${PJ}: ${e.message}`); }

// 1b. marketplace.json — one root-plugin entry
const MP = '.claude-plugin/marketplace.json';
try {
  const m = JSON.parse(readFileSync(MP, 'utf8'));
  if (m.name !== 'award-craft') fail(`${MP}: bad name`);
  if (!m.owner?.name) fail(`${MP}: missing owner.name`);
  if (!Array.isArray(m.plugins) || m.plugins.length !== 1) fail(`${MP}: must list exactly one plugin`);
  else if (m.plugins[0].source !== './') fail(`${MP}: plugins[0].source must be "./"`);
  ok(`${MP} checked`);
} catch (e) { fail(`${MP}: ${e.message}`); }

if (!existsSync('LICENSE')) fail('LICENSE missing');

// 2. Skills: existence, frontmatter, load-bearing markers, token budget (~4 chars/token)
const SKILL_BUDGET = 20000;   // chars ≈ 5K tokens
const REF_BUDGET = 26000;     // chars ≈ 6.5K tokens
const SKILLS = [
  { path: 'skills/craft/SKILL.md', name: 'craft',
    markers: ['Preflight', 'Intake', 'brand source', 'GATE', 'verify', 'guión'] },
  { path: 'skills/elevate/SKILL.md', name: 'elevate',
    markers: ['Preflight', 'Gap-analysis', 'GATE', 'verify', 'antes/después'] },
  { path: 'skills/direction/SKILL.md', name: 'direction',
    markers: ['two-pass', 'signature moment', 'Drift vs brand source', 'tokens', 'motion identity', 'Calibration dials', 'Verbal identity', 'Credit ceiling', 'Video tier'] },
  { path: 'skills/build-recipes/SKILL.md', name: 'build-recipes',
    markers: ['Lenis', 'reduced-motion', 'anti-patterns', 'placeholders', 'ratio'] },
  { path: 'skills/assets/SKILL.md', name: 'assets',
    markers: ['Higgsfield', 'DESIGN.md', 'slot', 'WebP', 'Naming', 'Reference Elements', 'Cost preflight', 'Cost levers', 'Refine mode'] },
  { path: 'skills/verify/SKILL.md', name: 'verify',
    markers: ['screenshot', 'checklist', 'verified_', '3 iterations', 'mobile'] },
];
for (const s of SKILLS) {
  if (!existsSync(s.path)) { fail(`${s.path} missing`); continue; }
  const t = readFileSync(s.path, 'utf8');
  if (!t.startsWith('---')) fail(`${s.path}: missing YAML frontmatter`);
  if (!new RegExp(`^name:\\s*${s.name}\\s*$`, 'm').test(t)) fail(`${s.path}: frontmatter name != ${s.name}`);
  if (!/^description:\s*.+$/m.test(t)) fail(`${s.path}: missing description`);
  if (!/description:.*[Uu]se when/.test(t)) fail(`${s.path}: description must state when to use`);
  for (const mk of s.markers) if (!t.includes(mk)) fail(`${s.path}: missing marker "${mk}"`);
  if (t.length > SKILL_BUDGET) fail(`${s.path}: ${t.length} chars > budget ${SKILL_BUDGET}`);
  ok(`${s.path} checked`);
}

// 3. References: existence + size budget
const REFS = [
  'skills/direction/references/awwwards-rubric.md',
  'skills/direction/references/typography.md',
  'skills/direction/references/motion-system.md',
  'skills/direction/references/trends.md',
  'skills/direction/references/copywriting.md',
  'skills/build-recipes/references/lenis-setup.md',
  'skills/build-recipes/references/scrolltrigger-patterns.md',
  'skills/build-recipes/references/scroll-video.md',
  'skills/build-recipes/references/page-anatomy.md',
  'skills/build-recipes/references/anti-patterns.md',
  'skills/build-recipes/references/r3f.md',
  'skills/assets/references/prompting.md',
  'skills/verify/references/checklist.md',
];
for (const r of REFS) {
  if (!existsSync(r)) { fail(`${r} missing`); continue; }
  const n = statSync(r).size;
  if (n > REF_BUDGET) fail(`${r}: ${n} bytes > budget ${REF_BUDGET}`);
  else ok(`${r} within budget`);
}

// 4. Templates + golden brief
for (const f of ['templates/PRODUCT.md.template', 'templates/DESIGN.md.template',
                 'templates/design-plan.template.md', 'tests/golden-brief.md'])
  if (!existsSync(f)) fail(`${f} missing`); else ok(`${f} exists`);

// 5. Every ${CLAUDE_PLUGIN_ROOT}/ path mentioned in skills/references must resolve.
const mdFiles = [];
const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) {
  const p = d + '/' + e.name;
  if (e.isDirectory()) walk(p); else if (e.name.endsWith('.md')) mdFiles.push(p);
} };
walk('skills');
const PATH_RE = /\$\{CLAUDE_PLUGIN_ROOT\}\/([A-Za-z0-9_\-./]+\.(?:md|template))/g;
for (const f of mdFiles) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(PATH_RE)) {
    if (!existsSync(m[1])) fail(`${f}: broken plugin-root path ${m[1]}`);
  }
}
ok('all ${CLAUDE_PLUGIN_ROOT} paths resolve');

// 6. Minimum sizes — a truncated skill/reference must not pass silently.
for (const s of SKILLS) if (existsSync(s.path) && statSync(s.path).size < 800)
  fail(`${s.path}: suspiciously small (<800 bytes)`);
for (const r of REFS) if (existsSync(r) && statSync(r).size < 1200)
  fail(`${r}: suspiciously small (<1200 bytes)`);
ok('minimum sizes checked');

// 7. Content contracts: design-plan template headers + 12 checklist items.
const dp = readFileSync('templates/design-plan.template.md', 'utf8');
for (const h of ['## Design read', '## Tokens', '## Motion identity', '## Verbal identity',
                 '## Calibration dials', '## Art direction', '## Wireframe', '## Signature moment',
                 '## Drift vs brand source', '## Asset slots'])
  if (!dp.includes(h)) fail(`design-plan.template.md: missing header "${h}"`);
const cl = readFileSync('skills/verify/references/checklist.md', 'utf8');
const numbered = cl.match(/^\d+\./gm) || [];
if (numbered.length !== 23) fail(`checklist.md: expected 23 numbered checks, found ${numbered.length}`);
ok('content contracts checked');

console.log(failures ? `\n${failures} failure(s)` : '\nALL GREEN');
process.exit(failures ? 1 : 0);
