---
name: resume-writer
description: Draft a submission-ready resume (PDF/DOCX) tailored to one role, driven entirely by the local profile config. No fabricated facts.
metadata:
  short-description: Config-driven resume tailor
---

# Resume Writer (Config-Driven Engine)

Use this skill whenever the user asks to write or tailor a resume for a specific role. It reads **all** personal information, work history, and constraints from the local, git-ignored profile file `my_private_profile.json` so the repository itself stays generic and public-safe.

> If `my_private_profile.json` does not exist yet, run the **onboarding** flow first (`workflow/agents/onboarding.md`) to build it from the user's existing resume or by interview.

---

## Initialization: load the local profile

At the start, read `my_private_profile.json` from the repository root and use:

- `personal_info` — name, email, phone, LinkedIn, location, credentials suffix
- `education`, `certifications`
- `work_history` — each entry's company, title, location, period, highlights
- `skills`, `skills_customization.priority_skills`
- `restricted_keywords.remove` and `restricted_keywords.use_instead`

Never hard-code any of these values into this file. Everything comes from the profile.

---

## Non-negotiable global rules (apply to every resume)

1. **Source of truth**: use only facts present in `my_private_profile.json` or the user's existing resumes. Never invent companies, titles, metrics, dates, or credentials.
2. **Restricted keywords**: remove every word in `restricted_keywords.remove`; apply every substitution in `restricted_keywords.use_instead`.
3. **Priority skills ordering**: if `skills_customization.priority_skills` is set, list that skill family first, in the given order.
4. **Header**: name, then a contact line (email · phone · LinkedIn), then `credentials_suffix` if present. No marketing taglines.
5. **Professional Summary**: bullet points (not a paragraph). Bold only the short hook phrase at the start of each bullet.
6. **Experience bullets**: each begins with a short bold action hook, then the concrete result. Keep tense consistent (present for the current role, past for everything else).
7. **Education**: bold the degree name; compress spacing (no blank lines between degrees). Use trailing double-spaces so Markdown viewers keep entries on separate lines.
8. **No invented rankings**: if a bullet says "Top N", keep it only if it is true in the source resume.

---

## Inputs to gather

- Official job link (preferred) or full JD text.
- Target location preference (from `job_search_preferences.json` if present).
- Which base resume(s) to reference — the user's local `resumes/` folder.

---

## Layout & multi-page handling

- Insert the marker `<!-- page-break -->` where a page break must occur (e.g. before a specific experience entry that should start at the top of page 2).
- Target a clean 1–2 page resume. If aiming for exactly 2 pages, page 1 should be full before content flows to page 2.

---

## Output

Default deliverable: a Markdown resume, then compiled `PDF` (+ intermediate HTML) and `DOCX`, written under `outputs/` (git-ignored).

Compile with the local scripts:

```bash
node scripts/render_resume_pdf.mjs  <input.md> <output.pdf>
node scripts/render_resume_docx.mjs <input.md> <output.docx>
node scripts/measure_html.mjs       <output.html>   # verify page count / fill
```

(`scripts/` needs `npm install` once; DOCX conversion uses macOS `textutil`.)

---

## Human-voice (de-AI) final gate — recommended

Before delivering, strip AI tells from the resume. If the `humanizer` skill is installed, run the draft through it. Highest-yield fixes for resumes:

- Cut AI vocabulary: leverage, spearhead, foster, robust, seamless, underscore, pivotal, landscape, testament, "drive alignment". Use plain verbs and the concrete result.
- Kill "-ing" padding and significance inflation ("played a pivotal role in…").
- Remove forced rule-of-three triplets and synonym cycling.
- No em/en dashes, curly quotes, or emojis.
- Trim filler ("in order to" → "to") and generic positive summary lines.

Keep the bold lead hook on each experience bullet and the priority-skills ordering even though a general de-AI pass warns against boldface. Keep the voice plain and professional; do not inject first-person "personality" into a resume.
