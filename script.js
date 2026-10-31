const skills = [
  ["algorithmic-art", "make", "visual", "Generative art", "Turn rules, seeds, and motion into a visual system.", "Create original seeded flow-field art in p5.js."],
  ["canvas-design", "make", "visual", "Visual artifacts", "Compose posters, artwork, and designed documents with intent.", "Design an original poster and export it as a PNG and PDF."],
  ["claude-api", "build", "agents", "Claude API", "Build integrations around Claude with provider-aware patterns.", "Show how to stream Claude responses from this TypeScript service."],
  ["cline-sdk", "build", "agents", "Agent runtime", "Design agents, sessions, tools, and deployment flows.", "Build an agent that can inspect a repo and explain its decisions."],
  ["doc-coauthoring", "write", "documents", "Documentation", "Shape specs, proposals, and decision docs with a reader in mind.", "Co-author a technical proposal for this feature with a clear decision log."],
  ["docx", "write", "documents", "Word documents", "Create and edit polished Word documents, templates, and reports.", "Create a professional Word report with headings and a table of contents."],
  ["frontend-design", "make", "frontend", "Interface craft", "Give a product a distinct visual identity instead of a component-kit finish.", "Redesign this landing page with an authored visual direction."],
  ["impeccable", "inspect", "frontend", "UI refinement", "Find and fix the small visual details that make an interface feel unfinished.", "Audit this page for spacing, hierarchy, and polish issues."],
  ["internal-comms", "write", "comms", "Internal communications", "Write clear updates, reports, FAQs, and incident communications.", "Turn these notes into a concise leadership update."],
  ["latex", "write", "documents", "Technical typesetting", "Create structured, publication-quality technical documents.", "Format this research note as a clean LaTeX report."],
  ["mcp-builder", "build", "agents", "MCP servers", "Turn an API or workflow into a clear, useful tool surface.", "Build an MCP server with read-only tools for these API operations."],
  ["pdf", "write", "documents", "PDF workflow", "Extract, transform, create, and validate PDF documents.", "Extract the tables from these PDFs and preserve column order."],
  ["pptx", "write", "documents", "Presentations", "Build narrative decks with strong layouts and speaker notes.", "Create a presentation from this outline with speaker notes."],
  ["skill-creator", "build", "agents", "Skill design", "Package repeatable expertise into a skill others can invoke.", "Create a reusable skill for this repeated repository workflow."],
  ["visual-design-studio", "make", "visual", "Art direction", "Push a UI beyond defaults with a strong visual thesis and refinement pass.", "Give this dashboard a premium visual system and accessible states."],
  ["theme-factory", "make", "visual", "Themes", "Apply a coherent theme across docs, decks, reports, and HTML.", "Apply a focused theme to this presentation and keep contrast accessible."],
  ["web-artifacts-builder", "make", "frontend", "Web artifacts", "Build rich, interactive HTML artifacts with modern frontend primitives.", "Build a responsive dashboard artifact with filters and local state."],
  ["webapp-testing", "inspect", "frontend", "Browser testing", "Test real user flows, inspect console errors, and capture evidence.", "Use Playwright to test the login flow and capture the failing console error."],
  ["web-design-guidelines", "inspect", "frontend", "UI review", "Audit a UI for accessibility, UX, and interface best practices.", "Review this UI for accessibility and Web Interface Guidelines compliance."],
  ["xlsx", "inspect", "data", "Spreadsheets", "Clean data, preserve formulas, and make spreadsheet output legible.", "Clean this spreadsheet, preserve formulas, and add a summary chart."],
  ["discernment-nudge", "inspect", "research", "Decision checks", "Stress-test assumptions before acting on a recommendation or plan.", "Give me three questions that would falsify this product decision."],
  ["find-skills", "learn", "research", "Discovery", "Find the right installed capability before you build from scratch.", "Find a skill that can help me with this workflow."],
  ["academy-guide", "learn", "research", "Learning paths", "Match Claude questions with practical training and tutorials.", "Find a practical learning path for using Claude with my team."],
  ["context-map", "learn", "research", "Context mapping", "Map the files and dependencies relevant to a multi-file change.", "Create a context map for this refactor before editing."],
  ["react19-source-patterns", "learn", "frontend", "React migration", "Reference safe source patterns for modern React APIs and ref handling.", "Find every React 19 migration pattern relevant to this component."],
  ["react19-test-patterns", "inspect", "frontend", "React testing", "Guide test migrations for act, StrictMode, and modern event patterns.", "Update these tests for React 19 and preserve behavior."],
];

const grid = document.querySelector("#skillGrid");
const categoryLabels = { build: "Build", make: "Make", write: "Write", inspect: "Inspect", learn: "Learn" };
const fieldLabels = { agents: "Agents", frontend: "Frontend", documents: "Documents", visual: "Visual", data: "Data", research: "Research", comms: "Comms" };
function render(filter = "all", field = "all") {
  const visible = skills.filter(([, family, skillField]) => (filter === "all" || family === filter) && (field === "all" || skillField === field));
  grid.innerHTML = visible.map(([name, family, skillField, title, description, prompt], index) => `
    <article class="skill-card">
      <div>
        <div class="skill-top"><span class="skill-index">${String(index + 1).padStart(2, "0")}</span><span class="skill-family">${categoryLabels[family]} / ${fieldLabels[skillField]}</span></div>
        <h3>${name}</h3>
        <p>${description}</p>
      </div>
      <div class="skill-prompt">Try: “${prompt}”</div>
    </article>
  `).join("");
}
render();
let activeCategory = "all";
let activeField = "all";
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeCategory = button.dataset.filter;
    render(activeCategory, activeField);
  });
});
document.querySelectorAll(".field-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".field-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeField = button.dataset.field;
    render(activeCategory, activeField);
  });
});
const starterPrompt = "Use the frontend-design skill to make this page feel authored, not assembled. Preserve the existing content hierarchy, keep the API unchanged, and run the relevant checks when you're done.";
document.querySelector("#copyStarter").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(starterPrompt);
    document.querySelector("#copyStatus").textContent = "Starter prompt copied to clipboard.";
  } catch {
    document.querySelector("#copyStatus").textContent = "Select the console prompt and copy it manually.";
  }
});
const typedPrompt = document.querySelector("#typedPrompt");
const prompt = "use frontend-design";
let char = 0;
function typePrompt() {
  if (char <= prompt.length) {
    typedPrompt.textContent = prompt.slice(0, char);
    char += 1;
    window.setTimeout(typePrompt, 74);
  }
}
window.setTimeout(typePrompt, 650);
