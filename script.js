const sampleArticles = [
  { id: "tech-1", category: "Technology", title: "Why repairable devices are gaining attention in campus communities", description: "Student groups and local workshops are making it easier to maintain electronics instead of replacing them.", image: "image-tech", imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", text: "Repairable devices are gaining attention in campus communities as students look for practical ways to reduce electronic waste. Local workshops are teaching basic maintenance skills, from replacing batteries to diagnosing common faults. Supporters say the lessons make technology feel less disposable while giving students useful confidence. Manufacturers are also being encouraged to publish repair guides and make spare parts easier to find. The movement is still small, but its focus on longer product lifecycles is attracting interest from educators and designers." },
  { id: "business-1", category: "Business", title: "Small businesses are turning quiet hours into planning time", description: "Independent teams are using slower trading periods to review processes, train staff, and prepare for the next season.", image: "image-business", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80", text: "Many small businesses are turning quiet trading hours into structured planning time. Owners are reviewing customer feedback, improving stock routines, and giving staff short training sessions. This approach helps teams address small problems before they become expensive disruptions. Business advisers say the most useful plans are simple enough to revisit every week. For independent companies, consistent small improvements can be more valuable than a single large change." },
  { id: "science-1", category: "Science", title: "A neighborhood garden becomes a living classroom for local ecology", description: "Researchers and residents are recording seasonal changes in a shared garden to make environmental science more accessible.", image: "image-science", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80", text: "A neighborhood garden has become a living classroom for local ecology. Residents and researchers are recording which insects visit, when plants flower, and how soil conditions change after rain. The project gives children a direct way to observe seasonal patterns outside a laboratory. Organizers hope the growing collection of observations will help the community make better planting choices. The work also shows how small, shared spaces can support useful environmental learning." },
  { id: "sports-1", category: "Sports", title: "Community coaches are measuring progress beyond the scoreboard", description: "Youth clubs are combining performance goals with measures of confidence, teamwork, and regular participation.", image: "image-sports", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80", text: "Community coaches are measuring progress beyond the scoreboard in several youth sports clubs. Alongside match results, they are tracking attendance, teamwork, and how confidently players communicate. Coaches say the broader view gives young athletes more ways to recognize improvement. It also helps volunteers identify when a player needs encouragement rather than extra pressure. The approach is designed to keep competition meaningful while making participation welcoming." },
  { id: "world-1", category: "World", title: "Libraries in different cities share ideas for welcoming public spaces", description: "A small international exchange is helping library teams compare ways to make public reading rooms more useful to their communities.", image: "image-world", imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80", text: "Libraries in different cities are sharing ideas for making public reading rooms more welcoming. Teams are comparing flexible furniture, quiet study areas, and programs that invite residents to contribute local knowledge. The exchange is informal, but participants say the practical conversations are useful because each library works with different constraints. Several teams are testing small changes before committing to larger renovations. Their shared goal is to keep libraries accessible as community needs evolve." },
  { id: "tech-2", category: "Technology", title: "Open data lessons help students understand the systems around them", description: "A classroom project is showing how public datasets can reveal patterns in transport, energy, and everyday city life.", image: "image-tech", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", text: "Open data lessons are helping students understand the systems around them. In one classroom project, learners are using public datasets to explore transport patterns and energy use. The emphasis is on asking careful questions before making charts or conclusions. Teachers say the process connects technical skills with responsible interpretation. Students are also learning that clear explanations matter as much as accurate calculations when sharing findings." }
];

const articleGrid = document.querySelector("#article-grid");
const searchInput = document.querySelector("#site-search");
const categoryFilter = document.querySelector("#category-filter");
const emptyState = document.querySelector("#empty-state");
const articleText = document.querySelector("#article-text");
const articleUrl = document.querySelector("#article-url");
const charCounter = document.querySelector("#char-counter");
const form = document.querySelector("#summarizer-form");
const formMessage = document.querySelector("#form-message");
const loadingState = document.querySelector("#loading-state");
const outputPanel = document.querySelector("#output-panel");
const summaryResult = document.querySelector("#summary-result");
const copyButton = document.querySelector("#copy-button");
const clearButton = document.querySelector("#clear-button");
const selectedArticle = document.querySelector("#selected-article");
const selectedTitle = document.querySelector("#selected-title");
const historyPanel = document.querySelector("#history-panel");
const historyList = document.querySelector("#history-list");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
const topButton = document.querySelector("#back-to-top");
let isProcessing = false;

function renderArticles() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const matches = sampleArticles.filter((article) => {
    const matchesSearch = `${article.title} ${article.description}`.toLowerCase().includes(search);
    return matchesSearch && (category === "All" || article.category === category);
  });
  articleGrid.innerHTML = matches.map((article) => `
    <article class="article-card">
      <div class="card-image ${article.image}"><img src="${article.imageUrl}" alt="Relevant ${article.category.toLowerCase()} illustration for: ${article.title}" loading="lazy"></div>
      <div class="card-content">
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <button class="text-button summarize-sample" type="button" data-article-id="${article.id}">Summarize <span aria-hidden="true">→</span></button>
      </div>
    </article>
  `).join("");
  articleGrid.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
    });
  });
  emptyState.hidden = matches.length > 0;
}

function setMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `status-message ${type}`.trim();
}

function updateCounter() {
  charCounter.textContent = `${articleText.value.length.toLocaleString()} / 10,000 characters`;
}

function loadArticle(article) {
  articleText.value = article.text;
  selectedTitle.textContent = article.title;
  selectedArticle.hidden = false;
  outputPanel.hidden = true;
  setMessage("");
  updateCounter();
  document.querySelector("#summarizer").scrollIntoView({ behavior: "smooth" });
}

function getSummaryLength() {
  return document.querySelector('input[name="summary-length"]:checked').value;
}

function makeSummary(text, mode) {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()).filter(Boolean) || [];
  if (!sentences.length) return "";
  const words = text.toLowerCase().match(/[a-z][a-z'-]+/g) || [];
  const stopWords = new Set("a an and are as at be by for from has have in is it its of on or that the their this to was were with".split(" "));
  const frequencies = {};
  words.forEach((word) => { if (!stopWords.has(word) && word.length > 2) frequencies[word] = (frequencies[word] || 0) + 1; });
  const scored = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().match(/[a-z][a-z'-]+/g) || [];
    const frequencyScore = sentenceWords.reduce((sum, word) => sum + (frequencies[word] || 0), 0) / Math.max(sentenceWords.length, 1);
    const positionScore = index === 0 ? 1.5 : index < 3 ? 1.15 : 1;
    return { sentence, index, score: frequencyScore * positionScore };
  });
  const counts = { short: 2, medium: 4, detailed: 6 };
  const selected = scored.sort((a, b) => b.score - a.score).slice(0, Math.min(counts[mode], sentences.length)).sort((a, b) => a.index - b.index);
  return selected.map((item) => item.sentence).join(" ");
}

function saveHistory(summary) {
  const history = JSON.parse(localStorage.getItem("brieflySummaries") || "[]");
  history.unshift({ summary, date: new Date().toLocaleDateString() });
  localStorage.setItem("brieflySummaries", JSON.stringify(history.slice(0, 3)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("brieflySummaries") || "[]");
  historyPanel.hidden = history.length === 0;
  historyList.innerHTML = history.map((item) => `<li><strong>${item.date}</strong> — ${item.summary.slice(0, 120)}${item.summary.length > 120 ? "…" : ""}</li>`).join("");
}

articleGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".summarize-sample");
  if (!button) return;
  const article = sampleArticles.find((item) => item.id === button.dataset.articleId);
  if (article) loadArticle(article);
});
searchInput.addEventListener("input", renderArticles);
categoryFilter.addEventListener("change", renderArticles);
articleText.addEventListener("input", updateCounter);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isProcessing) return;
  const text = articleText.value.trim();
  if (!text) {
    setMessage(articleUrl.value.trim() ? "Automatic URL retrieval is not available in this frontend-only demonstration. Please paste the article text." : "Please enter or paste article text before summarizing.");
    articleText.focus();
    return;
  }
  if (articleText.value.length > 10000) {
    setMessage("Your article is longer than the 10,000 character limit. Please shorten it and try again.");
    return;
  }
  isProcessing = true;
  form.querySelector("#summarize-button").disabled = true;
  outputPanel.hidden = true;
  loadingState.hidden = false;
  setMessage("");
  window.setTimeout(() => {
    const summary = makeSummary(text, getSummaryLength());
    loadingState.hidden = true;
    isProcessing = false;
    form.querySelector("#summarize-button").disabled = false;
    if (!summary) {
      setMessage("The demonstration could not find enough complete sentences to summarize.");
      return;
    }
    summaryResult.textContent = summary;
    outputPanel.hidden = false;
    saveHistory(summary);
  }, 850);
});
clearButton.addEventListener("click", () => {
  articleText.value = "";
  articleUrl.value = "";
  selectedArticle.hidden = true;
  outputPanel.hidden = true;
  loadingState.hidden = true;
  isProcessing = false;
  form.querySelector("#summarize-button").disabled = false;
  setMessage("");
  updateCounter();
});
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summaryResult.textContent);
    setMessage("Summary copied to your clipboard.", "success");
  } catch {
    setMessage("Copying was not available. Please select the summary text and copy it manually.");
  }
});
document.querySelector("#clear-history").addEventListener("click", () => {
  localStorage.removeItem("brieflySummaries");
  renderHistory();
});
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open", !expanded);
});
document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });
sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", () => topButton.classList.toggle("visible", window.scrollY > 500));
topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("#today").textContent = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
document.querySelector("#today").dateTime = new Date().toISOString().slice(0, 10);
document.querySelector(".read-article").addEventListener("click", () => loadArticle(sampleArticles[0]));
renderArticles();
updateCounter();
renderHistory();
