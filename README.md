# CloudDedup

CloudDedup is a cloud-based data redundancy removal system developed as part of the CodeAlpha Cloud Computing Internship.

The application validates incoming records before storing them, detects duplicate and similar data, supports false-positive review, and stores verified records using Firebase.

## Live Demo

https://clouddedup-e4e48.web.app

## Overview

Duplicate data can increase storage usage, reduce data quality, and make cloud databases harder to manage.

CloudDedup provides a simple validation workflow that checks incoming data before it is stored. Exact duplicates are blocked, similar records can be reviewed manually, and verified records are saved in Cloud Firestore.

Each authenticated user has access to their own records and dashboard.

## Features

- User registration and login with Firebase Authentication
- Validation before storing records
- Exact duplicate detection using normalized content hashes
- Similar-record detection
- Review queue for possible duplicates
- False-positive approval workflow
- Duplicate rejection
- Verified records dashboard
- Duplicate statistics
- User-specific cloud data storage
- Responsive interface for desktop and mobile
- Firebase Hosting deployment

## Tech Stack

- React
- TypeScript
- Vite
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- HTML5
- CSS3

## How It Works

```text
User submits a record
        ↓
Input is normalized
        ↓
Content hash is generated
        ↓
Existing records are checked
        ↓
 ┌─────────────┬──────────────────┬───────────────┐
 │   Unique    │ Possible Match   │ Exact Duplicate
 └─────────────┴──────────────────┴───────────────┘
        ↓               ↓                 ↓
      Store         Review Queue         Block
                        ↓
                  Approve / Reject