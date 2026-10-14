# FORGE-PC 🛠️

> **Custom PC Configuration & Hardware Compatibility Engine** built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

---

## ⚡ Overview

**FORGE-PC** is an interactive web platform designed for PC enthusiasts, gamers, and workstation builders. It provides an intuitive multi-step build wizard backed by an automated compatibility verification engine, real-time power budget calculation, and cloud persistence.

---

## ✨ Features

- **Automated Compatibility Verification:**
  - Socket matching (e.g., LGA1700, AM5, AM4).
  - Form-factor verification (ATX, Micro-ATX, Mini-ITX).
  - RAM speed and DDR generation matching (DDR4 vs DDR5).
  - Power supply wattage clearance checks based on component TDP sum.
- **Interactive Build Wizard:**
  - Step-by-step part selection across CPU, GPU, Motherboard, RAM, Storage, PSU, Cooler, and Case.
  - Search, filter by brand, price range, and specs.
- **Real-Time Build Summary:**
  - Dynamic estimated wattage calculation with recommended PSU headroom.
  - Live cost calculation with detailed line-item breakdown.
- **Cloud Build Persistence (Supabase):**
  - Save custom configurations with user accounts.
  - Share builds via unique permalinks.
  - Browse community-created configurations in the Saved Builds gallery.

---

## 🛠️ Project Structure

```
├── src/
│   ├── components/
│   │   ├── BuildWizard.tsx     # Multi-step part selection wizard
│   │   ├── ComponentCard.tsx   # Individual component card with specs
│   │   ├── LandingPage.tsx     # Homepage and feature showcase
│   │   ├── Navbar.tsx          # Navigation bar with build status
│   │   ├── ResultsPage.tsx     # Final configuration review and export
│   │   ├── SavedBuildsPage.tsx # Gallery of user and community builds
│   │   └── SharedBuildPage.tsx # Permalink view for shared builds
│   ├── data/                   # Component catalog specifications
│   ├── lib/                    # Supabase client and compatibility engine
│   ├── types/                  # TypeScript types for hardware and builds
│   ├── App.tsx                 # Core application routing and state
│   └── main.tsx                # Application entry point
├── supabase/                   # Supabase database migrations and schemas
├── tailwind.config.js          # Tailwind CSS theme and styling tokens
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Gowtham-E2003/FORGE-PC.git
cd FORGE-PC
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 👨‍💻 Author

**Gowtham E** — Associate Software Engineer  
- Portfolio: [https://portfolio-woad-six-77.vercel.app/](https://portfolio-woad-six-77.vercel.app/)  
- GitHub: [@Gowtham-E2003](https://github.com/Gowtham-E2003)  
- LinkedIn: [gowtham-e-62733b333](https://linkedin.com/in/gowtham-e-62733b333)
