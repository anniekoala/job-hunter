<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-2f72c4?style=for-the-badge" alt="English"></a>
  <a href="README.zh.md"><img src="https://img.shields.io/badge/%E4%B8%AD%E6%96%87-d0d7de?style=for-the-badge" alt="中文"></a>
</p>

# Job Hunter

A configuration-driven job-search workspace: a 3-agent workflow plus a set of AI agent skills that take you from "which roles should I apply to?" all the way to "I'm ready for the interview" — while keeping every piece of your personal data local and git-ignored.

The repository is generic and public-safe. **All personal data lives in two local files that are never committed:** `my_private_profile.json` and `job_search_preferences.json`.

---

## What it does

| Stage | Agent | Output |
|------|-------|--------|
| **0. Onboarding** | builds your profile (from a resume or by interview) + captures your job targets | `my_private_profile.json`, `job_search_preferences.json` |
| **1. Job Scout** | searches, verifies active links, filters to *your* targets, scores fit | a ranked shortlist in chat |
| **2. Application Builder** | JD analysis → gap analysis → tailored resume → PDF/DOCX → cover letter | `outputs/applications/<role>/` |
| **3. Interview Coach** | anticipated questions → mock interview → STAR feedback | `interview_prep.md` |

It is **manually driven**: you decide which roles to pursue, you submit applications yourself, and interview prep only starts after a real invite. No agent ever submits an application for you.

---

## Quick start

### 1. Onboarding (first run)
Open this workspace in your AI coding agent and say:

> "I'm new here — run onboarding to set up my profile."

The onboarding agent (`workflow/agents/onboarding.md`) will either:
- **parse an existing resume** you paste or point it to, or
- **interview you** to build your profile from scratch,

then ask the two questions that drive your search: **what kind of work do you want**, and **which companies are you targeting**. It writes:

- `my_private_profile.json` ← copy of `profile.example.json`
- `job_search_preferences.json` ← copy of `job_search_preferences.example.json`

Both are git-ignored and stay on your machine.

You can also set them up by hand:

```bash
cp profile.example.json my_private_profile.json
cp job_search_preferences.example.json job_search_preferences.json
# then edit both with your data
```

### 2. Install the render dependencies (once)

```bash
cd scripts && npm install   # installs Playwright + Chromium
```

(PDF/HTML rendering uses Playwright. DOCX conversion uses macOS `textutil`.)

### 3. Use the workflow
See `workflow/README.md` for the day-to-day commands (`new-application.mjs`, `advance.mjs`) and the full state machine.

---

## Directory structure

```text
├── README.md
├── PLAYBOOK.md                      # Reusable process + styling preferences
├── profile.example.json             # Template → copy to my_private_profile.json (git-ignored)
├── job_search_preferences.example.json  # Template → copy to job_search_preferences.json (git-ignored)
├── skills/
│   ├── job-application-architect/   # 5-step guided tailoring workflow
│   ├── resume-writer/               # Config-driven resume rules
│   └── cover-letter-writer/         # Concise cover letter rules
├── workflow/
│   ├── README.md                    # The 3-agent pipeline + state machine
│   ├── workflow.config.json
│   ├── agents/                      # onboarding, job-scout, application-builder, interview-coach
│   ├── scripts/                     # new-application.mjs, advance.mjs (pipeline state)
│   └── schemas/
├── scripts/                         # render_resume_pdf / _docx / measure_html (+ package.json)
└── .gitignore                       # Keeps profile, preferences, resumes, outputs local
```

---

## Privacy

`.gitignore` keeps all of the following local-only:
- `my_private_profile.json`, `job_search_preferences.json` — your data and targets
- `resumes/` — your real resume library
- `outputs/` — everything the agents generate for real applications
- `scratch/` — personal notes and experiments

The skills and workflow contain **no** personal information — they read everything from the two git-ignored config files at runtime. Fork it, fill in your own profile, and it works for your search, not anyone else's.
