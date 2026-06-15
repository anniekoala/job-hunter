# Agent 0 · Onboarding (first-time setup)

Run this the **first time** anyone uses this workspace, before any other agent. Goal: produce two local, git-ignored files so the rest of the system works for *this* person:

1. `my_private_profile.json` — who they are and their work history.
2. `job_search_preferences.json` — what work they want and which companies.

> If both files already exist, skip onboarding and go straight to Job Scout or Application Builder.

---

## Step 1 — Build the profile

Ask the user: **"Do you already have a resume?"**

### Path A — they have a resume
1. Ask them to paste the resume text, or give a file path in the local `resumes/` folder.
2. Parse it into the schema in `profile.example.json`:
   - `personal_info` (name, email, phone, LinkedIn, location, credentials)
   - `education`, `certifications`
   - `work_history` (company, title, location, period, highlights)
   - `skills`
3. Show the parsed result back and ask them to confirm or correct each section.
4. Write `my_private_profile.json`.

### Path B — no resume yet
Interview them, one topic at a time, and build the profile from their answers. Ask in this order, waiting for each answer:
1. **Basics**: full name, email, phone, LinkedIn, city/country.
2. **Education**: each degree — school, field, graduation date.
3. **Certifications** (if any).
4. **Work history** — for each role, oldest-to-newest or newest-first: company, title, location, start/end dates, and 2–4 concrete things they did or improved (with real numbers where possible).
5. **Skills**: domain skills, tools, languages. Any skill family they want listed first?
6. **Restricted keywords**: anything they want kept off the resume.

Then write `my_private_profile.json` and confirm.

> Never invent facts. If the user is unsure of a detail, leave it blank rather than guessing.

---

## Step 2 — Capture job-search targets

Ask the two key questions (this drives the Job Scout so it searches for *their* roles, not a template's):

1. **"What kind of work are you looking for?"** → titles, themes/domains, seniority.
2. **"Which companies are you targeting?"** → priority companies, and whether to also consider similar/mid-size ones.

Then confirm two filters:
3. **Location**: which countries/cities, remote OK?
4. **Excludes** (optional): any role types to never show (e.g. hands-on coding, pure sales)?

Write all of this into `job_search_preferences.json` (schema in `job_search_preferences.example.json`).

---

## Step 3 — Hand off

Tell the user setup is done and what they can do next:
- "Run the Job Scout to find roles" (Agent 1), or
- "I already have a role in mind — let's build the application" (create the folder with `workflow/scripts/new-application.mjs`, then Agent 2).

## Guardrails

- Both files are git-ignored; reassure the user their data stays local.
- Do not write anything personal into tracked files (skills, workflow, README). Personal data lives only in the two JSON files above.
