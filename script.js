const fieldMeta = {
  agents: {
    label: "Agents",
    verb: "Compose a dependable agent",
    description: "Move from a loose idea to a tool-aware runtime with explicit boundaries.",
    steps: ["Choose the runtime", "Define tools and permissions", "Run a trace and review side effects"],
    skills: "claude-api, cline-sdk, mcp-builder, skill-creator",
  },
  frontend: {
    label: "Frontend",
    verb: "Shape and verify an interface",
    description: "Design a point of view, build the surface, then test the real user path.",
    steps: ["Set the visual thesis", "Build the interaction", "Audit and test in a browser"],
    skills: "frontend-design, web-artifacts-builder, webapp-testing",
  },
  documents: {
    label: "Documents",
    verb: "Turn source material into a finished document",
    description: "Pick the output format early and keep structure, layout, and validation visible.",
    steps: ["Draft the structure", "Choose the delivery format", "Validate the final artifact"],
    skills: "doc-coauthoring, docx, pdf, pptx, latex",
  },
  visual: {
    label: "Visual",
    verb: "Give an idea a visual system",
    description: "Use a brief, a medium, and a deliberate constraint to avoid decoration without purpose.",
    steps: ["Write the visual brief", "Generate or compose the artifact", "Check contrast and export"],
    skills: "visual-design-studio, canvas-design, theme-factory",
  },
  data: {
    label: "Data",
    verb: "Transform data without losing trust",
    description: "Treat formulas, provenance, sensitive values, and output checks as part of the task.",
    steps: ["Inspect the source", "Transform with constraints", "Reconcile the output"],
    skills: "xlsx",
  },
  research: {
    label: "Research",
    verb: "Build an answer you can defend",
    description: "Separate discovery, evidence, learning, and assumption checks so confidence stays legible.",
    steps: ["Frame the question", "Gather and cross-check sources", "Record uncertainty and next checks"],
    skills: "find-skills, academy-guide, context-map, discernment-nudge",
  },
  comms: {
    label: "Comms",
    verb: "Make the next action obvious",
    description: "Match message, audience, channel, urgency, and owner before polishing the prose.",
    steps: ["Name the audience", "State the situation", "End with owner and next step"],
    skills: "internal-comms",
  },
};

const skills = [
  { name: "algorithmic-art", family: "make", field: "visual", title: "Generative art", description: "Turn rules, seeds, and motion into a visual system.", prompt: "Create original seeded flow-field art in p5.js.", inputs: "Brief, seed, medium", outputs: "Interactive artwork", sideEffects: "Creates files", use: ["Generative visual systems", "Seeded exploration", "Interactive studies"] },
  { name: "canvas-design", family: "make", field: "visual", title: "Visual artifacts", description: "Compose posters, artwork, and designed documents with intent.", prompt: "Design an original poster and export it as a PNG and PDF.", inputs: "Brief, dimensions, references", outputs: "PNG / PDF / artwork", sideEffects: "Creates files", use: ["Posters and print pieces", "Original artwork", "Designed documents"] },
  { name: "claude-api", family: "build", field: "agents", title: "Claude API", description: "Build integrations around Claude with provider-aware patterns.", prompt: "Show how to stream Claude responses from this TypeScript service.", inputs: "API shape, runtime, constraints", outputs: "Integration code", sideEffects: "May use credentials", use: ["Provider integrations", "Streaming responses", "Typed service clients"] },
  { name: "cline-sdk", family: "build", field: "agents", title: "Agent runtime", description: "Design agents, sessions, tools, and deployment flows.", prompt: "Build an agent that can inspect a repo and explain its decisions.", inputs: "Goal, tools, guardrails", outputs: "Agent runtime", sideEffects: "May execute tools", use: ["Agent sessions", "Tool orchestration", "Deployment flows"] },
  { name: "doc-coauthoring", family: "write", field: "documents", title: "Documentation", description: "Shape specs, proposals, and decision docs with a reader in mind.", prompt: "Co-author a technical proposal for this feature with a clear decision log.", inputs: "Audience, source notes", outputs: "Structured document", sideEffects: "Creates files", use: ["Specs and proposals", "Decision records", "Reader-focused docs"] },
  { name: "docx", family: "write", field: "documents", title: "Word documents", description: "Create and edit polished Word documents, templates, and reports.", prompt: "Create a professional Word report with headings and a table of contents.", inputs: "Content, template, layout", outputs: "DOCX", sideEffects: "Creates files", use: ["Reports", "Templates", "Polished Word output"] },
  { name: "frontend-design", family: "make", field: "frontend", title: "Interface craft", description: "Give a product a distinct visual identity instead of a component-kit finish.", prompt: "Redesign this landing page with an authored visual direction.", inputs: "Brief, audience, constraints", outputs: "HTML / CSS / UI direction", sideEffects: "Edits source files", use: ["New interface direction", "Landing pages", "Visual system work"] },
  { name: "impeccable", family: "inspect", field: "frontend", title: "UI refinement", description: "Find and fix the small visual details that make an interface feel unfinished.", prompt: "Audit this page for spacing, hierarchy, and polish issues.", inputs: "Existing UI, target quality", outputs: "Refined UI and findings", sideEffects: "Edits source files", use: ["Polish passes", "Visual QA", "Hierarchy repairs"] },
  { name: "internal-comms", family: "write", field: "comms", title: "Internal communications", description: "Write clear updates, reports, FAQs, and incident communications.", prompt: "Turn these notes into a concise leadership update.", inputs: "Audience, facts, urgency", outputs: "Message draft", sideEffects: "None by default", use: ["Leadership updates", "Incident notes", "FAQs and announcements"] },
  { name: "latex", family: "write", field: "documents", title: "Technical typesetting", description: "Create structured, publication-quality technical documents.", prompt: "Format this research note as a clean LaTeX report.", inputs: "Source, template, citations", outputs: "TEX / PDF", sideEffects: "May run a compiler", use: ["Research reports", "Technical papers", "Publication layouts"] },
  { name: "mcp-builder", family: "build", field: "agents", title: "MCP servers", description: "Turn an API or workflow into a clear, useful tool surface.", prompt: "Build an MCP server with read-only tools for these API operations.", inputs: "API, auth model, operations", outputs: "MCP server", sideEffects: "May expose tools", use: ["Tool surfaces", "API adapters", "Read-only integrations"] },
  { name: "pdf", family: "write", field: "documents", title: "PDF workflow", description: "Extract, transform, create, and validate PDF documents.", prompt: "Extract the tables from these PDFs and preserve column order.", inputs: "PDFs, target structure", outputs: "PDF / extracted data", sideEffects: "Creates files", use: ["Extraction", "Forms and reports", "PDF validation"] },
  { name: "pptx", family: "write", field: "documents", title: "Presentations", description: "Build narrative decks with strong layouts and speaker notes.", prompt: "Create a presentation from this outline with speaker notes.", inputs: "Outline, audience, template", outputs: "PPTX", sideEffects: "Creates files", use: ["Narrative decks", "Speaker notes", "Presentation systems"] },
  { name: "skill-creator", family: "build", field: "agents", title: "Skill design", description: "Package repeatable expertise into a skill others can invoke.", prompt: "Create a reusable skill for this repeated repository workflow.", inputs: "Workflow, examples, limits", outputs: "SKILL.md and resources", sideEffects: "Creates skill files", use: ["Reusable workflows", "Team enablement", "Skill packaging"] },
  { name: "visual-design-studio", family: "make", field: "visual", title: "Art direction", description: "Push a UI beyond defaults with a strong visual thesis and refinement pass.", prompt: "Give this dashboard a premium visual system and accessible states.", inputs: "Brand, audience, medium", outputs: "Design direction", sideEffects: "May edit UI", use: ["Premium UI direction", "Brand expression", "Motion and hierarchy"] },
  { name: "theme-factory", family: "make", field: "visual", title: "Themes", description: "Apply a coherent theme across docs, decks, reports, and HTML.", prompt: "Apply a focused theme to this presentation and keep contrast accessible.", inputs: "Artifact, mood, palette", outputs: "Themed artifact", sideEffects: "Edits artifact", use: ["Cross-format themes", "Brand systems", "Accessible palettes"] },
  { name: "web-artifacts-builder", family: "make", field: "frontend", title: "Web artifacts", description: "Build rich, interactive HTML artifacts with modern frontend primitives.", prompt: "Build a responsive dashboard artifact with filters and local state.", inputs: "Interaction model, content", outputs: "Interactive HTML", sideEffects: "Creates files", use: ["Dashboards", "Interactive prototypes", "Stateful artifacts"] },
  { name: "webapp-testing", family: "inspect", field: "frontend", title: "Browser testing", description: "Test real user flows, inspect console errors, and capture evidence.", prompt: "Use Playwright to test the login flow and capture the failing console error.", inputs: "URL, flow, assertions", outputs: "Test evidence", sideEffects: "Runs browser", use: ["Smoke tests", "Regression checks", "Evidence capture"] },
  { name: "web-design-guidelines", family: "inspect", field: "frontend", title: "UI review", description: "Audit a UI for accessibility, UX, and interface best practices.", prompt: "Review this UI for accessibility and Web Interface Guidelines compliance.", inputs: "UI source or URL", outputs: "Review findings", sideEffects: "None by default", use: ["Accessibility review", "UX audit", "Guidelines checks"] },
  { name: "xlsx", family: "inspect", field: "data", title: "Spreadsheets", description: "Clean data, preserve formulas, and make spreadsheet output legible.", prompt: "Clean this spreadsheet, preserve formulas, and add a summary chart.", inputs: "Workbook, transformation rules", outputs: "XLSX with validation", sideEffects: "Edits workbook", use: ["Cleaning", "Formula-safe edits", "Charts and summaries"] },
  { name: "discernment-nudge", family: "inspect", field: "research", title: "Decision checks", description: "Stress-test assumptions before acting on a recommendation or plan.", prompt: "Give me three questions that would falsify this product decision.", inputs: "Decision, assumptions", outputs: "Challenge questions", sideEffects: "None by default", use: ["Decision review", "Assumption checks", "Risk discovery"] },
  { name: "find-skills", family: "learn", field: "research", title: "Discovery", description: "Find the right installed capability before you build from scratch.", prompt: "Find a skill that can help me with this workflow.", inputs: "Task description", outputs: "Skill recommendations", sideEffects: "None by default", use: ["Capability discovery", "Workflow routing", "Avoiding duplicate work"] },
  { name: "academy-guide", family: "learn", field: "research", title: "Learning paths", description: "Match Claude questions with practical training and tutorials.", prompt: "Find a practical learning path for using Claude with my team.", inputs: "Goal, experience, audience", outputs: "Learning path", sideEffects: "May use current web", use: ["Onboarding", "Team learning", "Product education"] },
  { name: "context-map", family: "learn", field: "research", title: "Context mapping", description: "Map the files and dependencies relevant to a multi-file change.", prompt: "Create a context map for this refactor before editing.", inputs: "Repo, change request", outputs: "Relevant file map", sideEffects: "Reads repository", use: ["Refactor preparation", "Dependency mapping", "Safe scoping"] },
  { name: "react19-source-patterns", family: "learn", field: "frontend", title: "React migration", description: "Reference safe source patterns for modern React APIs and ref handling.", prompt: "Find every React 19 migration pattern relevant to this component.", inputs: "React source, target version", outputs: "Migration guidance", sideEffects: "Reads source", use: ["React 19 upgrades", "API migrations", "Ref patterns"] },
  { name: "react19-test-patterns", family: "inspect", field: "frontend", title: "React testing", description: "Guide test migrations for act, StrictMode, and modern event patterns.", prompt: "Update these tests for React 19 and preserve behavior.", inputs: "Tests, version, failures", outputs: "Updated tests", sideEffects: "Edits test files", use: ["Test migration", "StrictMode changes", "Modern event patterns"] },
];

const grid = document.querySelector("#skillGrid");
const emptyState = document.querySelector("#emptyState");
const resultStatus = document.querySelector("#resultStatus");
const searchInput = document.querySelector("#skillSearch");
const categoryLabels = { build: "Build", make: "Make", write: "Write", inspect: "Inspect", learn: "Learn" };
const fieldLabels = Object.fromEntries(Object.entries(fieldMeta).map(([key, value]) => [key, value.label]));
const fieldRoutes = {
  agents: ["claude-api", "mcp-builder", "cline-sdk"],
  frontend: ["frontend-design", "web-artifacts-builder", "webapp-testing"],
  documents: ["doc-coauthoring", "docx", "pdf"],
  visual: ["visual-design-studio", "canvas-design", "theme-factory"],
  data: ["xlsx"],
  research: ["find-skills", "context-map", "discernment-nudge"],
  comms: ["internal-comms"],
};
let activeCategory = "all";
let activeField = "all";
let selectedSkill = null;

function copyText(value, button, original = button.textContent) {
  navigator.clipboard.writeText(value).then(() => {
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = original; }, 1200);
  }).catch(() => { button.textContent = "Copy unavailable"; });
}

function updateUrl() {
  const params = new URLSearchParams();
  if (activeCategory !== "all") params.set("family", activeCategory);
  if (activeField !== "all") params.set("field", activeField);
  if (searchInput.value.trim()) params.set("q", searchInput.value.trim());
  const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", next);
}

function render(filter = activeCategory, field = activeField, search = searchInput.value) {
  const query = search.trim().toLowerCase();
  const visible = skills.filter((skill) => {
    const matchesFilters = (filter === "all" || skill.family === filter) && (field === "all" || skill.field === field);
    const searchable = `${skill.name} ${skill.title} ${skill.description} ${skill.prompt} ${skill.field}`.toLowerCase();
    return matchesFilters && (!query || searchable.includes(query));
  });
  grid.innerHTML = visible.map((skill, index) => `
    <article class="skill-card field-${skill.field}" data-skill="${skill.name}">
      <div>
        <div class="skill-top"><span class="skill-index">${String(index + 1).padStart(2, "0")}</span><span class="skill-family">${categoryLabels[skill.family]} / ${fieldLabels[skill.field]}</span></div>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
      </div>
      <div class="skill-prompt">Try: “${skill.prompt}”</div>
      <div class="skill-card-footer">
        <div class="skill-commands">
          <button class="command-button" data-copy="/${skill.name}" type="button">Use /${skill.name}</button>
          <button class="command-button" data-copy=".\\install-skill.ps1 -SkillName ${skill.name}" type="button">Install bridge</button>
        </div>
        <button class="inspect-button" data-inspect="${skill.name}" type="button">Inspect skill <span>↗</span></button>
      </div>
    </article>
  `).join("");
  resultStatus.textContent = `${visible.length} ${visible.length === 1 ? "skill" : "skills"} in view`;
  emptyState.hidden = visible.length > 0;
  grid.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", () => copyText(button.dataset.copy, button)));
  grid.querySelectorAll("[data-inspect]").forEach((button) => button.addEventListener("click", () => openSkill(button.dataset.inspect)));
  updateUrl();
}

function renderWorkflows() {
  document.querySelector("#workflowGrid").innerHTML = Object.entries(fieldMeta).map(([key, field]) => `
    <article class="workflow-card" data-workflow-field="${key}">
      <div class="workflow-card-top"><span class="workflow-symbol">${key.slice(0, 2)}</span><span>${field.skills}</span></div>
      <h3>${field.verb}</h3>
      <p>${field.description}</p>
      <ol>${field.steps.map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${step}</li>`).join("")}</ol>
      <button class="workflow-link" data-workflow="${key}" type="button">Open ${field.label} field <span>↘</span></button>
    </article>
  `).join("");
  document.querySelectorAll("[data-workflow]").forEach((button) => button.addEventListener("click", () => {
    activeField = button.dataset.workflow;
    document.querySelectorAll(".field-button").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.field === activeField);
      item.setAttribute("aria-pressed", item.dataset.field === activeField);
    });
    document.querySelector("#gallery").scrollIntoView({ behavior: "smooth", block: "start" });
    render();
  }));
}

function renderWorkbench(field = document.querySelector("#workbenchField").value) {
  const route = fieldRoutes[field] || [];
  const constraint = document.querySelector("#workbenchConstraint").value.trim() || "Keep the work legible and show your checks.";
  const routeText = route.join(" → ");
  const label = fieldLabels[field] || "selected field";
  document.querySelector("#workbenchRoute").textContent = routeText;
  document.querySelector("#workbenchPrompt").textContent = `Use ${route[0] || "the right skill"} to start this ${label.toLowerCase()} task. Then route the work through ${route.slice(1).join(" and ") || "a verification pass"}. ${constraint}`;
}

function openSkill(name) {
  selectedSkill = skills.find((skill) => skill.name === name);
  if (!selectedSkill) return;
  document.querySelector("#dialogMeta").textContent = `${categoryLabels[selectedSkill.family]} / ${fieldLabels[selectedSkill.field]} / installed catalogue`;
  document.querySelector("#dialogTitle").textContent = selectedSkill.name;
  document.querySelector("#dialogDescription").textContent = selectedSkill.description;
  document.querySelector("#dialogUse").innerHTML = selectedSkill.use.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#dialogContract").innerHTML = `
    <div><dt>Inputs</dt><dd>${selectedSkill.inputs}</dd></div>
    <div><dt>Outputs</dt><dd>${selectedSkill.outputs}</dd></div>
    <div><dt>Side effects</dt><dd>${selectedSkill.sideEffects}</dd></div>
  `;
  document.querySelector("#dialogPrompt").textContent = selectedSkill.prompt;
  document.querySelector("#skillDialog").showModal();
}

document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
  activeCategory = button.dataset.filter;
  document.querySelectorAll(".filter-button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
    item.setAttribute("aria-pressed", item === button);
  });
  render();
}));

document.querySelectorAll(".field-button").forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("is-active"));
  button.addEventListener("click", () => {
    activeField = button.dataset.field;
    document.querySelectorAll(".field-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", item === button);
    });
    render();
  });
});

searchInput.addEventListener("input", () => render());
document.querySelector("#dialogClose").addEventListener("click", () => document.querySelector("#skillDialog").close());
document.querySelector("#skillDialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.querySelector("#dialogCopy").addEventListener("click", (event) => copyText(selectedSkill?.prompt || "", event.currentTarget));
document.querySelector("#dialogInvoke").addEventListener("click", (event) => copyText(`/${selectedSkill?.name || ""}`, event.currentTarget, "Copy slash command"));
document.querySelector("#dialogInstall").addEventListener("click", (event) => copyText(`.\\install-skill.ps1 -SkillName ${selectedSkill?.name || ""}`, event.currentTarget, "Copy bridge command"));
document.querySelector("#workbenchField").addEventListener("change", (event) => renderWorkbench(event.target.value));
document.querySelector("#workbenchConstraint").addEventListener("input", () => renderWorkbench());
document.querySelector("#copyWorkbench").addEventListener("click", (event) => copyText(document.querySelector("#workbenchPrompt").textContent, event.currentTarget));
document.querySelectorAll("[data-exhibit-field]").forEach((tile) => tile.addEventListener("click", () => {
  activeField = tile.dataset.exhibitField;
  document.querySelectorAll(".field-button").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.field === activeField);
    item.setAttribute("aria-pressed", item.dataset.field === activeField);
  });
  document.querySelector("#gallery").scrollIntoView({ behavior: "smooth", block: "start" });
  render();
}));

const starterPrompt = "Use the frontend-design skill to make this page feel authored, not assembled. Preserve the existing content hierarchy, keep the API unchanged, and run the relevant checks when you're done.";
document.querySelector("#copyStarter").addEventListener("click", (event) => copyText(starterPrompt, event.currentTarget, "Copy a starter prompt ⌘"));

const params = new URLSearchParams(window.location.search);
activeCategory = categoryLabels[params.get("family")] ? params.get("family") : "all";
activeField = fieldMeta[params.get("field")] ? params.get("field") : "all";
searchInput.value = params.get("q") || "";
document.querySelectorAll(".filter-button").forEach((button) => {
  button.classList.toggle("is-active", button.dataset.filter === activeCategory);
  button.setAttribute("aria-pressed", button.dataset.filter === activeCategory);
});
document.querySelectorAll(".field-button").forEach((button) => {
  button.classList.toggle("is-active", button.dataset.field === activeField);
  button.setAttribute("aria-pressed", button.dataset.field === activeField);
});

renderWorkflows();
renderWorkbench();
render();

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
