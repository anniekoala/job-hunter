# Application Playbook & Tailoring Workflow

A reusable playbook for analyzing a job posting, running a gap analysis, and producing aligned resume + cover letter materials. All personal data is loaded from the git-ignored `my_private_profile.json`; this file only describes the *process and styling preferences* you can adapt.

---

## Part 1 — The 5-step application workflow

### Step 1: Job description & intent analysis
Extract from the posting:
- **Core responsibilities**: the main operational, technical, and stakeholder tasks.
- **Hiring manager's hidden intent**: the underlying pain points (building from scratch, crisis escalation, scaling a process).
- **Technical fluency requirement**: hands-on coding vs. coordination with engineering/policy.

### Step 2: Gap analysis & match strategy
Compare your background (`work_history`) against the posting:
- **Core alignment**: your strongest matching stories.
- **Gaps / risks**: what's missing, and how to address or reframe it.
- **Highlight strategy**: the 1–2 narrative themes to elevate.

### Step 3: Markdown resume drafting
- Apply the styling rules in Part 2.
- Start each experience bullet with a short bold action hook.
- Keep tense consistent (present for the current role, past for the rest).
- **Rule**: finalize and get explicit approval on the resume *before* drafting the cover letter.

### Step 4: Cover letter & essays
Only after the resume is approved:
- **Cover letter**: 150–220 words, 1–2 high-impact hooks, concrete achievements.
- **"Why this company" essay** (if requested): mission alignment and motivation, not a repeat of resume bullets.

### Step 5: Final review & compilation
- Proofread the Markdown for formatting, wordiness, and structure.
- **Rule**: don't run the render scripts repeatedly while editing. Approve the Markdown first, then render once to PDF/DOCX/HTML.

---

## Part 2 — Resume styling preferences (adapt to taste)

### Header & contact
- Load all contact details and credentials from `personal_info`.
- Centered subheader: email · phone · LinkedIn, then credentials.
- No marketing taglines unless explicitly requested.

### Skills layout
- If you set `skills_customization.priority_skills`, list that family first.
- Then group the rest (domain, tools, languages).
- Apply `restricted_keywords` (remove + substitutions).

### Bullet formatting
- Professional summary as bullets (not a paragraph), with bold hook phrases.
- Every experience bullet opens with 3–5 bolded hook words, then the concrete result.

### Experience
- One section per `work_history` entry: `### {company} — {location}`, then title and period.
- Treat distinct legal entities / regions as separate sections if that reflects reality.

### Education
- Bold degree names, compress spacing, one entry per line (trailing double-spaces).

---

## Part 3 — Compilation

- PDF: `node scripts/render_resume_pdf.mjs <input.md> <output.pdf>`
- DOCX: `node scripts/render_resume_docx.mjs <input.md> <output.docx>`
- Measure: `node scripts/measure_html.mjs <output.html>`
- Default margins live in the render script; adjust there if you need a tighter or looser fit.

---

## Part 4 — Career-alignment filters

Your role filters live in `job_search_preferences.json` (target titles, themes, companies, location, excludes). The Job Scout reads that file, so update it there rather than hard-coding preferences anywhere in this repo.
