# Firebase Deployment Checklist

## Firebase Console prerequisites

1. Select/create the intended Firebase project.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Create the Cloud Firestore database.
4. Enable Firebase Hosting.
5. Confirm `frontend/.firebaserc` points at the intended project before deploying.

## Clean build

From `frontend/`:

```bash
npm ci
npm run check
npm run build
```

Do not copy a previous machine's `node_modules` or stale `dist` directory into the repository.

## Optional local Firebase testing

With the Firebase CLI installed:

```bash
firebase emulators:start
```

The included emulator config uses Firestore port `8085` and Hosting port `5000`.

## Deploy

```bash
firebase login
firebase deploy --only hosting,firestore:rules,firestore:indexes
```

## Post-deploy verification

- Open the deployed Hosting URL.
- Complete every scenario in `TEST_PLAN.md`.
- Test on phone and desktop.
- Check the browser console for errors.
- Check Firestore to confirm duplicate attempts did not create verified records.
- Record screenshots and the final explanation video only after these checks pass.
