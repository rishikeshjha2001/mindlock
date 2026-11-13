# MINDLOCK Web Application

High-converting digital product web application for **MINDLOCK** (an exam psychology, focus protocol, and mental operating system for 18–25 year old Indian exam aspirants preparing for JEE, NEET, UPSC, SSC, Banking, and State exams).

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **Prisma with SQLite**.

---

## 🚀 Key Features

### 1. Visual Aesthetic & Design System
- **Theme:** "Late-Night Obsidian" dark mode designed for 1:30 AM study sessions.
- **Palette:** Obsidian Black (`#0A0A0A`), Surface (`#141414`), Crimson Accent (`#E11D48`), Crisp White (`#F8FAFC`), Slate Text (`#94A3B8`).
- **Mobile-First:** 100% responsive, zero horizontal overflow, sticky mobile CTA bar after scrolling past the hero.

### 2. High-Converting Landing Page (`/`)
- **Top Urgency Bar:** *"⚠️ For Serious Aspirants Only: Stop losing another year to overthinking, phone escape & exam-hall panic."*
- **Hero Section:** Raw Hindi pattern-interrupt headline speaking directly to parental sacrifice and subconscious guilt.
- **Interactive Audio Preview Widget:** 15-second late-night reality audio preview with dynamic waveform visualizer and binaural ambient focus synth.
- **The Silent Daily War Grid:** 6 unavoidable triggers (Parental sacrifice guilt, library sitting illusion, "No Match Found" PDF trauma, 2 AM ceiling stare, friend's first salary comparison, and exam-hall nervous collapse).
- **The Mechanism Shift Table:** Surface tactics (14h timetables, app blockers) vs. Root nervous system control.
- **Inside the Kit (Physical 3D feel):**
  1. The MINDLOCK Cognitive Blueprint (75-page PDF manual)
  2. 8 Raw Hindi Late-Night Audio Reset Drills (Audio vault)
  3. The 60-Second Tough-Chapter Friction Decoder
  4. Exam-Hall Nerve Control Protocol & Anti-Forgetting Matrix
- **Raw Aspirant Proof:** Realistic dark-mode WhatsApp / Instagram DM testimonial cards from Kota, Mukherjee Nagar, Prayagraj, etc.
- **Pricing & 2-Step Checkout Modal:**
  - ₹799 crossed out → **₹199 Only** (Lifetime access, instant delivery).
  - Collects Full Name, WhatsApp Number (10 digits), and Target Exam.
  - Automatically records the lead in SQLite and redirects to the configured payment gateway link (defaults to `/checkout-confirm`).
  - UPI trust badges & 7-Day 100% Money-Back Guarantee.

### 3. First-Party Analytics & Event Tracking Engine
- **Non-blocking tracking:** Stores all data in local SQLite database (`prisma/dev.db`).
- **PageVisits:** Session ID, path, referrer, device type, browser, exact IST date/hour, and active time spent (updated via heartbeat & `navigator.sendBeacon`).
- **Button Clicks:** Real-time click tracking across all buttons (Hero CTA, sticky mobile CTA, audio preview play, pricing button, checkout modal submit, floating WhatsApp button).
- **Lead Records:** Full name, phone number, target exam, source CTA button, and date/time.

### 4. Protected Admin Panel (`/admin`)
- **Login Credentials:**
  - **Admin ID:** `admin@bookify`
  - **Password:** `Rishi@2003`
  - Secured via signed HTTP-only cookie (`mindlock_admin_session`).
- **Top KPI Cards:** Page views (all-time & today), unique visitors, button clicks, checkout initiations / leads, click-to-lead conversion rate (%), and average time on site.
- **Tab 1: Daily Traffic & Time-Per-Day Analytics:** Interactive SVG velocity bar chart + detailed tabular breakdown per day with peak traffic hours.
- **Tab 2: Button Click Intelligence:** Ranked CTA table with exact click counts, unique clickers, and click share (%).
- **Tab 3: Page Visit Logs:** Filterable by date and page path, showing exact IST time, seconds spent, device, and referrer.
- **Tab 4: Captured Student Leads:** Lead list with 1-click **"Chat on WhatsApp"** deep-link and **"Download CSV"** button.
- **Tab 5: Quick Settings:** In-app editor to update the Payment Redirect URL (SuperProfile / Razorpay) and Display Price.

---

## 🛠️ Local Development & Running

```bash
# Push database schema (already initialized)
npx prisma db push

# Run development server
npm run dev

# Or build and start production server
npm run build
npm run start
```

Access the web application at:
- **Landing Page:** [http://localhost:3000](http://localhost:3000)
- **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Access Confirmation Portal:** [http://localhost:3000/checkout-confirm](http://localhost:3000/checkout-confirm)
- **Legal Pages:** `/privacy-policy`, `/terms`, `/refund-policy`

