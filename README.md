# Briefly — AI News Summarizer

Briefly is a polished, frontend-only news reading and article summarization website. It demonstrates how a reader can search sample news, filter articles by category, load an article into a summarizer, and generate a concise extractive summary.

The project is suitable for a college Software Engineering and Project Management demonstration. It uses sample content and does not connect to a real AI model, live news API, backend, database, or URL article retrieval service.

## Features

- Editorial newspaper-inspired responsive interface
- Featured news article and latest news cards
- Relevant article images with accessible alternative text
- News search by title and description
- Category filtering for Technology, Business, Science, Sports, and World
- Article-to-summarizer interaction
- Article text input with a 10,000-character limit
- Character counter and validation messages
- Optional URL field with frontend-only explanation
- Short, Medium, and Detailed summary modes
- Simulated loading indicator
- Extractive JavaScript summarization
- Copy summary to clipboard
- Clear summarization session
- Recent summaries saved with `localStorage`
- Responsive mobile navigation
- Active section navigation highlighting
- Back to Top button
- Keyboard focus states and reduced-motion support

## Technologies Used

- **HTML5:** Semantic page structure, forms, navigation, articles, and accessibility attributes
- **CSS3:** Layout, responsive design, CSS variables, typography, colors, borders, shadows, and media queries
- **Vanilla JavaScript:** Search, filtering, validation, summarization, event handling, local storage, clipboard copying, and UI updates

No frameworks, build tools, backend, database, or external JavaScript libraries are required.

## Project Structure

```text
PROJ/
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the semantic website structure, including:

- Header and navigation
- Welcome section
- Featured article
- Latest news section
- Article summarizer form
- About section
- Footer

### `style.css`

Contains the complete visual design, including:

- Editorial color palette
- Typography and spacing
- CSS Grid and Flexbox layouts
- News cards and article imagery
- Form styling
- Responsive breakpoints
- Mobile navigation styles
- Accessibility focus states

### `script.js`

Contains the interactive functionality, including:

- Rendering sample articles
- Search and category filtering
- Article loading into the summarizer
- Character counting
- Input validation
- Summary generation
- Loading state handling
- Copy-to-clipboard support
- Recent summary history
- Mobile menu
- Active navigation links
- Back to Top behavior

## How the Summarizer Works

The summarizer is a basic extractive JavaScript demonstration:

1. The article is split into sentences.
2. Common stop words are ignored.
3. Remaining words are counted to identify frequently used terms.
4. Each sentence receives a score based on word frequency.
5. Earlier sentences receive a small position bonus.
6. The highest-scoring sentences are selected.
7. Selected sentences are returned in their original order.

The summary preserves the original wording. It does not generate new claims or use an external AI service.

## How to Run

### Option 1: Open directly

Double-click `index.html` to open the website in a browser.

### Option 2: Use VS Code Live Server

1. Open the `PROJ` folder in Visual Studio Code.
2. Open `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.

No installation or build command is required.

## Demonstration Limitations

The following are demonstrations only:

- Sample news content is static.
- Article images are loaded from external image URLs.
- Summarization is performed by a simple client-side extractive algorithm.
- The URL input does not retrieve article content.
- There is no real AI model, live news feed, backend, database, authentication, or admin panel.

## Accessibility and Responsiveness

The website includes semantic HTML, form labels, descriptive image alternative text, visible keyboard focus states, ARIA labels where useful, responsive layouts for mobile and tablet screens, and reduced-motion support.
