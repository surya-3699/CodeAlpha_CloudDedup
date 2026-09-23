# Architecture

## Production architecture

```text
Browser
  |
  v
React + TypeScript + Vite
  |
  +--> Firebase Authentication (email/password)
  |
  +--> Cloud Firestore
          |
          +-- users/{uid}/records
          +-- users/{uid}/hashes
          +-- users/{uid}/reviewQueue
          +-- users/{uid}/pendingHashes
          +-- users/{uid}/duplicateEvents

Firebase Hosting serves the compiled `dist/` application over HTTPS.
```

## Exact duplicate flow

1. Trim, lowercase, and collapse repeated whitespace.
2. Hash `normalizedTitle + "|" + normalizedDescription` with SHA-256.
3. Read `users/{uid}/hashes/{contentHash}`.
4. If it exists, block the record and create an `EXACT_DUPLICATE` event.
5. If it does not exist and no similar record requires review, an atomic transaction creates:
   - `hashes/{contentHash}`; and
   - the verified record.
6. Firestore Security Rules cross-check the two writes with `getAfter(...)`.

The hash document ID acts as the unique exact-content key for the authenticated user's data set.

## Possible duplicate flow

1. If there is no exact hash match, compare the normalized title and description against verified records.
2. Average their bigram Dice similarity scores.
3. A score `>= 0.82` becomes `PENDING` rather than immediately entering verified records.
4. The transaction also creates `pendingHashes/{contentHash}` so the exact same candidate cannot be queued repeatedly while it is awaiting review.
5. **Approve** classifies the candidate as a `FALSE_POSITIVE`, stores it as verified, creates its exact hash guard, updates the review item, and releases the pending hash in one transaction.
6. **Reject** confirms the duplicate, updates the review item, releases the pending hash, and writes a `CONFIRMED_DUPLICATE` event in one transaction.

## Security boundaries

Firestore rules:

- require an authenticated user;
- prevent one user from reading or writing another user's data;
- reject unknown nested collections;
- validate allowed document keys and important field types;
- prevent verified records from being updated or deleted by the client;
- require verified record and hash writes to be atomic companions;
- require review and pending-hash writes to be atomic companions;
- only allow a pending hash to be deleted when its review is being approved or rejected.

## Scalability notes

Exact hash detection is a direct document lookup. Similarity detection currently scans the authenticated user's verified records in the browser, which is appropriate for an internship demonstration and modest data sets. For large production data sets, the similarity stage should move to trusted server-side compute with indexed candidate generation or a vector/search service so the client does not scan an unbounded collection.
