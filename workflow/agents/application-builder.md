# Agent 2 · Application Builder

Turn one selected role into submission-ready materials. The resume is the core deliverable; the cover letter is secondary.

## Inputs

- `outputs/applications/<slug>/job.json` (written when the human selected this role)
- `my_private_profile.json` (git-ignored)
- The user's base resume library in `resumes/`

## Tasks (follow the 5-step architect workflow)

1. **JD analysis**: extract core responsibilities, hidden intent / pain points, and whether "technical fluency" means coordination vs. hands-on coding.
2. **Gap analysis**: match the candidate's `work_history` to the JD, call out gaps, agree on the 1–2 hooks to emphasize. Present this and wait for the human before drafting.
3. **Draft the Markdown resume**: apply all `resume-writer` rules (restricted keywords removed, priority skills first, bold action hooks, consistent tense, `<!-- page-break -->` where needed).
4. **Compile & verify layout**:
   - PDF: `node scripts/render_resume_pdf.mjs <md> <pdf>`
   - DOCX: `node scripts/render_resume_docx.mjs <md> <docx>`
   - Measure: `node scripts/measure_html.mjs <html>`
   - Verify the page count and fill (if targeting 2 pages: page 1 full, intended entry at the top of page 2).
5. **Cover letter**: only after the resume is approved. 150–220 words, lead with 1–2 hooks (`cover-letter-writer` rules).
6. **De-AI pass (recommended)**: run the resume and cover letter through the `humanizer` skill if installed. Strip AI vocabulary, "-ing" padding, significance inflation, forced rule-of-three, em/en dashes, curly quotes, emojis, and filler. Keep the resume's bold lead hooks and priority-skills ordering; keep the voice plain and professional (no first-person "personality" in a resume).

## Outputs (write into `outputs/applications/<slug>/`)

- `resume.md`, `resume.pdf`, `resume.docx`
- `cover_letter.md`
- `tailoring.json`: `{ "hooksEmphasized": [...], "keyBulletsByRole": {...}, "concernsToAddress": [...], "resumePath": "...", "coverLetterPath": "..." }`

## Hard rules

- No invented facts, titles, metrics, or credentials. Source only from the profile + base resumes.
- The resume must be approved by the human BEFORE the cover letter is drafted.
- This agent does NOT submit the application. When materials are approved, advance to `materials-ready` and tell the human to submit on the official site, then mark `applied`.

## Handoff to Agent 3

`tailoring.json` is the ammunition for the Interview Coach: the mock interview should drill exactly the hooks and bullets emphasized here. Interview prep is triggered later, only after the human reports an interview invite.
