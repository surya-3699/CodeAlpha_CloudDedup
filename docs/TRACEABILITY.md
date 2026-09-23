# CodeAlpha Task 1 Traceability

| CodeAlpha requirement | Evidence in this project |
|---|---|
| Identify redundant or false-positive data | `frontend/src/dedup.ts`, exact hash check in `frontend/src/main.tsx`, similarity review queue |
| Validate new data against existing data | `normalize`, `sha256`, `recordSimilarity`, Firestore reads before a verified write |
| Prevent duplicate data from being added | `hashes/{contentHash}` guard plus Firestore transaction and cross-document Security Rules |
| Append only unique and verified entries | Verified records are created only as `UNIQUE` or review-approved `FALSE_POSITIVE` |
| Maintain database accuracy / avoid redundancy | Pending candidates never enter `records`; rejected and exact duplicates are event logs only |
| False-positive classification | Review queue Approve action stores `FALSE_POSITIVE` and marks review `APPROVED` |
| Duplicate classification | Exact attempts log `EXACT_DUPLICATE`; rejected possible duplicates log `CONFIRMED_DUPLICATE` |

## Automated checks

`npm run check` verifies:

- text normalization;
- stable SHA-256 hashing;
- identical-string similarity;
- unrelated-string separation;
- similar-record threshold behavior;
- Authentication requirement in Firestore rules;
- absence of public blanket rules;
- per-user rule isolation;
- schema validation and atomic `getAfter` guards;
- removal of the old `VITE_API_URL` / FastAPI production path;
- TypeScript compilation.

## Manual evidence to capture for final submission

After deployment, capture screenshots/video showing:

1. registration and login;
2. successful unique record storage;
3. the same record with case/whitespace changes being blocked as exact duplicate;
4. a similar record entering the review queue;
5. approving a possible duplicate as a false positive;
6. rejecting a possible duplicate as a confirmed duplicate;
7. dashboard counts updating after duplicate attempts and reviews;
8. verified records containing only `UNIQUE` and `FALSE_POSITIVE` entries;
9. Firestore rules deployed successfully;
10. the final Firebase Hosting URL loading on desktop and mobile.
