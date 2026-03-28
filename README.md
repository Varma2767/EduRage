# 🎓 EduManage Pro — Student Management System PWA

A fully offline-capable Progressive Web App (PWA) for managing students,
grades, fees, attendance, canteen, hostel, and more.

---

## 🚀 HOW TO RUN (Windows Laptop / PC)

### ✅ Method 1 — Double-click (Easiest)
1. Make sure Python is installed → https://python.org/downloads
2. Double-click **`START_WINDOWS.bat`**
3. Your browser opens automatically at http://localhost:8080
4. Done!

### ✅ Method 2 — Manual (Python)
Open PowerShell or CMD in this folder and run:
```
python -m http.server 8080
```
Then open: http://localhost:8080

### ✅ Method 3 — VS Code Live Server
1. Open this folder in VS Code
2. Install "Live Server" extension (Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"

---

## 📲 INSTALL AS DESKTOP APP

Once open in Chrome/Edge:
1. Look for the **Install banner** at the bottom of the screen
2. Click **"Install ↓"**
3. Or click the ⊞ install icon in the browser address bar
4. The app installs like a native app — opens in its own window!

> After installing, you can open it from your **desktop shortcut** or
> **Start Menu** without needing the terminal.

---

## 💾 DATA STORAGE

All data is stored in your **browser's localStorage** — no database, no
server, no internet needed after first load.

| What's stored          | localStorage key       |
|------------------------|------------------------|
| Students               | `sms2_students`        |
| Grades & Marks         | `sms2_grades`          |
| Fee Records            | `sms2_fees`            |
| Attendance             | `sms2_att`             |
| PWA install preference | `pwa_install_dismissed`|

Data **persists between sessions** automatically. To reset, use
Settings → Reset Sample Data inside the app.

---

## 🔑 LOGIN CREDENTIALS

| Username | Password   | Access        |
|----------|------------|---------------|
| admin    | admin123   | Full access   |
| staff    | staff123   | Limited       |

---

## 📁 FILE STRUCTURE

```
EduManagePro/
├── index.html          ← Main app (entire frontend)
├── manifest.json       ← PWA manifest (makes it installable)
├── sw.js               ← Service Worker (offline support)
├── START_WINDOWS.bat   ← Double-click launcher for Windows
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md           ← This file
```

---

## ✨ FEATURES

- 📊 Dashboard — stats, course progress, fee overview, top students
- 👥 Students — add, edit, delete, filter, paginate
- 📅 Attendance — daily register + calendar view
- 📝 Grades — enter marks, grade sheet, rankings, report cards
- 💰 Fees — fee tracking, payment recording, overdue alerts
- 📚 Courses — 9 courses with progress tracking
- 🍽️ Canteen — meal plans, balance, dietary preferences
- 🏠 Hostel — room allocation, block assignment
- 📈 Reports — dept analysis, GPA distribution, attendance stats
- ⬇️ Export — CSV and JSON export
- 🔒 Auth — role-based login (Admin / Staff)
- 📲 PWA — installable, works offline, desktop shortcut

---

## 🛠 TECH STACK

HTML5 · CSS3 · Vanilla JavaScript · localStorage API · PWA (Service Worker + Web App Manifest)

Made by: Varri Shyam Sai (246301217) · Varshit Atuluri (246301218) · Datla Sandeep Varma (246301232)
