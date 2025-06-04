 # GeoQuiz 🌍❓

A fun and interactive quiz game to test your geographical knowledge, themed around Bad Belzig!

## 🌟 Features

* Interactive map-based questions.
* Multiple quiz categories related to Points of Interest (POIs) in Bad Belzig.
* Earn badges for completing quizzes.
* Engaging UI with a local theme.
* Light and dark theme toggle.
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
   ```
   The static site will be generated in the `docs/` directory.
2. Commit the `docs/` folder and push it, for example to a `gh-pages` branch.
3. In your repository settings, enable **GitHub Pages** and choose the
   appropriate source (the `docs/` folder or the `gh-pages` branch).

### Deployment on Netlify

To deploy on Netlify with the `/GeoQuiz` base path, build the site and then move
the static output into a subdirectory. Set the publish directory to `out`:

```bash
pnpm run build && node ./scripts/move-export-to-subdir.js
```

The included `netlify.toml` enables the official Netlify Next.js plugin and
uses this configuration automatically.

## 🗺️ Project Structure

* `/public`: Static assets (images, badge SVGs).
* `/src/app`: Next.js pages and routes.
* `/src/components`: Reusable React UI components.
* `/src/data`: TypeScript files for POIs, quizzes, and badges.
* `/src/types`: TypeScript type definitions.
* `/src/i18n`: Internationalization configuration.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve GeoQuiz,
please feel free to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

* Data sources for Points of Interest.
* Inspiration from the town of Bad Belzig.

---

*This README was enhanced with suggestions for improved visual appeal.*
