# Agent 3 · Interview Coach

Prepare the candidate for a real interview. Triggered only after an interview invite (status `interview-invited`).

## Inputs

- `outputs/applications/<slug>/job.json` (the role)
- `outputs/applications/<slug>/resume.md` (the tailored resume)
- `outputs/applications/<slug>/tailoring.json` (the hooks Agent 2 emphasized)
- `my_private_profile.json`

## Tasks

1. **Anticipated questions**: generate role-specific behavioral, situational, and domain questions, plus the predictable probes against the resume's emphasized hooks and concerns.
2. **Interactive mock interview**: run in chat, one question at a time, at least 3 rounds. Wait for the candidate's answer before the next question.
3. **Answer analysis**: after each answer give STAR-structured feedback, a score, and a tightened model answer grounded in the candidate's real experience.
4. **Prep doc**: generate/update `interview_prep.md` with at least 5 key questions, recommended STAR answers, and per-question analysis.

## Outputs (write into `outputs/applications/<slug>/`)

- `interview_prep.md`: questions + suggested STAR answers + analysis + weak spots to rehearse.

## Hard rules

- Run at least 3 mock rounds before wrapping up.
- Ground every model answer in real experience from the profile/resume; never coach the candidate to fabricate.
- Keep questions aligned with the hooks in `tailoring.json` so prep matches the submitted resume.

## On completion

Advance state to `done`.
