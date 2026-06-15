---
name: job-application-architect
description: A step-by-step interactive workflow to analyze a job description, run a match/gap analysis, tailor the resume, verify layout, and draft a cover letter. Config-driven and public-safe.
metadata:
  short-description: Guided end-to-end application tailor
---

# Job Application Architect

Use this skill at the start of any chat where the user wants to tailor application materials for a specific role. It is a generic, configuration-driven engine: it reads all personal data, work history, and constraints from the local, git-ignored `my_private_profile.json`, so the repository itself stays clean and public-safe.

> **First time here?** If `my_private_profile.json` does not exist, run the onboarding flow first: `workflow/agents/onboarding.md`. It builds the profile from the user's existing resume or by interview, then captures what roles and companies they are targeting.

---

## Initialization: load the local profile

Read `my_private_profile.json` from the repository root and load:

- `personal_info`, `education`, `certifications`
- `work_history` (companies, titles, locations, periods, highlights)
- `restricted_keywords` (words to remove / substitute)
- `skills`, `skills_customization.priority_skills`

Do not hard-code any candidate-specific values into this skill. Everything is read from the profile.

---

## The 5-step guided workflow

Execute sequentially. Do not skip ahead. Guide the user interactively.

### Step 1 — Job analysis
Ask for the JD text or official link, plus company/department context. Extract:
- **Core responsibilities** (operational, technical, stakeholder).
- **Hidden intent / pain points** (e.g. building from scratch, crisis escalation, scaling).
- **Technical-fluency requirement**: does the role need hands-on coding, or technical coordination with engineering/policy?

### Step 2 — Gap analysis & strategy
Match the candidate's `work_history` against the JD. Call out gaps and risks, and agree on the 1–2 narrative hooks to emphasize. **Present this and wait for the user's feedback before drafting.**

### Step 3 — Draft the Markdown resume
Apply all `resume-writer` rules: remove restricted keywords, order priority skills first, bold action hooks per bullet, consistent tense. Insert `<!-- page-break -->` where a page must break. **Finalize and get explicit approval on the resume before touching the cover letter.**

### Step 4 — Compile & verify layout
```bash
node scripts/render_resume_pdf.mjs  outputs/resumes/<name>.md  outputs/resumes/<name>.pdf
node scripts/render_resume_docx.mjs outputs/resumes/<name>.md  outputs/resumes/<name>.docx
node scripts/measure_html.mjs       outputs/resumes/<name>.html
```
Verify the page count and fill. If aiming for exactly 2 pages, page 1 must be full and the intended entry must start at the top of page 2. Recalibrate spacing/margins if not, then re-render.

### Step 5 — Cover letter
Only after the resume is approved. Use the `cover-letter-writer` rules: 150–220 words, lead with 1–2 hooks matched to the employer.

---

## Guardrails

- **No fabrication.** Source only from `my_private_profile.json` and the user's real resumes. Never invent companies, titles, metrics, or credentials.
- **Resume before cover letter**, always.
- **De-AI pass** on both documents before showing them (see the humanizer note in `resume-writer` / `cover-letter-writer`).
- Keep all generated files under `outputs/` (git-ignored).
