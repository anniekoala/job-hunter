<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-d0d7de?style=for-the-badge" alt="English"></a>
  <a href="README.zh.md"><img src="https://img.shields.io/badge/%E4%B8%AD%E6%96%87-2f72c4?style=for-the-badge" alt="中文"></a>
</p>

# Job Application Architect · 求职工作流

一个配置驱动的求职工作区:一套 3-Agent 流程 + 一组 AI agent 技能,带你从「我该投哪些岗位?」一路走到「我准备好面试了」——同时把你所有的个人数据留在本地、永不提交。

整个仓库是通用、可公开的。**所有个人数据只存在两个本地文件里,绝不会被提交:** `my_private_profile.json` 和 `job_search_preferences.json`。

---

## 它能做什么

| 阶段 | Agent | 产出 |
|------|-------|--------|
| **0. 引导(Onboarding)** | 帮你建立 profile(解析现成简历或问答)+ 记录你的求职目标 | `my_private_profile.json`、`job_search_preferences.json` |
| **1. Job Scout(岗位侦察)** | 搜索、验证链接有效、按*你的*目标过滤、打分 | 聊天里给一份排序后的候选清单 |
| **2. Application Builder(材料生成)** | JD 分析 → 差距分析 → 定制简历 → PDF/DOCX → cover letter | `outputs/applications/<role>/` |
| **3. Interview Coach(面试陪练)** | 预测问题 → 模拟面试 → STAR 反馈 | `interview_prep.md` |

它是**手动驱动**的:由你决定投哪些岗位、由你自己提交申请、只有在收到真实面试邀请后才开始面试准备。**任何 agent 都不会替你提交申请。**

---

## 快速上手

### 1. 引导(首次使用)
在你的 AI 编程 agent 里打开这个工作区,然后说:

> “我是新用户——运行 onboarding 帮我建立 profile。”

引导 agent(`workflow/agents/onboarding.md`)会做以下两件事之一:
- **解析一份现成简历**(你粘贴文本或给文件路径),或
- **通过问答**从零帮你建立 profile,

然后问你两个决定搜索方向的问题:**你想找什么样的工作**,以及**你的目标公司是哪些**。它会写入:

- `my_private_profile.json` ← 由 `profile.example.json` 复制而来
- `job_search_preferences.json` ← 由 `job_search_preferences.example.json` 复制而来

两个文件都被 git 忽略,只留在你本机。

你也可以手动创建:

```bash
cp profile.example.json my_private_profile.json
cp job_search_preferences.example.json job_search_preferences.json
# 然后填入你自己的数据
```

### 2. 安装渲染依赖(只需一次)

```bash
cd scripts && npm install   # 安装 Playwright + Chromium
```

(PDF/HTML 渲染使用 Playwright;DOCX 转换使用 macOS 的 `textutil`。)

### 3. 使用工作流
日常命令(`new-application.mjs`、`advance.mjs`)和完整状态机见 `workflow/README.md`。

---

## 目录结构

```text
├── README.md                        # 英文说明
├── README.zh.md                     # 中文说明(本文件)
├── PLAYBOOK.md                      # 可复用的流程 + 排版偏好
├── profile.example.json             # 模板 → 复制成 my_private_profile.json(git 忽略)
├── job_search_preferences.example.json  # 模板 → 复制成 job_search_preferences.json(git 忽略)
├── skills/
│   ├── job-application-architect/   # 5 步引导式定制流程
│   ├── resume-writer/               # 配置驱动的简历规则
│   └── cover-letter-writer/         # 精简 cover letter 规则
├── workflow/
│   ├── README.md                    # 3-Agent 流程 + 状态机
│   ├── workflow.config.json
│   ├── agents/                      # onboarding、job-scout、application-builder、interview-coach
│   ├── scripts/                     # new-application.mjs、advance.mjs(流程状态)
│   └── schemas/
├── scripts/                         # render_resume_pdf / _docx / measure_html(+ package.json)
└── .gitignore                       # 让 profile、preferences、resumes、outputs 留在本地
```

---

## 隐私

`.gitignore` 让以下内容只保留在本地:
- `my_private_profile.json`、`job_search_preferences.json` —— 你的数据和目标
- `resumes/` —— 你真实的简历库
- `outputs/` —— agent 为真实申请生成的一切
- `scratch/` —— 个人笔记和实验

skills 和 workflow 里**不含任何个人信息**——它们都在运行时从那两个被 git 忽略的配置文件读取。fork 它、填进你自己的 profile,它就为你的求职服务,而不是别人的。
