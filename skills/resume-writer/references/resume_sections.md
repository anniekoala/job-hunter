# Standard resume sections (recommended structure)

All concrete values below come from `my_private_profile.json`. This file only defines the *shape*.

## Header
- Name
- Email · Phone · LinkedIn  (load from `personal_info`)
- Credentials suffix (load from `personal_info.credentials_suffix`, if present)

## Professional Summary (bullets)
- 4–6 bullets max, targeted to the role.
- Bold only the short hook phrase at the start of each bullet.

## Professional Experience
- Reverse chronological. Keep the strongest, most role-relevant bullets near the top.
- One entry per `work_history` item: `### {company} — {location}` then the title and period.
- Each bullet starts with a bold action hook, then the concrete outcome.

## Skills & Certifications
- If `skills_customization.priority_skills` is set, list that family first.
- Group the rest (domain, tools, languages) from `skills`.
- Apply `restricted_keywords` (remove + substitutions).

## Education
- Load from `education`. Bold the degree name (text before the first comma).
- No blank lines between degrees; use trailing double-spaces to keep them on separate lines.
