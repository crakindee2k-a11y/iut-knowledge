---
title: Team Knowledge
---

# Team Knowledge — অলীকবচন / Bengali LLM Hallucination Detection

**Team:** Make America Great Again · **Competition:** `bengali-hallucination` · **Phase-1 deadline:** 2026-07-19 (BST, UTC+6)

> **What this is.** A shared, verified-fact base for teammates. Every entry here has passed an anti-hallucination check — it carries a **verdict**, a **verbatim evidence quote**, and a **date**. If a claim isn't verified, it does not belong on this page. A citation on a wrong claim is worse than no citation.
>
> **Publish rule.** Verified-only, on demand. Nothing lands here without (1) an evidence quote from a real tool output / source, and (2) your explicit approval. See [Publishing](#publishing) at the bottom.
>
> **⚠️ Privacy.** This site is served via **public GitHub Pages with an obscure URL** — it is *not* access-controlled. Any competing team that learns the URL can read it. Entries tagged **🔒 REDACT** are competitive edge — strip them before pushing anything public.

Legend: ✅ verified (HIGH) · 🟡 verified (MEDIUM) · ⚠️ unresolved / untestable · 🔒 REDACT = competitive edge, do not publish

---

## 1. The metric (most important finding)

### ✅ Public leaderboard = macro-F1  🔒 REDACT
- **Verdict:** verified HIGH.
- **How we know:** we submitted an all-0 prediction (every row = hallucinated) as a probe.
  - Evidence: probe submission returned `"public_score": "0.314"` (Kaggle submission ref 54249362, 2026-07-02).
  - Math: for all-0, macro-F1 = `2·frac0/(1+frac0)/2`. At sample base rate `frac0 = 136/299 = 0.4548`, predicted = **0.3126**. Observed **0.314**. Decisive match.
  - The competing hypothesis (binary-F1 on the hallucinated class) predicts **0.6253** for all-0 — ruled out for the public LB.
- **Why redact:** most teams won't spend a submission to confirm this. It's an edge.

### ⚠️ Private LB / Phase-2 metric is UNRESOLVED
- **Verdict:** unresolved — untestable right now.
- The Evaluation tab says *"Submissions are evaluated on macro-F1 score."*
- Rules §7 says *"Primary metric: binary F1 on the HALLUCINATED class (label = 0) ... over the private leaderboard rows only for Phase 1 final scoring, and over the held-out fold for the Phase 2 organizer run."*
- So the **public** LB is provably macro-F1, but the **private LB and the Phase-2 held-out run (50% of final score)** may use **binary-F1 on label 0**. We cannot test this before the private reveal.
- **How to apply:** track BOTH metrics locally on the 299 samples. Optimize public submissions for macro-F1, but keep a label-0-recall-leaning variant. Of the 2 allowed final submissions, consider hedging one toward each metric.

### Label convention
- ✅ `0 = hallucinated`, `1 = faithful`. Source: data-description page — *"label = 0 — The response contains a hallucination ... label = 1 — The response is faithful/non-hallucinated."*

---

## 2. The data

| Fact | Verdict | Evidence |
|---|---|---|
| `dataset_samples.json` = 299 labeled rows | ✅ | python: `rows 299`; keys `['context','prompt_bn','response_bn','label']` |
| Sample NULL-context = 169/299 (56%) | ✅ | python: `null-ctx rows 169 / 299` |
| Sample label split | ✅ | `CTX(0=47, 1=83)`, `NULL(0=89, 1=80)` → frac0 = 0.4548 |
| `test_set.csv` = 2516 rows, cols `id,context,prompt_bn,response_bn` | ✅ | python: `rows 2516`, `cols [...]` |
| Test NULL-context = 1155/2516 (46%) | ✅ | python: `null-ctx 1155 / 2516` |
| `sample_submission.csv` = all label=1, ids 1..2516 | ✅ | python: `dist {'1': 2516}` |
| **No cached frontier-model outputs in the download** | ✅ | `list_competition_data_files` → only 3 files exist; sample has no cached-output column |
| **No band / cultural-distance labels in the download** | ✅ | same — the C1 tie-breaker subset is latent; cannot directly optimize it |

**Implication:** the 299 samples are a **validation set, not a training set** — too small to fit a supervised model without overfitting. Training data must come from external Bengali corpora + augmentation (allowed by rules §5).

---

## 3. The two subproblems (route on `context == [NULL]`)

- **Intrinsic / context present (~54% of test):** *"is `response_bn` grounded in the given `context`?"* — a factual-consistency / NLI check. Tractable with open-weight encoders.
- **Extrinsic / NULL context (~46% of test):** closed-book Bangladesh world knowledge (idioms, authors, dates, monuments). No passage to check against — needs a Bengali-knowledgeable model. This is the hard band and where the headline phenomenon + heaviest metric weight concentrate (per the Description page).

---

## 4. Leaderboard state (2026-07-02)  🔒 REDACT

| Team | Public score |
|---|---|
| DU_Fanta | 0.814 |
| BUET_NeuralX | 0.790 |
| Huntrix | 0.742 |
| (cluster) | 0.66–0.81 |
| **Make America Great Again (us, N1.csv)** | **0.560** |

Source: `get_competition_leaderboard` + `search_competition_submissions`, 2026-07-02. Redact: reveals our standing + rivals.

---

## 5. Hard rules that constrain the solution

- ✅ **Phase-2 is a code competition, offline.** Rules §4: *"All Phase 2 code runs offline in Kaggle's kernel environment with no internet access. Open-weight models only ... under 9 hours ... on a single P100 or 2×T4 GPU ... under 50 GB of on-disk weights."*
- ✅ **Phase-1 APIs allowed only if reproducible offline.** *"If your Phase 1 submissions rely on paid APIs and cannot be replicated offline, you will not be able to advance to Phase 2."*
- ✅ **4 submissions/day/team; pick up to 2 final.**
- ✅ **Final score weights:** Phase-1 private 20% + Phase-2 held-out 50% + presentation 10% + paper 10% + novelty 10%.
- ✅ **Eligibility:** enrolled Bangladesh undergrad; team of 1–4; individual submissions rejected.
- ✅ **Allowed:** data augmentation, fine-tuning on external Bengali data, fine-tuning on the labeled sample set, submitting your own trained models. **Not allowed:** using test labels in any form.

---

## Publishing

**This doc is verified-only and published on demand.** A finding gets added only when it has a verdict + a verbatim evidence quote + a date. Nothing auto-publishes.

Workflow:
1. A finding is verified (via the `anti-hallucination` check — verdict + evidence quote + date).
2. It's appended here in the same table format.
3. **You review and approve**, stripping any 🔒 REDACT entry if the target is public.
4. You push (see setup below). The site rebuilds from `docs/`.

_Last updated: 2026-07-02._
