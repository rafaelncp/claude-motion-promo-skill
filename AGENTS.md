# Codex guidance for this fork

This fork preserves the upstream Three.js / Playwright / FFmpeg engines. Do not replace them with Remotion unless the user explicitly requests it.

## Video workflow
- For animation tasks, read `.agents/skills/motion-promo/SKILL.md`, then `motion-promo/SKILL.md`.
- Prefer a working, deterministic local render to one-shot generated footage.
- Put generated media outside the repository; never commit rendered MP4s, node_modules, credentials, or customer data.
- Before claiming a video is finished: run dependency diagnostics, inspect preview stills, render, review final frames, inspect duration, dimensions, codecs and sound.
- Never assert that a render or voiceover exists without an actual output file and verification.
- Do not publish to Instagram, spend money, update secrets, or deploy without explicit approval.

## Financial explainers
- Treat claims and numbers as facts to validate, not decorative text.
- Receita líquida is after sales returns, discounts, and sales-tax deductions. Do not subtract those a second time.
- COGS / CPV is not the same as every commercial or administrative expense. Keep operating expenses and depreciation/amortization classification explicit.
- EBITDA here is an illustrative managerial bridge using operating expenses excluding D&A. It is not a universal standardized Brazilian DRE subtotal.
- Keep fictional numbers labeled as illustrative. No actual ConectaMF logo/colors were supplied.
- Keep user project context and progress recorded in Notion only via an authorized Notion action; local code does not synchronize Notion automatically.
