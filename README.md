# 🌿 Mindful Minutes

A minimalist, cross-platform mental wellness app built with **Angular**, styled using **TailwindCSS**, and powered by **Capacitor**. Designed to offer **60-second relaxing encouragements** and guided micro-meditations in a calming, pixel-inspired environment.

Originally created as a personal project for a loved one — this app blends creative design, functional code, and modern tooling to deliver a small but powerful mindfulness break.

---

## ✨ Features

- ⏱️ **60-Second Encouragement Sessions** with calming phrases
- 💬 Rotating **Affirmations & Gentle Prompts**
- 🎨 **Pixel Art Backgrounds** crafted in Figma
- 🧘‍♀️ **Breathing Cues & Soothing Animations** with Angular fade transitions
- 🖋️ **Retro Pixel Fonts** from Google Fonts for nostalgic vibes
- 📱 Built with **Capacitor 7.4.1** for mobile-native capabilities
- 🚀 **Deployable via Vercel** for instant web access

---

## 🛠 Technologies Used

### Frontend

- **Angular 17+** (Standalone Components, Animations, Routing)
- **TailwindCSS** for utility-first styling
- **PostCSS** for animation and styling enhancements
- **TypeScript** for type-safe UI logic

### Platform & Deployment

- **Ionic + Capacitor** for native scaffolding
- **Vercel** for static web deployment (optional)
- **Google Fonts**: [`Press Start 2P`](https://fonts.google.com/specimen/Press+Start+2P)

### Design

- Figma-based **pixel art assets**
- Backdrop blur, glow effects, and soft transitions
- Mobile-first layout with full responsiveness

---

## 🔧 Getting Started

To run the app locally or build for mobile/web:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/mindful-minutes.git
cd mindful-minutes

# 2. Install dependencies
npm install

# 3. Start the development server
ionic serve

# 4. Build the project for production
ionic build

# 5. Add mobile platforms (if targeting native)
ionic cap add android
ionic cap add ios

# 6. Sync your web build with the native shell
ionic cap sync

# 7. Open native IDE project (optional)
ionic cap open android   # or: ionic cap open ios
