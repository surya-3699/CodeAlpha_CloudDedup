# Final Test Plan

Run these tests on a fresh Firebase test account after deployment.

## 1. Authentication

- Register with a valid email and password.
- Log out.
- Log back in.
- Confirm another account cannot see the first account's records.

## 2. Unique record

Submit:

- Title: `Cloud Computing Internship`
- Description: `Student completed a cloud data validation task.`

Expected:

- message says the unique record was verified and stored;
- verified-record count increases by one;
- status is `UNIQUE`.

## 3. Normalized exact duplicate

Submit the same meaning with only case and whitespace changes:

- Title: `  CLOUD   COMPUTING internship `
- Description: ` student completed a CLOUD data validation task. `

Expected:

- `Exact duplicate blocked.`;
- verified-record count does not increase;
- blocked-duplicate count increases.

## 4. Possible duplicate

Create a record whose title/description is very similar but not identical to an existing record.

Expected:

- similarity is at least 82%;
- record goes to Review queue;
- it does not appear in Verified records;
- submitting the exact same pending candidate again reports that it is already waiting for review.

## 5. False positive approval

Select **Approve** on a pending candidate.

Expected:

- it leaves the review queue;
- it appears in Verified records as `FALSE_POSITIVE`;
- submitting that exact approved content again is blocked.

## 6. Confirmed duplicate rejection

Create another similar candidate and select **Reject**.

Expected:

- it leaves the review queue;
- it never enters Verified records;
- blocked-duplicate count increases.

## 7. Responsive/accessibility smoke test

- Test around 360 px phone width and desktop width.
- Confirm no horizontal scrolling from application content.
- Navigate login and record submission using only Tab/Shift+Tab/Enter.
- Confirm email field uses email input behavior and password managers receive appropriate autocomplete hints.
- Confirm status messages are announced by assistive technology (`role=status`, `aria-live=polite`).
