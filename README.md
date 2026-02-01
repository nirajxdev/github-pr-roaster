# PR Roaster - Cyberpunk Terminal

A brutally honest PR review tool with a cyberpunk terminal aesthetic. Powered by Google Gemini AI.

## Tech Stack

- **Next.js 14** - React framework with App Router & Server Actions
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Shadcn/UI** - UI component primitives
- **Lucide React** - Icons
- **Google Gemini AI** - Code analysis and roasting

## Features

- 🔥 Cyberpunk terminal UI with neon red accents
- ⚡ AI-powered code roasting via Gemini
- 💀 Brutally honest code reviews in three sections:
  - **THE VERDICT** - One devastating sentence
  - **THE GRILLING** - Bullet points of logic flaws
  - **THE PENANCE** - What to fix for redemption
- 🖥️ Terminal-style input field
- 🌟 Scanline and noise visual effects
- 📡 GitHub integration (PRs, files, gists)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your API keys:
   - `GEMINI_API_KEY` - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - `GITHUB_TOKEN` (optional) - For higher rate limits on GitHub API

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with cyberpunk theme
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/
│   │   ├── button.tsx   # Shadcn-style button
│   │   └── input.tsx    # Shadcn-style input
│   ├── glitch-text.tsx  # Glitchy animated text
│   ├── roast-button.tsx # Pulsing roast button
│   └── terminal-input.tsx # Terminal-style input
└── lib/
    └── utils.ts         # Utility functions (cn)
```

## Customization

- **Colors**: Edit `tailwind.config.ts` to modify the neon colors
- **Animations**: Keyframes defined in Tailwind config and Framer Motion
- **Fonts**: Uses JetBrains Mono for the terminal aesthetic

## License

MIT
