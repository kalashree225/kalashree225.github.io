export const sources = [
  { agent: "claude-code", platform: "win32", path: process.env.CLAUDE_SKILLS_ROOT || `${process.env.USERPROFILE}\\.agents\\skills` },
  { agent: "codex", platform: "win32", path: process.env.CODEX_SKILLS_ROOT || `${process.env.USERPROFILE}\\.codex\\skills` },
  { agent: "antigravity", platform: "win32", path: process.env.ANTIGRAVITY_SKILLS_ROOT || `${process.env.USERPROFILE}\\.antigravity\\skills` },
  { agent: "kiro", platform: "win32", path: process.env.KIRO_SKILLS_ROOT || `${process.env.USERPROFILE}\\.kiro\\skills` },
  { agent: "claude-code", platform: "linux", path: "~/.agents/skills" },
  { agent: "codex", platform: "linux", path: "~/.codex/skills" },
  { agent: "antigravity", platform: "linux", path: "~/.antigravity/skills" },
  { agent: "kiro", platform: "linux", path: "~/.kiro/skills" }
];
