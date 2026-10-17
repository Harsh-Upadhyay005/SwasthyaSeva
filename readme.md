<div align="center">

# 🏥 SwasthyaSeva — Digital Healthcare Management System

![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenRouter AI](https://img.shields.io/badge/AI-OpenRouter-7400FF?style=for-the-badge&logo=openai&logoColor=white)

**SwasthyaSeva** (स्वास्थ्य सेवा — _Health Service_) is an end-to-end, production-grade digital healthcare mobile platform that unifies medical record management, AI-powered health triage, medication adherence tracking, doctor–patient communication, and emergency QR profile sharing — all in one cross-platform app.

Built with **React Native 0.81 (Expo SDK 54 + Expo Router)** on the frontend and a robust **Node.js / Express 5 + MongoDB Atlas** RESTful backend, it supports both **Patient** and **Doctor** roles with dedicated dashboards, role-based access control, and multi-language support.

[Overview](#-overview) · [Key Features](#-key-features) · [Architecture](#-architecture) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Database Models](#-database-models) · [API Reference](#-api-reference) · [Screens & UI](#-screens--ui) · [Background Schedulers](#-background-schedulers--cron-jobs) · [Setup & Installation](#%EF%B8%8F-setup--installation) · [Environment Variables](#-environment-variables) · [Troubleshooting](#-troubleshooting) · [Security Roadmap](#%EF%B8%8F-known-issues--security-roadmap) · [License](#-license)

</div>

---

## 📋 Overview

Managing health records, tracking medication routines, and maintaining doctor–patient communication across fragmented systems is error-prone and inaccessible — especially in underserved communities. **SwasthyaSeva** solves this by providing a unified, mobile-first healthcare ecosystem.

### What Makes SwasthyaSeva Different?

- **Dual-Role System**: Separate, tailored experiences for **Patients** and **Doctors** — each with their own dashboard, navigation, and capabilities.
- **AI-Powered Health Intelligence**: Symptom triage, medicine side-effect analysis, medical report explanation, and **voice-based AI queries** — powered by OpenRouter API with graceful mock fallbacks.
- **Automated OCR Pipeline**: Upload a scanned report (image or PDF) → Cloudinary stores the file → Tesseract.js extracts text → AI explains the report in simple language.
- **Medication Adherence Engine**: Full lifecycle management — add medicines with time slots, log/mark doses as taken/missed, track streaks with gamified milestones (Week Warrior → Year Long Achiever), and receive automated reminders via background cron jobs.
- **Emergency QR Profiles**: Generate a public-access emergency QR code that renders a full HTML emergency medical profile (blood type, allergies, current medications, records, reports) — accessible by anyone scanning the QR, without login.
- **Doctor–Patient Messaging**: Real-time chat between assigned doctors and patients with conversation management, unread counts, and read receipts.
- **Multi-Language Support**: Full UI translation in **5 languages** — English, Hindi (हिंदी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), and Bhojpuri (भोजपुरी).
- **Dark Mode**: System-wide light/dark theme toggle.
- **Multi-Platform API Connectivity**: Dynamic URL configuration supporting Web, Android Emulator, physical LAN devices, and production deployments.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure registration and login with hashed passwords (`bcryptjs`) and JSON Web Tokens.
- **Role-Based Access Control (RBAC)**: Middleware-enforced separation — patient routes are locked to patients, doctor routes to doctors.
- **Persistent Sessions**: Token and user data stored via `@react-native-async-storage/async-storage` for seamless session persistence.
- **Input Validation**: All endpoints validated with `express-validator` — registration fields, medicine data, dose logs, QR tokens, etc.
- **Rate Limiting**: Report uploads and emergency QR access are rate-limited via `express-rate-limit` to prevent abuse.
- **CORS Configuration**: Configurable origin, methods, headers, and credentials.

### 🤖 AI Health Triage & Smart Assistance
- **Symptom Triage** (`POST /api/v1/ai/triage`): Describe symptoms in text → receive AI-generated preliminary triage advice with urgency levels and a medical disclaimer.
- **Medicine Side-Effects** (`POST /api/v1/ai/medicine`): Enter a medicine name → receive AI-generated bullet-point information on uses, side effects, and precautions.
- **Medical Report Explanation** (`POST /api/v1/patient/reports/:id/analyze`): After OCR extraction, the report text is sent to AI for a plain-language explanation highlighting items that need attention.
- **Voice-Based AI Queries** (`POST /api/v1/ai/voice-query`): Speak symptoms or medicine names → speech-to-text transcription → routed to triage or medicine analysis mode. Uses `@react-native-voice/voice` on the frontend.
- **Graceful Degradation**: If `OPENROUTER_API_KEY` is missing or invalid, the backend returns safe mock responses — the app never crashes.

### 📄 Medical Records & OCR
- **Medical Records Management**: Doctors can create structured medical records for patients (date, diagnosis, notes, medicines). Patients can view their own records.
- **Report Upload & Storage**: Patients upload medical reports (PDF, JPG, PNG, WEBP up to 10MB) via `expo-document-picker` or `expo-image-picker`. Files are stored on **Cloudinary** via **Multer** middleware.
- **Tesseract.js OCR Engine**: Uploaded images are automatically processed through Tesseract.js with the bundled `eng.traineddata` language model to extract raw text.
- **PDF Text Extraction**: PDF files are parsed via `pdf-parse` for text extraction.
- **Report Analysis**: Extracted text can be sent to AI for plain-language explanation.

### 💊 Medicine Tracking & Adherence
- **Medicine CRUD**: Add medicines with name, dosage, frequency, time slots, start/end dates, remaining count, and notes. Update or delete medicines.
- **Dose Logging**: Log individual doses as taken or missed for specific time slots. Interactive dose marking from the app UI.
- **Due Doses**: Fetch upcoming doses that need to be taken now.
- **Adherence Analytics**:
  - **Weekly Adherence Trend**: Day-by-day adherence percentage for the current week.
  - **Monthly Adherence**: Calendar-view adherence data for any month.
  - **Overall Adherence Summary**: Aggregated statistics over a configurable date range.
- **Streak System & Gamification**:
  - Consecutive perfect-adherence days are tracked as **streaks**.
  - **7 milestone tiers**: Week Warrior (7 days) → Two Week Champion (14) → Monthly Master (30) → Consistency King (60) → Streak Legend (90) → Half Year Hero (180) → Year Long Achiever (365).
  - Monthly streak history for long-term visualization.
  - Next-milestone progress tracking with days remaining.
- **Caregiver Alerts**: If a patient misses 3+ consecutive doses, the assigned doctor automatically receives an in-app notification.

### 🩺 Symptom Tracking & Timeline
- **Daily Symptom Logging**: Record symptoms with severity levels (mild/moderate/severe), descriptions, and timestamps.
- **Symptom History**: Fetch paginated symptom history with timeline visualization.
- **Health Timeline**: Chronological view of all medical events — symptoms, records, reports — on a single timeline.

### 👨‍⚕️ Doctor Portal
- **Doctor Dashboard**: Overview stats — assigned patient count, recent activity, pending tasks.
- **Patient Management**: View assigned patients (searchable by name/email/mobile), assign new patients via QR scan, unassign patients.
- **Medical Record Creation**: Doctors create structured visit records for patients.
- **Patient Report Access**: View all uploaded reports for any assigned patient.
- **Patient Detail View**: Deep-dive into a specific patient's profile, records, reports, and medications.

### 📱 QR Code System
- **Patient Profile QR**: JWT-signed QR token embedding patient identity — scannable by assigned doctors to quickly pull up patient data. Expires in 7 days.
- **Emergency QR**: Public-access QR code (30-day expiry) that renders a full **HTML emergency medical profile** — blood type, allergies, emergency contacts, current medications, medical records, and report links. No login required to view.
- **QR Scan Audit Logs**: Every scan is logged with scanner type (doctor/public), context, IP address, and user agent. Both doctors and patients can view their audit history.

### 💬 Doctor–Patient Messaging
- **Conversation Management**: Auto-created conversations between assigned doctor–patient pairs.
- **Send Messages**: Only allowed between assigned doctor↔patient pairs (enforced server-side).
- **Message History**: Paginated message retrieval with sender/receiver details.
- **Read Receipts**: Mark conversations as read; unread counts tracked per conversation.

### 🔔 Notifications
- **In-App Notification System**: Dose reminders, missed dose alerts, low supply warnings, caregiver alerts, daily summaries — all delivered as in-app notifications.
- **Badge Counts**: Real-time unread notification counts on navigation badges.
- **Push Notifications**: Expo Notifications integration for native push notifications on iOS/Android.
- **Notification Toast**: In-app toast component for real-time alert display.

### 🌐 Internationalization (i18n)
- **5 Languages Supported**: English, Hindi, Tamil, Kannada, Bhojpuri.
- **Full UI Coverage**: Every screen label, button, placeholder, error message, and notification is translated.
- **Persistent Preference**: Selected language is stored in AsyncStorage and restored on app launch.

### 🎨 Theme System
- **Light & Dark Mode**: Full dark mode with a separate `DarkColors` palette.
- **System-Wide Toggle**: Theme preference managed via React Context.

---

## 🏗 Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    SwasthyaSeva Mobile App                     │
│             React Native 0.81 + Expo SDK 54                   │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │   Screens   │  │  Components  │  │      Contexts        │ │
│  │ (14 screens)│  │  (15 shared) │  │ Theme · Language ·   │ │
│  │             │  │              │  │ Notification · Badge │ │
│  └──────┬──────┘  └──────┬───────┘  └──────────┬───────────┘ │
│         │                │                      │             │
│         └────────────────┼──────────────────────┘             │
│                          │                                    │
│                ┌─────────▼─────────┐                         │
│                │  services/api.ts  │  ← 42KB API client      │
│                │  services/config  │  ← Dynamic URL config   │
│                └─────────┬─────────┘                         │
└──────────────────────────┼────────────────────────────────────┘
                           │
                    REST API (JWT Auth)
                    JSON over HTTPS
                           │
┌──────────────────────────▼────────────────────────────────────┐
│                   Express.js 5.x Backend                      │
│                    Node.js 20.x Runtime                       │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │  Routes  │  │  Controllers │  │      Middleware          │ │
│  │ (9 route │  │ (11 handlers)│  │ JWT · RBAC · Validation │ │
│  │  files)  │  │              │  │ Rate Limit · Multer     │ │
│  └────┬─────┘  └──────┬───────┘  └─────────────────────────┘ │
│       │               │                                       │
│  ┌────▼───────────────▼──────────────────┐                   │
│  │            Services Layer             │                   │
│  │  OCR · Email · Streak Calculation     │                   │
│  └───────────────────┬───────────────────┘                   │
│                      │                                        │
│  ┌───────────────────▼───────────────────┐                   │
│  │         Schedulers (node-cron)        │                   │
│  │  Dose Reminders · Missed Dose Check  │                   │
│  │  Low Supply Alerts · Daily Summary   │                   │
│  └───────────────────────────────────────┘                   │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              External Integrations                      │ │
│  │  MongoDB Atlas · Cloudinary · OpenRouter AI ·           │ │
│  │  Tesseract.js · Nodemailer (SMTP)                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Mobile Frontend (`/frontend`)

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Framework** | React Native 0.81 + Expo SDK 54 | Cross-platform mobile (iOS, Android, Web) |
| **Navigation** | Expo Router 6.0 | File-based routing with typed routes |
| **Language** | TypeScript 5.3 | Static type safety |
| **State Management** | React Context API | Theme, Language, Notification, Badge contexts |
| **Persistent Storage** | `@react-native-async-storage/async-storage` | JWT tokens, user data, language preference |
| **QR Code Generation** | `react-native-qrcode-svg` | SVG-based QR rendering |
| **Calendar** | `react-native-calendars` | Monthly adherence calendar view |
| **Voice Input** | `@react-native-voice/voice` | Speech-to-text for AI voice queries |
| **Animations** | `react-native-reanimated` 3.16 | Smooth micro-animations and transitions |
| **Image/Document Picker** | `expo-image-picker`, `expo-document-picker` | Report upload from camera/gallery/files |
| **Push Notifications** | `expo-notifications` | Native push notification support |
| **Clipboard** | `expo-clipboard` | Copy QR tokens, share data |
| **SVG Rendering** | `react-native-svg` | Custom icons, charts, streak visualization |
| **Web Support** | `react-native-web` | Web platform rendering |

### Backend Server (`/backend`)

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Runtime** | Node.js 20.x | JavaScript server runtime |
| **Framework** | Express.js 5.x | HTTP server and routing |
| **Database** | MongoDB Atlas + Mongoose 9.x | Cloud-hosted NoSQL with schema-level ODM |
| **Authentication** | `jsonwebtoken` + `bcryptjs` | JWT generation/verification, password hashing |
| **File Upload** | `multer` 2.1 | Multipart form-data parsing (10MB limit, PDF/JPG/PNG/WEBP) |
| **Cloud Storage** | `cloudinary` 2.9 | Secure file hosting and CDN delivery |
| **AI Integration** | OpenRouter API via `axios` | LLM-powered triage, medicine analysis, report explanation |
| **OCR Engine** | `tesseract.js` 7.0 | Image-to-text extraction with bundled English data |
| **PDF Parsing** | `pdf-parse` 2.4 | Raw text extraction from PDF documents |
| **Scheduling** | `node-cron` 4.2 | Background cron jobs for automated tasks |
| **Email** | `nodemailer` 8.0 | SMTP-based email notifications |
| **Validation** | `express-validator` 7.3 | Request body/params/query validation |
| **Rate Limiting** | `express-rate-limit` 8.3 | Endpoint-level request throttling |
| **Security** | CORS 2.8, configurable origins | Cross-origin request management |
| **Templating** | EJS 5.0 | Server-side HTML rendering (emergency QR profile page) |
| **Testing** | Jest 29 + Supertest 7 + `mongodb-memory-server` | Unit and integration testing with in-memory DB |
| **Dev Tooling** | Nodemon 3.1 | Hot-reload during development |

---

## 📂 Project Structure

```
SwasthyaSeva/
│
├── backend/                                  # Express REST API Server
│   ├── src/
│   │   ├── config/
│   │   │   ├── ai.js                         # OpenRouter API client — callAI(), triage, medicine, report explanation
│   │   │   ├── cloudinary.js                 # Cloudinary SDK configuration
│   │   │   ├── db.js                         # Mongoose connection handler
│   │   │   └── validateEnv.js                # Startup env variable validation (fails fast if missing)
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js             # Register, login, get profile (/me), update profile, logout
│   │   │   ├── dashboardController.js        # Patient & Doctor dashboard aggregations
│   │   │   ├── doctorPatientController.js    # Assign/unassign patients, list assigned patients
│   │   │   ├── medicineController.js         # Medicine CRUD, dose logging, adherence stats, streaks
│   │   │   ├── messageController.js          # Conversations, send/read messages, unread counts
│   │   │   ├── notificationController.js     # List, mark read, delete notifications
│   │   │   ├── qrController.js              # Profile QR, emergency QR, scan, audit logs
│   │   │   ├── recordController.js           # Medical records CRUD (doctor creates, patient reads)
│   │   │   ├── reportController.js           # Report upload/delete, OCR extraction, AI analysis
│   │   │   ├── smsController.js              # SMS notification integration (placeholder)
│   │   │   └── symptomController.js          # Symptom logging and history retrieval
│   │   │
│   │   ├── middleware/
│   │   │   ├── verifyToken.js                # JWT authentication middleware
│   │   │   ├── requireRole.js                # Role-based access control (patient/doctor)
│   │   │   ├── authValidation.js             # Registration & login field validation rules
│   │   │   ├── requestValidation.js          # Validation for medicines, doses, QR, records, messages
│   │   │   ├── rateLimiters.js               # Rate limiters for uploads and emergency QR access
│   │   │   └── uploadReport.js               # Multer config — 10MB limit, PDF/JPG/PNG/WEBP filter
│   │   │
│   │   ├── models/
│   │   │   ├── User.js                       # Unified user schema (patient + doctor fields)
│   │   │   ├── Medicine.js                   # Medicine inventory — name, dosage, frequency, timeSlots
│   │   │   ├── MedRecord.js                  # Medical records — date, diagnosis, notes, medicines
│   │   │   ├── Report.js                     # Uploaded reports — fileUrl, mimeType, ocrText, reportType
│   │   │   ├── DoseLog.js                    # Dose logs — medicineId, status, scheduledTime
│   │   │   ├── SymptomLog.js                 # Symptom entries — symptom, severity, description
│   │   │   ├── Notification.js               # Notifications — type, title, message, metadata, read status
│   │   │   ├── Conversation.js               # Chat conversations — doctorId, patientId, lastMessage
│   │   │   ├── Message.js                    # Chat messages — senderId, receiverId, body, read status
│   │   │   └── QrScanLog.js                  # QR scan audit — scannerType, context, IP, user agent
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js                       # /api/v1/auth/*
│   │   │   ├── doctor.js                     # /api/v1/doctor/* (role: doctor)
│   │   │   ├── patient.js                    # /api/v1/patient/* (role: patient)
│   │   │   ├── medicine.js                   # /api/v1/medicine/* (role: patient)
│   │   │   ├── symptom.js                    # /api/v1/symptom/*
│   │   │   ├── notification.js               # /api/v1/notifications/*
│   │   │   ├── qr.js                         # /api/v1/qr/*
│   │   │   ├── message.js                    # /api/v1/messages/*
│   │   │   └── ai.js                         # /api/v1/ai/*
│   │   │
│   │   ├── schedulers/
│   │   │   ├── doseReminderScheduler.js      # Cron: upcoming dose reminders
│   │   │   ├── missedDoseScheduler.js        # Cron: detect unlogged doses → mark missed
│   │   │   ├── lowSupplyScheduler.js         # Cron: warn when medicine count is low
│   │   │   └── dailySummaryScheduler.js      # Cron: aggregate daily adherence summaries
│   │   │
│   │   ├── services/
│   │   │   ├── emailService.js               # Nodemailer SMTP email sending
│   │   │   ├── ocrService.js                 # Tesseract.js text extraction wrapper
│   │   │   └── streakService.js              # Adherence streak calculation, milestones, caregiver alerts
│   │   │
│   │   └── server.js                         # Express app entry — middleware, routes, error handling, startup
│   │
│   ├── eng.traineddata                       # Tesseract OCR English language dataset (~5MB)
│   ├── tests/                                # Jest + Supertest test suites
│   ├── postman/                              # Postman API collection for testing
│   └── package.json
│
├── frontend/                                 # React Native Expo Mobile App
│   ├── app/
│   │   ├── _layout.tsx                       # Root layout — providers (Theme, Language, Notification, Badge)
│   │   ├── index.tsx                         # Entry redirect handler
│   │   └── screens/
│   │       ├── SplashScreen.tsx              # Animated splash with auto-redirect
│   │       ├── LoginScreen.tsx               # Login form with role selection
│   │       ├── Register.tsx                  # Multi-step registration (patient/doctor fields)
│   │       ├── PatientDashboard.tsx          # Patient home — stats, quick actions, upcoming doses
│   │       ├── DoctorDashboard.tsx           # Doctor home — patient count, alerts, recent activity
│   │       ├── Medicines.tsx                 # Medicine list, add/edit/delete, dose calendar, adherence
│   │       ├── Records.tsx                   # Medical records vault
│   │       ├── Reports.tsx                   # Upload & view reports, OCR text, AI analysis
│   │       ├── Symptoms.tsx                  # Symptom logger with severity selection
│   │       ├── Timeline.tsx                  # Chronological health event timeline
│   │       ├── AIAnalyzer.tsx                # AI triage & medicine analyzer with voice input
│   │       ├── QRCode.tsx                    # QR generation — profile & emergency modes
│   │       ├── QRProfile.tsx                 # QR scan result — patient profile display
│   │       ├── Profile.tsx                   # User profile settings, caregiver info, theme, language
│   │       ├── Notifications.tsx             # Notification list with unread filtering
│   │       ├── Alerts.tsx                    # Urgent alerts view
│   │       ├── Messages.tsx                  # Doctor–patient chat interface
│   │       ├── Patients.tsx                  # Doctor's patient list (search, assign)
│   │       ├── PatientDetails.tsx            # Doctor's deep-dive into a patient's data
│   │       └── mockData.ts                   # Demo/mock data for offline testing
│   │
│   ├── components/
│   │   ├── AppLayout.tsx                     # Responsive layout wrapper
│   │   ├── BottomNav.tsx                     # Bottom navigation bar
│   │   ├── BottomNavLayout.tsx               # Layout with integrated bottom nav
│   │   ├── DrawerLayout.tsx                  # Side drawer navigation
│   │   ├── Navbar.tsx                        # Top navigation bar
│   │   ├── Sidebar.tsx                       # Sidebar menu
│   │   ├── ScreenHeader.tsx                  # Reusable screen header
│   │   ├── UI.tsx                            # Shared UI primitives (23KB — buttons, cards, modals, inputs)
│   │   ├── MedicineCalendar.tsx              # Calendar with adherence dot markers
│   │   ├── JumpToTodayButton.tsx             # Quick navigation to today in calendar
│   │   ├── WeeklyAdherenceSummary.tsx        # Week-at-a-glance adherence bars
│   │   ├── StreakCounter.tsx                 # Animated streak counter with milestone display
│   │   ├── StreakChainLayer.tsx              # Visual chain link animation for streaks
│   │   ├── Stepper.tsx                       # Multi-step form stepper (registration)
│   │   └── NotificationToast.tsx             # Toast notification overlay
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx                   # Light/Dark theme + user role/state management
│   │   ├── LanguageContext.tsx                # i18n — 5 languages, 120KB+ translation dictionary
│   │   ├── NotificationContext.tsx            # Push notification registration & handling
│   │   └── BadgeContext.tsx                   # Unread notification/message badge counts
│   │
│   ├── services/
│   │   ├── config.ts                         # Dynamic API URL — Web/Emulator/LAN/Production
│   │   └── api.ts                            # 42KB HTTP client — every API endpoint wrapped
│   │
│   ├── constants/                            # Color palettes (Light + Dark), spacing, fonts
│   ├── hooks/                                # Custom React hooks
│   ├── utils/                                # Utility functions
│   ├── data/                                 # Static data files
│   ├── assets/                               # Icons, splash, fonts
│   ├── scripts/                              # Build/dev helper scripts
│   ├── app.json                              # Expo manifest — permissions, plugins, splash config
│   ├── metro.config.js                       # Metro bundler config
│   ├── tsconfig.json                         # TypeScript compiler config
│   └── package.json
│
├── package.json                              # Root workspace config
├── tsconfig.json                             # Root TypeScript config
└── readme.md                                 # ← You are here
```

---

## 🗄 Database Models

### `User` — Unified User Schema
Supports both **patient** and **doctor** roles in a single collection with role-specific fields.

| Field | Type | Description |
|:---|:---|:---|
| `name`, `firstName`, `lastName` | String | Full and split name |
| `email` | String (unique) | Login email |
| `username` | String (unique, sparse) | Optional username |
| `mobile` | String (unique, sparse) | Phone number |
| `passwordHash` | String | bcrypt-hashed password |
| `role` | Enum: `patient` / `doctor` | User role |
| `phone`, `address` | String | Contact info |
| **Patient Fields** | | |
| `bloodType` | String | Blood group (e.g., O+, A-) |
| `allergies` | [String] | Known allergies |
| `emergencyContact` | { name, phone } | Emergency contact info |
| `caregiver` | { name, email, phone } | Caregiver details |
| `assignedDoctorId` | ObjectId → User | Linked doctor |
| `height`, `weight` | Number | Physical measurements |
| `conditions` | [String] | Known medical conditions |
| **Doctor Fields** | | |
| `specialization` | String | Medical specialty |
| `hospitalAffiliation` | String | Hospital name |
| `hospitalId` | String (unique, sparse) | Hospital ID code |

### Other Models

| Model | Key Fields | Purpose |
|:---|:---|:---|
| **Medicine** | name, dosage, frequency, timeSlots, startDate, endDate, remainingCount, isActive, patientId | Medicine inventory |
| **DoseLog** | medicineId, patientId, status (taken/missed/pending), scheduledTime, consecutiveMissCount | Dose tracking |
| **MedRecord** | patientId, doctorId, date, diagnosis, notes, medicines | Visit records |
| **Report** | patientId, reportType, fileUrl, originalName, mimeType, ocrText | Uploaded documents |
| **SymptomLog** | patientId, symptom, severity (mild/moderate/severe), description | Symptom entries |
| **Notification** | userId, type, title, message, metadata, isRead | System notifications |
| **Conversation** | doctorId, patientId, lastMessage, lastMessageAt | Chat threads |
| **Message** | conversationId, senderId, receiverId, body, isRead, readAt | Chat messages |
| **QrScanLog** | patientId, doctorId, scannerType, context, ipAddress, userAgent | QR audit trail |

---

## 🔌 API Reference

All endpoints are prefixed with `/api/v1`. Authentication is via `Authorization: Bearer <JWT>` header.

### 🔑 Authentication (`/api/v1/auth`)

| Method | Endpoint | Auth | Description |
|:---|:---|:---|:---|
| `POST` | `/register` | ❌ | Register a new patient or doctor account |
| `POST` | `/login` | ❌ | Login and receive JWT token + user data |
| `GET` | `/me` | ✅ | Get current user profile |
| `PUT` | `/profile` | ✅ | Update profile fields |
| `POST` | `/logout` | ✅ | Invalidate session |

### 🏥 Patient Routes (`/api/v1/patient`) — Role: Patient

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/dashboard` | Dashboard stats — upcoming doses, records count, adherence |
| `GET` | `/medicines` | List patient's medicines |
| `GET` | `/records` | List patient's medical records |
| `GET` | `/records/:id` | Get specific medical record |
| `GET` | `/reports` | List patient's uploaded reports |
| `POST` | `/reports` | Upload a new report (multipart, rate-limited) |
| `POST` | `/reports/:id/analyze` | Run AI analysis on report's OCR text |
| `DELETE` | `/reports/:id` | Delete a report |

### 👨‍⚕️ Doctor Routes (`/api/v1/doctor`) — Role: Doctor

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/dashboard` | Doctor dashboard stats |
| `GET` | `/patients` | List assigned patients (searchable: `?q=`) |
| `POST` | `/patients/:patientId/assign` | Assign patient to this doctor |
| `POST` | `/patients/:patientId/unassign` | Unassign patient |
| `POST` | `/records` | Create medical record for a patient |
| `GET` | `/records/:id` | Get specific record |
| `GET` | `/patients/:patientId/records` | List all records for a patient |
| `GET` | `/patients/:patientId/reports` | List all reports for a patient |

### 💊 Medicine & Doses (`/api/v1/medicine`) — Role: Patient

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/` | Add a new medicine schedule |
| `GET` | `/` | List all medicines |
| `PATCH` | `/:id` | Update a medicine |
| `DELETE` | `/:id` | Delete a medicine |
| `GET` | `/due` | Get doses due now |
| `POST` | `/mark` | Mark a dose as taken/missed |
| `POST` | `/:id/log` | Log a dose for a specific medicine |
| `GET` | `/adherence` | Overall adherence summary |
| `GET` | `/adherence/weekly` | Weekly adherence trend |
| `GET` | `/adherence/monthly` | Monthly adherence calendar data |
| `GET` | `/streak-data` | Current streak, milestones, next milestone |
| `GET` | `/streak-history` | Monthly streak history |

### 🩺 Symptoms (`/api/v1/symptom`)

| Method | Endpoint | Auth | Description |
|:---|:---|:---|:---|
| `POST` | `/log` | ✅ | Log a symptom with severity |
| `GET` | `/history` | ✅ | Fetch symptom history |

### 🤖 AI Assistant (`/api/v1/ai`)

| Method | Endpoint | Auth | Description |
|:---|:---|:---|:---|
| `POST` | `/triage` | ✅ | AI symptom triage with urgency level |
| `POST` | `/medicine` | ✅ | AI medicine side-effects analysis |
| `POST` | `/voice-query` | ✅ | Voice-to-AI — mode: `medicine` or `triage` |

### 📱 QR Code (`/api/v1/qr`)

| Method | Endpoint | Auth | Role | Description |
|:---|:---|:---|:---|:---|
| `GET` | `/my-profile` | ✅ | Patient | Get JWT-signed QR payload |
| `GET` | `/my-emergency-profile` | ✅ | Patient | Generate public emergency QR URL |
| `POST` | `/scan` | ✅ | Doctor | Scan patient QR token → get patient data |
| `GET` | `/emergency/:qrToken` | ❌ | Public | View emergency profile (HTML or JSON) |
| `GET` | `/audit` | ✅ | Both | QR scan audit logs |

### 💬 Messages (`/api/v1/messages`) — Role: Doctor or Patient

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/conversations` | List all conversations with unread counts |
| `GET` | `/conversations/:id/messages` | Paginated message history |
| `POST` | `/send` | Send a message to assigned doctor/patient |
| `PATCH` | `/conversations/:id/read` | Mark conversation as read |

### 🔔 Notifications (`/api/v1/notifications`)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | List notifications |
| `PATCH` | `/:id/read` | Mark single notification as read |
| `PATCH` | `/read-all` | Mark all as read |
| `DELETE` | `/:id` | Delete a notification |

### 🔧 System & Health

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | Server status message |
| `GET` | `/health` | Basic health check (timestamp) |
| `GET` | `/health/ready` | Readiness check (database connection state) |
| `GET` | `/api/v1/debug` | Connectivity test from mobile app |

### ⏰ Cron Endpoints (Manual Trigger)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET/POST` | `/api/v1/cron/*` | Missed dose scheduler |
| `GET/POST` | `/api/v1/cron/daily-summary/*` | Daily summary generator |
| `GET/POST` | `/api/v1/cron/dose-reminders/*` | Dose reminder sender |
| `GET/POST` | `/api/v1/cron/low-supply/*` | Low supply alert checker |

---

## 📱 Screens & UI

### Patient Screens
| Screen | File | Description |
|:---|:---|:---|
| Splash | `SplashScreen.tsx` | Animated loading → auto-redirect based on auth state |
| Login | `LoginScreen.tsx` | Email/password login with role selection & demo mode |
| Register | `Register.tsx` | Multi-step registration (33KB) — personal info, medical info, caregiver |
| Dashboard | `PatientDashboard.tsx` | Health stats, upcoming doses, quick action cards |
| Medicines | `Medicines.tsx` | Full medicine management (28KB) — list, add, calendar, adherence, streaks |
| Records | `Records.tsx` | Medical records vault with detail view |
| Reports | `Reports.tsx` | Upload, OCR view, AI analysis |
| Symptoms | `Symptoms.tsx` | Log symptoms with severity picker |
| Timeline | `Timeline.tsx` | Chronological health event feed |
| AI Analyzer | `AIAnalyzer.tsx` | Triage + medicine analysis + voice input (21KB) |
| QR Code | `QRCode.tsx` | Profile & emergency QR generation |
| QR Profile | `QRProfile.tsx` | Scanned patient profile display |
| Profile | `Profile.tsx` | Settings, personal info, caregiver, theme, language (34KB) |
| Notifications | `Notifications.tsx` | Notification center with filtering |
| Alerts | `Alerts.tsx` | Urgent alerts view |
| Messages | `Messages.tsx` | Chat with assigned doctor |

### Doctor Screens
| Screen | File | Description |
|:---|:---|:---|
| Dashboard | `DoctorDashboard.tsx` | Patient overview, alerts, activity feed |
| Patients | `Patients.tsx` | Patient list with search and assign/unassign |
| Patient Details | `PatientDetails.tsx` | Deep-dive — records, reports, medicines for one patient (21KB) |
| Messages | `Messages.tsx` | Chat with assigned patients |

### Shared Components (15)
`AppLayout` · `BottomNav` · `BottomNavLayout` · `DrawerLayout` · `Navbar` · `Sidebar` · `ScreenHeader` · `UI` (shared primitives) · `MedicineCalendar` · `JumpToTodayButton` · `WeeklyAdherenceSummary` · `StreakCounter` · `StreakChainLayer` · `Stepper` · `NotificationToast`

---

## ⏰ Background Schedulers & Cron Jobs

Four `node-cron` scheduled tasks run automatically on the backend:

| Scheduler | File | Schedule | Function |
|:---|:---|:---|:---|
| **Dose Reminders** | `doseReminderScheduler.js` | Periodic | Scans upcoming medicine time slots → creates reminder notifications |
| **Missed Dose Detector** | `missedDoseScheduler.js` | Periodic | Identifies unlogged doses past their time slot → marks as `missed` → creates alert notifications → triggers caregiver alerts if ≥3 consecutive misses |
| **Low Supply Warning** | `lowSupplyScheduler.js` | Periodic | Checks `remainingCount` for all active medicines → warns patients when supply is low |
| **Daily Summary** | `dailySummaryScheduler.js` | Daily | Aggregates daily adherence data → creates summary notification with stats |

Each scheduler also exposes an Express router for **manual triggering** via API endpoints during development or testing.

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js**: v20.x or higher
- **npm** or **yarn**
- **MongoDB**: Active MongoDB Atlas cluster URI or local MongoDB instance
- **Expo Go App** (optional, for testing on physical iOS/Android devices)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SwasthyaSeva.git
cd SwasthyaSeva
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section below)
cp .env.example .env
# Edit .env with your values

# Start the backend server in development mode (with hot-reload)
npm run dev
```

The backend server will run on `http://localhost:5000` (or `http://0.0.0.0:5000`).

**Verify readiness:**
```bash
curl http://localhost:5000/health/ready
# Expected: {"status":"ready","checks":{"database":"connected"},...}
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start
```

**Choose your platform:**
- Press `w` → Open in Web Browser
- Press `a` → Open in Android Emulator
- Press `i` → Open in iOS Simulator
- Scan QR code → Open in **Expo Go** on your physical device

#### Configure API Endpoint

Edit `frontend/services/config.ts` to set your target server:

| Platform | Configuration |
|:---|:---|
| **Web Browser** | Default — `http://localhost:5000/api/v1` |
| **Android Emulator** | `http://10.0.2.2:5000/api/v1` |
| **Physical Device (LAN)** | Set `USE_PHYSICAL_DEVICE = true`, update `DEV_LOCAL_NETWORK_URL` with your PC's local IP (e.g., `http://192.168.1.50:5000/api/v1`) |
| **Production** | Set `USE_PRODUCTION_IN_DEV = true` → connects to `https://swasthyaseva.onrender.com/api/v1` |

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/` with the following variables:

```env
# ── Server ──────────────────────────────────────────
PORT=5000
HOST=0.0.0.0
NODE_ENV=development

# ── Database ────────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/swasthyaseva?retryWrites=true&w=majority

# ── Authentication ──────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=*

# ── Cloudinary (Required for Report Uploads) ───────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ── OpenRouter AI (Optional — mock fallback if omitted)
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1    # Optional override

# ── Email Notifications (Optional) ─────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

# ── QR Configuration (Optional) ────────────────────
BACKEND_PUBLIC_URL=https://your-production-url.com   # Used for emergency QR URLs
QR_EMERGENCY_TOKEN_EXPIRY=30d                        # Default: 30 days
```

| Variable | Required | Default | Description |
|:---|:---|:---|:---|
| `PORT` | ❌ | `5000` | Server port |
| `HOST` | ❌ | `0.0.0.0` | Server bind address |
| `NODE_ENV` | ❌ | `development` | Environment mode |
| `MONGO_URI` | ✅ | — | MongoDB connection string |
| `JWT_SECRET` | ✅ | — | Secret key for JWT signing |
| `CORS_ORIGIN` | ❌ | `*` | Allowed CORS origins |
| `CLOUDINARY_CLOUD_NAME` | ✅ | — | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | — | Cloudinary API secret |
| `OPENROUTER_API_KEY` | ❌ | — | OpenRouter API key (starts with `sk-or-v1-`) |
| `OPENROUTER_MODEL` | ❌ | `openrouter/free` | AI model selection |
| `SMTP_HOST` | ❌ | — | SMTP server hostname |
| `SMTP_PORT` | ❌ | — | SMTP server port |
| `SMTP_USER` | ❌ | — | SMTP email address |
| `SMTP_PASS` | ❌ | — | SMTP app password |

---

## ❓ Troubleshooting

### 1. "Network Error" during Registration or Login
- **Cause**: The app cannot reach the backend API.
- **Fix**: Verify backend is running (`cd backend && npm run dev`). Ensure the API URL in `frontend/services/config.ts` matches your platform:
  - Web: `localhost:5000`
  - Android Emulator: `10.0.2.2:5000`
  - Physical device: Your computer's LAN IP (e.g., `192.168.1.50:5000`)

### 2. "AI failed" or Mock AI Responses
- **Cause**: `OPENROUTER_API_KEY` is not set or is a placeholder in `backend/.env`.
- **Fix**: The backend automatically returns safe mock responses when no valid key is present. To enable live AI:
  1. Register at [openrouter.ai](https://openrouter.ai)
  2. Generate an API key (starts with `sk-or-v1-`)
  3. Add to `backend/.env` as `OPENROUTER_API_KEY`

### 3. File Upload / OCR Errors
- **Cause**: Cloudinary keys missing or unsupported file type.
- **Fix**: Ensure all three Cloudinary variables are set in `backend/.env`. Only PDF, JPG, PNG, and WEBP files under 10MB are accepted.

### 4. QR Emergency Profile Not Loading
- **Cause**: `BACKEND_PUBLIC_URL` not set, so the QR URL uses the request's host header.
- **Fix**: Set `BACKEND_PUBLIC_URL` in `.env` to your production URL.

### 5. Database Connection Issues
- **Cause**: Invalid `MONGO_URI` or network restrictions.
- **Fix**: Verify your MongoDB Atlas cluster is active and your IP is whitelisted. Check the readiness endpoint: `GET /health/ready`.

### 6. Push Notifications Not Working
- **Cause**: Expo push notification tokens require a physical device.
- **Fix**: Push notifications only work on physical devices via Expo Go or a standalone build. Emulators/simulators will fall back to in-app notifications.

---

## 🧪 Testing

```bash
# Run backend tests (Jest + Supertest + in-memory MongoDB)
cd backend
npm test

# Watch mode
npm run test:watch
```

The test suite uses `mongodb-memory-server-core` to spin up an ephemeral MongoDB instance — no external database required for tests.

---

## 🛡️ Known Issues & Security Roadmap

> [!CAUTION]
> **SwasthyaSeva is currently a development/demo project.** The issues listed below must be resolved before the app handles real patient data. They are organized into three tiers by severity.

---

### 🔴 Tier 1 — Security (Fix Before Anyone Uses Real Data)

#### 1. Anyone Can Register as a Doctor

**Problem:** `/auth/register` accepts `role: "doctor"` directly from the request body. Any user can register as a doctor and gain access to patient data, records, and reports.

**Fix:**
- Add a `verificationStatus: 'pending' | 'approved'` field on the `User` model. Doctors start as `pending`.
- Update `requireRole('doctor')` middleware to also verify `status === 'approved'`.
- Approve doctors through a protected admin route or a one-off database script. For a demo, manually setting the flag in MongoDB is sufficient.

---

#### 2. Any Doctor Can Assign Any Patient by ID (IDOR)

**Problem:** `POST /doctor/patients/:patientId/assign` requires no patient consent. Guessing or leaking a patient's MongoDB ObjectId gives any doctor full access to that patient's data — a classic Insecure Direct Object Reference (IDOR) vulnerability.

**Fix:**
- Allow assignment **only** through QR scan, since the QR token cryptographically proves the patient shared it voluntarily. Remove the raw-ID assign route entirely, or convert it to create a **pending request** that the patient must explicitly accept.
- Reduce profile QR token expiry from **7 days → ~15 minutes** for assignment purposes.
- On **every** doctor route that takes `:patientId`, enforce `patient.assignedDoctorId === req.user.id`.
- `assignedDoctorId` is a single field — verify that a second doctor cannot silently overwrite the first doctor's assignment.

---

#### 3. Emergency QR Exposes Too Much & Cannot Be Revoked

**Problem:** The public emergency profile page renders full medical records and report download links. The QR uses a stateless JWT, so a leaked QR remains valid for 30 days with no way to revoke it.

**Fix:**
- **Limit displayed data** to only what a paramedic needs: blood type, allergies, emergency contact, critical conditions, and current medicine names. Remove records and report links entirely.
- **Replace stateless JWT** with a random token (hashed) stored on the `User` document. A "Regenerate / Revoke" button in the app invalidates the old token instantly.
- Let the patient **toggle which fields** appear on their emergency profile.
- **Notify the patient on each scan.** The scan audit log infrastructure already exists — sending a notification is low-effort.

---

#### 4. Cloudinary Report Files Are Probably Public

**Problem:** Default Cloudinary uploads produce permanent public URLs. The `fileUrl` is stored in the database. Anyone who obtains or guesses a URL has permanent access to the medical report.

**Fix:**
- Upload with `type: 'authenticated'`, store the `public_id` (not a public URL), and generate **short-lived signed URLs** on demand:

```js
cloudinary.url(publicId, {
  type: 'authenticated',
  sign_url: true,
  resource_type: 'image', // 'raw' for non-image PDFs
  expires_at: Math.floor(Date.now() / 1000) + 300, // 5 minutes
});
```

- Verify that `DELETE /reports/:id` also deletes the file from Cloudinary — currently it may only delete the database row.

---

#### 5. Token Handling Weaknesses

**Problems:**
- **Logout is client-only.** The server has no mechanism to invalidate issued JWTs.
- **JWT stored in plain AsyncStorage** — unencrypted on-device storage.
- **No rate limiting** on `/auth/login` and `/auth/register` — only uploads and emergency QR are limited.
- **No type validation on login fields** — `{ "email": {"$ne": ""} }` payloads can become NoSQL injection.

**Fixes:**
- Add `tokenVersion: Number` to `User`. Include it in the JWT payload. `verifyToken` middleware compares `token.tokenVersion === user.tokenVersion`. Increment on logout or password change — all old tokens die immediately. The fuller approach: 15-minute access tokens + a refresh token stored hashed in the database.
- Use **`expo-secure-store`** on native platforms, with an `AsyncStorage` fallback on web only.
- Add `express-rate-limit` to `/auth/login` and `/auth/register`.
- Validate that `email` and `password` are **strings** using `express-validator`. Block object payloads to prevent NoSQL injection.

---

#### 6. Open Utility Endpoints

**Problem:** `/api/v1/cron/*` and `/api/v1/debug` are unauthenticated. Anyone can trigger schedulers or probe the server.

**Fix:**
- Require an `x-cron-secret` header checked against a `CRON_SECRET` environment variable for all cron endpoints.
- Disable `/api/v1/debug` when `NODE_ENV === 'production'`.
- **Render free tier** sleeps after inactivity, so in-process `node-cron` stops running. Trigger the protected cron endpoints from an external pinger (GitHub Actions schedule, `cron-job.org`, etc.).
- Make all schedulers **idempotent** — otherwise the external pinger plus in-process cron will create duplicate reminders and double-mark missed doses.

---

#### 7. Demo Mode & Mock Data

**Problem:** Demo login bypass and `mockData.ts` imports in a health app is a serious finding if exposed in production.

**Fix:**
- Gate demo login behind `__DEV__` or an environment flag (`ENABLE_DEMO_MODE`).
- Ensure `mockData.ts` is **never imported** in production code paths — only in development/test builds.
- Document clearly that demo mode is development-only.

---

### 🟡 Tier 2 — AI Handling (Fix Before Real Medical Use)

#### 1. Use a Deterministic Model

**Problem:** `openrouter/free` uses free routing that can change the underlying model at any time. Medical output quality is unpredictable.

**Fix:** Pin a specific model (e.g., `meta-llama/llama-3-70b-instruct` or `google/gemini-pro`) in `.env` and document the choice.

#### 2. Stop Provider-Side Data Collection

**Problem:** User symptoms and OCR'd lab reports are sent to third-party LLMs without data-collection restrictions.

**Fix:** Include `provider: { data_collection: "deny" }` in every OpenRouter API request body. This matters because you're transmitting sensitive medical text.

#### 3. Strip PII Before Sending to AI

**Fix:** Before calling the LLM, strip patient identifiers (name, phone number, patient ID, email) from OCR text and symptom descriptions. Use regex-based sanitization.

#### 4. Add AI Consent Screen

**Fix:** Show a one-time consent dialog before the first AI feature use: _"Your symptoms/report text will be sent to a third-party AI service for analysis. No personal identifiers are shared."_ Store consent in user preferences.

#### 5. Hard-Code Emergency Responses

**Problem:** The AI model decides urgency for critical conditions like chest pain, stroke symptoms, or suicidal ideation. An incorrect or delayed response is dangerous.

**Fix:** Check for red-flag keywords **before** calling the LLM. If detected, return a fixed, medically-reviewed response: _"Seek emergency medical care immediately. Call 112 / your local emergency number."_ Never let a model decide that.

#### 6. Validate AI Output Schema

**Fix:** The triage response displays an urgency level. Validate the LLM's output against an expected schema (urgency: `low` / `moderate` / `high` / `emergency`, structured advice). If validation fails, return a safe fallback.

#### 7. Label Mock Responses Clearly

**Fix:** When using mock fallback responses (no API key), display a prominent visual indicator so nobody mistakes them for real medical triage.

#### 8. Append Disclaimer Server-Side

**Problem:** The medical disclaimer is generated via the AI prompt. The model could omit it.

**Fix:** Always append the disclaimer string server-side in the response handler, not through the prompt. Guaranteed presence regardless of model behavior.

---

### 🟠 Tier 3 — Functional Bugs & Gaps

#### 1. Timezone Bug (Likely Active)

**Problem:** Dose times like `"08:00"` are evaluated on a UTC server. For IST users (UTC+5:30), doses fire **5.5 hours off**. Streak day-boundary calculations also break across timezones.

**Fix:**
- Store `timezone` on the `User` model (default: `Asia/Kolkata`).
- Use `luxon` for all due-time and day-boundary math.
- Set the `timezone` option on `node-cron` schedule definitions.

#### 2. Push Notifications Are Incomplete

**Current state:** `expo-notifications` is integrated on the frontend, but the backend has no push delivery mechanism.

**Fix:**
- Add `pushTokens: [String]` field on `User`.
- Add `POST /api/v1/notifications/push-token` to register device tokens.
- Send push via `expo-server-sdk`, check receipts, and delete tokens that return `DeviceNotRegistered`.
- Note: Android remote push doesn't work in Expo Go (SDK 53+). A **dev build** with FCM credentials is required.

#### 3. Voice Input Limitations

**Problem:** `@react-native-voice/voice` requires a dev build (not Expo Go) and doesn't work on web.

**Fix:**
- Evaluate `expo-speech-recognition` (has an Expo config plugin) as an alternative — check current maintenance status.
- If recording raw audio instead, use `expo-audio`. `expo-av` is deprecated.
- Document platform support clearly.

#### 4. Timeline Endpoint Missing

**Current state:** The frontend `Timeline.tsx` screen exists, but there's no unified backend endpoint.

**Fix:** Either:
- Add `GET /api/v1/patient/timeline` that merges symptoms, records, and reports server-side, sorted by date with cursor pagination. **OR**
- Document that the app assembles the timeline client-side from three separate API calls.

#### 5. Doctor Patient-Detail View — Missing Endpoints

**Problem:** The `PatientDetails.tsx` screen needs medicine, symptom, and adherence data for a specific patient, but no doctor-scoped endpoints exist for these.

**Fix:** Add the following endpoints with the assignment ownership check from Tier 1 item #2:
- `GET /api/v1/doctor/patients/:patientId/medicines`
- `GET /api/v1/doctor/patients/:patientId/symptoms`
- `GET /api/v1/doctor/patients/:patientId/adherence`

#### 6. Medical Records — Missing Update & Soft Delete

**Problem:** No update endpoint exists for records. Deleting medical records appears to be a hard delete.

**Fix:**
- Add `PATCH /api/v1/doctor/records/:id`, restricted to the authoring doctor (`record.doctorId === req.user.id`).
- Use **soft delete** or **versioning**. Medical records should never be permanently hard-deleted.
- Patients remain read-only for records.

#### 7. Caregiver Alerts Not Implemented

**Problem:** The `User` model stores caregiver `name`, `email`, and `phone`, but missed-dose alerts are only sent to the assigned doctor. Caregiver contact info is collected but never used.

**Fix:** Either:
- Send the caregiver an email via `emailService` when the consecutive-miss threshold is reached. **OR**
- Stop collecting caregiver contact information until the feature is built.

#### 8. Chat — Polling vs. Real-Time

**Current state:** Messages are fetched on-demand. No real-time delivery mechanism exists.

**Fix:**
- For this scale, **short polling** with `?after=<timestamp>` is sufficient. Document it as polling in the README.
- Add Socket.IO **only** if a demo requires live delivery. If implemented:
  - Authenticate the JWT in the Socket.IO handshake.
  - Verify the doctor–patient assignment before joining a chat room.
  - Fall back to polling if the WebSocket connection fails.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

<div align="center">

**SwasthyaSeva** — Built with ❤️ for better healthcare accessibility.

_स्वास्थ्य सेवा — सबके लिए स्वास्थ्य, सबके लिए सेवा_

</div>
