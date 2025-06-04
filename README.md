# GeoQuiz 🌍❓

<!-- Optional: Add a project logo or banner here -->
<!-- <p align="center">
  <img src="link_to_your_logo.png" alt="GeoQuiz Logo" width="200"/>
</p> -->

A fun and interactive quiz game to test your geographical knowledge, themed around Bad Belzig!

<!-- Optional: Add badges here (e.g., build status, license, etc.) -->
<!--
<p align="left">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>
-->

<!-- Optional: Add a screenshot or GIF of the application in action -->
<!--
## Preview
<p align="center">
  <img src="link_to_your_screenshot_or_gif.gif" alt="GeoQuiz Preview" width="600"/>
</p>
-->

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

* Node.js (v18.18.0 or later)
* pnpm (v8 or later)

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
2. Commit the `docs/` folder and push your changes.
3. In your repository settings, enable **GitHub Pages** and choose the `docs/` folder as the source.

## 🗺️ Project Structure

* `/public`: Static assets (images, badge SVGs).
* `/src/app`: Next.js pages and routes.
* `/src/components`: Reusable React UI components.
* `/src/data`: TypeScript files for POIs, quizzes, and badges.
* `/src/types`: TypeScript type definitions.
* `/src/i18n`: Internationalization configuration.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve GeoQuiz, please feel free to:

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
