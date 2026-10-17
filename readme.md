<div align="center">

# 🏥 MediVault - Digital Healthcare Management System

![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenRouter AI](https://img.shields.io/badge/AI-OpenRouter-7400FF?style=for-the-badge&logo=openai&logoColor=white)

**MediVault** is an end-to-end digital healthcare mobile platform designed to streamline medical record management, enable AI health triage, and track medication adherence in real time. Built with **React Native (Expo Router)** for cross-platform mobile support and a robust **Node.js / Express + MongoDB Atlas** RESTful backend.

[Overview](#-overview) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Setup & Installation](#-setup--installation) • [API Routes](#-api-routes) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Overview

Managing health records and tracking medication routines can be fragmented and error-prone. **MediVault** provides a unified ecosystem where users can securely log symptoms, maintain medical records with OCR extraction, receive AI-driven symptom triage and medicine insights, and share profile details via unique QR codes.

### Highlights:
- **Comprehensive Patient Ecosystem**: Tailored dashboard and health management features.
- **AI Health Triage & Medicine Insights**: Powered by OpenRouter API with graceful fallback handling.
- **Automated Report OCR**: Image/PDF report text extraction powered by Tesseract.js.
- **Medication Adherence Engine**: Automated background cron jobs for dose reminders, missed dose alerts, and low-supply warnings.
- **QR Profile Generation**: Unique patient profile QR codes for quick digital identity access.
- **Multi-Platform API Connectivity**: Centralized configuration supporting Web, Android Emulator, physical LAN devices, and production deployments.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Secure Authentication**: JWT-based authentication with persistent local storage via `@react-native-async-storage/async-storage`.
- **Centralized API Config**: Dynamic URL selection in `frontend/services/config.ts` for Web, Emulator, Local Network IP, or Production Render server (`medivault-cxas.onrender.com`).

### 🤖 AI Health Triage & Smart Assistance
- **Symptom Triage (`/api/v1/ai/triage`)**: Real-time AI preliminary symptom evaluation and medical advice disclaimers.
- **Medicine Side-Effects (`/api/v1/ai/medicine`)**: AI-generated guidance on medicine uses, side effects, and precautions.
- **Medical Report Explanation**: Simple explanations of complex medical lab report text.

### 📄 Medical Records & OCR
- **Document & Report Management**: Upload and organize medical reports, lab results, and prescriptions.
- **Cloud Storage**: Secure file uploading via Cloudinary API.
- **Tesseract.js OCR Engine**: Extract raw text automatically from scanned report images using embedded English language data (`eng.traineddata`).

### 💊 Medicine Tracking & Automated Schedulers
- **Medication Logs**: Track dosages, timing, frequency, and remaining supply.
- **Dose Adherence**: Interactive dose logging with adherence statistics.
- **Background Cron Jobs (`node-cron`)**:
  - **Dose Reminders**: Notifies users of upcoming medication times.
  - **Missed Dose Scheduler**: Identifies unlogged doses and sends alerts.
  - **Low Supply Warning**: Alerts users when medicine counts fall below threshold limits.
  - **Daily Summary Scheduler**: Aggregates daily health & adherence reports.

### 🩺 Symptom Tracking & Timeline
- **Daily Symptom Logging**: Record symptoms with severity levels, descriptions, and timestamps.
- **Health Timeline**: Visual chronological history of logged symptoms and medical events.

### 📱 QR Code Integration
- **Patient QR Generation**: Unique QR codes embedding patient identification metadata.

### 🔔 Notifications
- **In-App Notifications**: Real-time alerts for medication schedules, health tasks, and system updates.

---

## 🛠 Tech Stack

### Mobile Frontend (`/frontend`)
- **Framework**: React Native 0.81 + Expo SDK 54
- **Router**: Expo Router 6.0 (File-based navigation inside `app/screens`)
- **Language**: TypeScript 5.3
- **State & Storage**: React Context API + `@react-native-async-storage/async-storage`
- **UI Components & Features**: `react-native-qrcode-svg`, `react-native-calendars`, `expo-document-picker`, `expo-image-picker`, `expo-notifications`, `react-native-reanimated`, `react-native-svg`

### Backend Server (`/backend`)
- **Runtime**: Node.js (v20.x)
- **Framework**: Express.js 5.x
- **Database**: MongoDB Atlas with Mongoose 9.x ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **File Storage**: Cloudinary API (`cloudinary`) + Multer middleware (`multer`)
- **AI & OCR**: OpenRouter API (`axios`), Tesseract.js (`tesseract.js`), PDF parsing (`pdf-parse`)
- **Scheduled Tasks**: `node-cron`
- **Security & Utilities**: Helmet, CORS, Express-rate-limit, Express-validator, Nodemailer

---

## 📂 Project Structure

```
MediVault/
├── backend/                             # Express REST API Server
│   ├── src/
│   │   ├── config/                      # Server configuration
│   │   │   ├── ai.js                    # OpenRouter AI integration & prompts
│   │   │   ├── cloudinary.js            # Cloudinary API file storage config
│   │   │   ├── db.js                    # MongoDB Mongoose connection handler
│   │   │   └── validateEnv.js           # Startup environment variable validation
│   │   ├── controllers/                 # Business logic handlers
│   │   │   ├── authController.js        # User register, login, profile retrieval
│   │   │   ├── medicineController.js    # Medicine CRUD & dosage logs
│   │   │   ├── notificationController.js# In-app notifications
│   │   │   ├── patientController.js     # Patient dashboard & health stats
│   │   │   ├── qrController.js          # QR code generation
│   │   │   └── symptomController.js     # Symptom logs & timeline tracking
│   │   ├── db/                          # Database connection helpers
│   │   ├── middleware/                  # Custom Express middleware
│   │   │   ├── verifyToken.js           # JWT authentication validator
│   │   │   ├── uploadReport.js          # Multer document upload middleware
│   │   │   └── authValidation.js        # Express-validator input rules
│   │   ├── models/                      # Mongoose Database Schemas
│   │   │   ├── User.js                  # User model
│   │   │   ├── Medicine.js              # Medicine inventory model
│   │   │   ├── MedRecord.js             # Medical records model
│   │   │   ├── Report.js                # Uploaded report metadata & OCR model
│   │   │   ├── DoseLog.js               # Medication adherence logs
│   │   │   ├── SymptomLog.js            # Symptom logs with severity ratings
│   │   │   └── Notification.js          # System notification model
│   │   ├── routes/                      # Express route endpoints
│   │   │   ├── ai.js                    # /api/v1/ai/*
│   │   │   ├── auth.js                  # /api/v1/auth/*
│   │   │   ├── medicine.js              # /api/v1/medicine/*
│   │   │   ├── notification.js         # /api/v1/notifications/*
│   │   │   ├── patient.js               # /api/v1/patient/*
│   │   │   ├── qr.js                    # /api/v1/qr/*
│   │   │   └── symptom.js               # /api/v1/symptom/*
│   │   ├── schedulers/                  # Background Cron Jobs
│   │   │   ├── doseReminderScheduler.js # Sends dose alerts
│   │   │   ├── missedDoseScheduler.js   # Detects missed medication doses
│   │   │   ├── lowSupplyScheduler.js    # Warns when medicine count is low
│   │   │   └── dailySummaryScheduler.js # Aggregates daily summaries
│   │   ├── services/                    # External services & background engines
│   │   │   ├── emailService.js          # Nodemailer email notifications
│   │   │   ├── ocrService.js            # Tesseract.js text extraction
│   │   │   └── streakService.js         # Health streak calculation logic
│   │   └── server.js                    # Express app main entry point
│   ├── eng.traineddata                  # Tesseract OCR language dataset
│   └── package.json                     # Backend dependencies & scripts
│
├── frontend/                            # React Native Expo Mobile App
│   ├── app/                             # Expo Router structure
│   │   ├── _layout.tsx                  # Root navigation & provider setup
│   │   ├── index.tsx                    # Entry redirect handler
│   │   └── screens/                     # Main Application Screens
│   │       ├── AIAnalyzer.tsx           # AI Triage & Medicine analysis screen
│   │       ├── Alerts.tsx               # Urgent alerts & notifications list
│   │       ├── LoginScreen.tsx          # User login
│   │       ├── Medicines.tsx            # Medicine inventory & dose logging
│   │       ├── Notifications.tsx        # In-app notifications screen
│   │       ├── PatientDashboard.tsx     # Patient health stats & quick actions
│   │       ├── Profile.tsx              # User profile settings
│   │       ├── QRCode.tsx               # Patient QR generation screen
│   │       ├── Records.tsx              # Medical records vault
│   │       ├── Register.tsx             # User registration
│   │       ├── Reports.tsx              # Upload & view reports with OCR text
│   │       ├── SplashScreen.tsx         # Initial splash loading screen
│   │       ├── Symptoms.tsx             # Symptom logger
│   │       └── Timeline.tsx             # Medical events timeline
│   ├── components/                      # Reusable UI components
│   ├── context/                         # React Contexts (AuthContext, ThemeContext)
│   ├── services/                        # API & Configuration Services
│   │   ├── config.ts                    # Dynamic API URL configuration (Local/Prod)
│   │   └── api.ts                       # Fetch client & HTTP endpoint wrappers
│   ├── package.json                     # Frontend dependencies & scripts
│   └── app.json                         # Expo app manifest & permissions
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js**: v20.x or higher
- **npm** or **yarn**
- **MongoDB**: Active MongoDB Atlas cluster URI or local MongoDB daemon
- **Expo Go App** (optional, for testing on physical iOS/Android devices)

---

### 1. Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
```

Create a `.env` file inside `backend/` with the following variables:

```env
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medivault?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=*

# Cloudinary Integration (Required for Report Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# OpenRouter AI Integration (Optional, uses mock fallback if omitted)
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free

# Email Notification System (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
```

```bash
# 4. Start the backend server in development mode
npm run dev
```

The backend server will run on `http://localhost:5000` (or `http://0.0.0.0:5000`).
You can verify backend readiness by accessing `http://localhost:5000/health/ready`.

---

### 2. Frontend Setup

```bash
# 1. Open a new terminal and navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install
```

#### Configure API Endpoint (`frontend/services/config.ts`)
Open `frontend/services/config.ts` to set your target server:

- **Web Browser (Local Backend)**: Default settings work out-of-the-box (`http://localhost:5000/api/v1`).
- **Android Emulator**: Uses `http://10.0.2.2:5000/api/v1`.
- **Physical Device**: Set `USE_PHYSICAL_DEVICE = true` and update `DEV_LOCAL_NETWORK_URL` with your computer's local IP (e.g., `http://192.168.1.50:5000/api/v1`).
- **Production Server**: Set `USE_PRODUCTION_IN_DEV = true` to connect directly to `https://medivault-cxas.onrender.com/api/v1`.

```bash
# 3. Start Expo development server
npm start
```

Press:
- `w` to open in Web Browser
- `a` to open in Android Emulator
- `i` to open in iOS Simulator
- Or scan the QR code with **Expo Go** on your physical device.

---

## 🔌 API Routes Summary

### 🔑 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account | ❌ No |
| `POST` | `/login` | User login & return JWT token | ❌ No |
| `GET` | `/me` | Get currently logged-in user profile | ✅ Yes |

### 🏥 Patient Routes (`/api/v1/patient`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/dashboard` | Get patient dashboard stats & upcoming tasks | ✅ Yes |
| `POST` | `/upload-report` | Upload medical report (Cloudinary + Tesseract OCR) | ✅ Yes |
| `GET` | `/reports` | Retrieve list of uploaded reports | ✅ Yes |

### 💊 Medicine & Doses (`/api/v1/medicine`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Add a new medicine schedule | ✅ Yes |
| `GET` | `/` | Get all medicines for patient | ✅ Yes |
| `POST` | `/log-dose` | Record a taken/missed medicine dose | ✅ Yes |
| `GET` | `/dose-logs` | Retrieve medication dose history | ✅ Yes |

### 🩺 Symptoms & Timeline (`/api/v1/symptom`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/log` | Log a daily symptom with severity rating | ✅ Yes |
| `GET` | `/history` | Fetch symptom history & timeline events | ✅ Yes |

### 🤖 AI Health Assistant (`/api/v1/ai`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/triage` | Analyze patient symptoms & provide advice | ✅ Yes |
| `POST` | `/medicine` | Analyze side effects & precautions for medicine | ✅ Yes |

### 📱 QR Code Management (`/api/v1/qr`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/generate` | Generate patient QR code payload | ✅ Yes |

---

## ❓ Troubleshooting

### 1. "Network Error" during Registration or Login
- **Cause**: The app cannot reach the backend API.
- **Fix**: Verify backend is running (`cd backend && npm run dev`). Make sure your API URL in `frontend/services/config.ts` matches your current platform (e.g., `10.0.2.2` for Android Emulator, local IP for physical phone).

### 2. "AI failed" or Mock AI Responses
- **Cause**: `OPENROUTER_API_KEY` is not provided in `backend/.env`.
- **Fix**: The backend automatically degrades to safe mock responses if no key is set. To enable live AI, register at [openrouter.ai](https://openrouter.ai), obtain an API key starting with `sk-or-v1-`, and add it to `backend/.env`.

### 3. File Upload / OCR Errors
- **Cause**: Cloudinary keys missing or unsupported file type.
- **Fix**: Ensure Cloudinary parameters are configured in `backend/.env`. Uploaded files must be PDF, JPG, PNG, or WEBP under 10MB.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

<div align="center">
Built with ❤️ for better healthcare accessibility.
</div>
