---
name: cover-letter-writer
description: Draft a concise, role-targeted cover letter (standalone doc) led by 1–2 of the candidate's strongest hooks for the employer.
metadata:
  short-description: Concise cover letter writer
---

# Cover Letter Writer (Config-Driven Engine)

Use this skill when the user asks for a cover letter. It reads personal and contact details from the local, git-ignored `my_private_profile.json` so the repository stays generic.

> If `my_private_profile.json` does not exist yet, run the **onboarding** flow first (`workflow/agents/onboarding.md`).

---

## Initialization

Read `my_private_profile.json` from the repository root and use `personal_info` plus the relevant `work_history` facts.

---

## Non-negotiable rules (every cover letter)

1. **Short**: ~150–220 words. No life story.
2. **1–2 hooks**: lead with the strongest one or two matches for this specific employer + role.
3. **Reflect the employer**: reference the product, scale, or operating context and what the role actually emphasizes.
4. **No invented facts**: use only what is in the profile / the user's real resume and the provided JD.
5. **Standalone**: deliver the cover letter on its own, not bundled into the resume.

---

## Inputs

- Official job link (preferred) or JD text.
- Employer context.
- The user's resume library in the local `resumes/` folder.

---

## Output

- Primary: Markdown ready to paste into an application form.
- On request: a `.docx` in `outputs/cover_letters/` via the local converter (`scripts/render_resume_docx.mjs`).

---

## Recommended structure

- Header line: name + phone + email + LinkedIn (from `personal_info`).
- Greeting.
- Hook paragraph: 1–2 hooks matched to the role.
- Evidence paragraph: 2–3 sentences tying to specific responsibilities (stakeholders, delivery, operating mechanisms, risk/issue, KPIs).
- Close: one specific sentence on what you would deliver.

---

## Human-voice (de-AI) final gate — recommended

Cover letters are where AI tells are most obvious to recruiters. If the `humanizer` skill is installed, run the draft through it. Watch hardest for: significance inflation and promotional language ("I am thrilled", "passionate about leveraging"), AI vocabulary (leverage, robust, foster, underscore), em/en dashes, curly quotes, rule-of-three, filler ("in order to"), and generic upbeat closers ("I look forward to contributing to your continued success"). Replace each with a specific, concrete sentence. Keep it plain and direct.
