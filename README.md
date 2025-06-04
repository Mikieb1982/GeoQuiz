 # GeoQuiz 🌍❓

A fun and interactive quiz game to test your geographical knowledge, themed around Bad Belzig!

## 🌟 Features

* Interactive map-based questions.
* Multiple quiz categories related to Points of Interest (POIs) in Bad Belzig.
* Earn badges for completing quizzes.
* Engaging UI with a local theme.
* Built with modern web technologies.

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, TypeScript
* **Styling:** Custom Components (with Bad Belzig's green and white color scheme)
* **Internationalization:** i18n
* **Data:** Local TypeScript files for POIs, quizzes, and badges.

## 🚀 Getting Started

### Prerequisites

* Node.js **20.x** (set as `NODE_VERSION`)
* pnpm package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mikieb1982/GeoQuiz.git](https://github.com/Mikieb1982/GeoQuiz.git)
    cd GeoQuiz
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    Using `npm` may fail because of peer dependency conflicts.

3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build the Cloudflare worker:**
    ```bash
    pnpm run build:worker
    ```
    This command generates the worker output in the `.open-next` folder.

5.  **Deploy to Cloudflare:**
    ```bash
    wrangler deploy
    ```
    Deployment requires Cloudflare credentials (`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`).
    The worker expects the `DB` and `ASSETS` bindings defined in `wrangler.toml`.

### Static Export for GitHub Pages

GeoQuiz can be published as a static site using GitHub Pages:

1. Run the export script:
   ```bash
   pnpm run export:ghpages