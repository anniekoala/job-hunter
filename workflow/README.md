# Job Application Copilot — manual, status-tracked workflow

A manually-driven pipeline. You stay in control: you decide which roles to pursue, you submit applications yourself, and you only trigger interview prep after a real interview invite. **No agent ever submits an application for you.**

## The agents

| # | Agent | What it does | Reads |
|---|-------|--------------|-------|
| 0 | **Onboarding** (`agents/onboarding.md`) | First run only — build your profile (from a resume or by interview) and capture your job targets | writes `my_private_profile.json` + `job_search_preferences.json` |
| 1 | **Job Scout** (`agents/job-scout.md`) | Search, verify active, filter, score fit, recommend apply/skip | `job_search_preferences.json` |
| 2 | **Application Builder** (`agents/application-builder.md`) | JD analysis → tailor resume → compile PDF/DOCX → cover letter | `skills/` + `scripts/` |
| 3 | **Interview Coach** (`agents/interview-coach.md`) | Anticipated Qs → mock interview → STAR analysis → prep doc | `tailoring.json` |

## First time using this workspace?

Run onboarding. It creates the two local, git-ignored files the rest of the system needs:

- `my_private_profile.json` (copy of `profile.example.json`, filled with your data)
- `job_search_preferences.json` (copy of `job_search_preferences.example.json`, with your targets)

Onboarding can build the profile from an existing resume, or by asking you questions if you don't have one.

## Why manual driving (not an auto-orchestrator)

Two gates no software can cross:

1. After Agent 2 builds the resume, **you** submit it on the company site.
2. **You** only reach interview prep if the employer actually invites you.

So each role is just a folder with a `stage`. You nudge it forward one step at a time.

## State machine

```
selected ──▶ building ──▶ materials-ready ──▶ applied ──▶ interview-invited ──▶ interview-prep ──▶ done
  (you pick)  (Agent 2)    (you approve)     (★you submit)   (★employer invites)    (Agent 3)
```

★ = a real-world gate you control. Any stage can also go to `archived`; `applied` can go to `rejected`.

## Per-role folder

```
outputs/applications/<Company>_<Role>/
  ├── job.json            # role facts captured when you selected it
  ├── status.json         # current stage + history (source of truth)
  ├── resume.md/.pdf/.docx # Agent 2
  ├── cover_letter.md      # Agent 2
  ├── tailoring.json       # Agent 2 → ammunition for Agent 3
  └── interview_prep.md    # Agent 3
```

## How to drive it

Run these from the repo root. (Pipeline scripts live in `workflow/scripts/`; resume render scripts live in `scripts/`.)

**When you pick a role to pursue:**

```bash
node workflow/scripts/new-application.mjs \
  --company "Acme" --role "Product Manager" \
  --link "https://careers.acme.com/..." --location "Remote (US)" \
  --fit 8.5 --why "Strong domain + ops match" --concerns "Heavy roadmap ownership"
```

Then, in chat: "Run Agent 2 (Application Builder) for the Acme Product Manager role." When materials are approved:

```bash
node workflow/scripts/advance.mjs --slug "Acme_Product_Manager" --to building
node workflow/scripts/advance.mjs --slug "Acme_Product_Manager" --to materials-ready
```

**After you submit on the company site:**

```bash
node workflow/scripts/advance.mjs --slug "<slug>" --to applied
```

**When you get an interview invite**, then trigger Agent 3:

```bash
node workflow/scripts/advance.mjs --slug "<slug>" --to interview-invited
node workflow/scripts/advance.mjs --slug "<slug>" --to interview-prep
# ... after the mock interview ...
node workflow/scripts/advance.mjs --slug "<slug>" --to done
```

**Check status anytime:**

```bash
node workflow/scripts/advance.mjs --list
node workflow/scripts/advance.mjs --slug "<slug>" --status
```

## Guardrails

- `my_private_profile.json` and `job_search_preferences.json` stay git-ignored.
- Job Scout only recommends roles with a verified-active official link, respecting your preferences.
- No agent fabricates experience, titles, metrics, or credentials.
- Recommended: a de-AI (humanizer) pass on every resume and cover letter.
- No agent submits an application. Ever.
