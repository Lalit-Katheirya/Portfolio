export type SkillIcon = {
  label: string;
  displayLabel?: string;
  slug: string;
  variant?: "original" | "plain";
  /** Override when devicon default path is missing */
  iconSrc?: string;
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9+.#]/g, "");

const iconByKey: Record<string, SkillIcon> = {
  angular: { label: "Angular", slug: "angular", variant: "original" },
  angular13: { label: "Angular", slug: "angular", variant: "original" },
  angular18: { label: "Angular", slug: "angular", variant: "original" },
  angular15: { label: "Angular", slug: "angular", variant: "original" },
  angularjs: { label: "Angular", slug: "angular", variant: "original" },
  react: { label: "React", slug: "react", variant: "original" },
  reactjs: { label: "React", slug: "react", variant: "original" },
  nextjs: { label: "Next.js", slug: "nextjs", variant: "original" },
  javascript: { label: "JavaScript", slug: "javascript", variant: "original" },
  typescript: { label: "TypeScript", slug: "typescript", variant: "original" },
  tailwindcss: {
    label: "Tailwind",
    displayLabel: "tailwindcss",
    slug: "tailwindcss",
    variant: "original",
  },
  bootstrap: { label: "Bootstrap", slug: "bootstrap", variant: "original" },
  html: { label: "HTML5", slug: "html5", variant: "original" },
  css: { label: "CSS3", slug: "css3", variant: "original" },
  scss: { label: "Sass", slug: "sass", variant: "original" },
  ionic: { label: "Ionic", slug: "ionic", variant: "original" },
  nodejs: { label: "Node.js", slug: "nodejs", variant: "original" },
  expressjs: { label: "Express", slug: "express", variant: "original" },
  firebase: { label: "Firebase", slug: "firebase", variant: "plain" },
  mongodb: { label: "MongoDB", slug: "mongodb", variant: "original" },
  postgresql: { label: "PostgreSQL", slug: "postgresql", variant: "original" },
  docker: { label: "Docker", slug: "docker", variant: "original" },
  github: { label: "GitHub", slug: "github", variant: "original" },
  gitlab: { label: "GitLab", slug: "gitlab", variant: "original" },
  figma: { label: "Figma", slug: "figma", variant: "original" },
  redux: { label: "Redux", slug: "redux", variant: "original" },
  aws: {
    label: "AWS",
    slug: "amazonwebservices",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  amazonwebservices: {
    label: "AWS",
    slug: "amazonwebservices",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  materialui: { label: "Material UI", slug: "materialui", variant: "original" },
  rxjs: { label: "RxJS", slug: "rxjs", variant: "original" },
  ngrx: { label: "NgRx", slug: "ngrx", variant: "plain" },
  postman: { label: "Postman", slug: "postman", variant: "original" },
  cypress: { label: "Cypress", displayLabel: "cypress", slug: "cypress", variant: "plain" },
  vercel: { label: "Vercel", displayLabel: "Vercel", slug: "vercel", variant: "original" },
  git: { label: "Git", displayLabel: "git", slug: "git", variant: "original" },
  astro: { label: "Astro", slug: "astro", variant: "plain" },
  zustand: { label: "Zustand", slug: "redux", variant: "original" },
  jira: { label: "Jira", slug: "jira", variant: "original" },
  clickup: { label: "ClickUp", slug: "clickup", variant: "plain" },
  sql: { label: "SQL", slug: "mysql", variant: "original" },
  restapis: { label: "REST", slug: "fastapi", variant: "plain" },
  restapi: { label: "REST", slug: "fastapi", variant: "plain" },
  githubactions: { label: "GitHub Actions", slug: "githubactions", variant: "original" },
  gitlabci: { label: "GitLab CI", slug: "gitlab", variant: "original" },
  openai: { label: "OpenAI", slug: "openai", variant: "plain" },
  openaiapi: { label: "OpenAI", slug: "openai", variant: "plain" },
  gemini: { label: "Gemini", slug: "google", variant: "plain" },
  geminiapi: { label: "Gemini", slug: "google", variant: "plain" },
  langchain: { label: "LangChain", slug: "python", variant: "original" },
  claude: { label: "Claude", slug: "anthropic", variant: "plain" },
  cursorai: { label: "Cursor", slug: "vscode", variant: "original" },
  mcpintegration: { label: "MCP", slug: "docker", variant: "original" },
  codeium: { label: "Codeium", slug: "vscode", variant: "original" },
  codex: { label: "Codex", slug: "openai", variant: "plain" },
  problemsolving: { label: "Problem Solving", slug: "stackoverflow", variant: "plain" },
  teamcollaboration: { label: "Collaboration", slug: "slack", variant: "plain" },
  adaptability: { label: "Adaptability", slug: "react", variant: "original" },
  communication: { label: "Communication", slug: "slack", variant: "plain" },
  timemanagement: { label: "Time Management", slug: "trello", variant: "plain" },
  cicd: { label: "CI/CD", slug: "githubactions", variant: "original" },
  buildreleasemanagement: { label: "Release", slug: "jenkins", variant: "plain" },
};

export const resolveSkillIcon = (skill: string): SkillIcon | null => {
  const key = normalize(skill);
  if (iconByKey[key]) return iconByKey[key];

  const partial = Object.entries(iconByKey).find(([entryKey]) =>
    key.includes(entryKey)
  );
  return partial ? partial[1] : null;
};

const DEVICON_VERSION = "v2.17.0";

export const iconUrl = (icon: SkillIcon) =>
  icon.iconSrc ??
  `https://cdn.jsdelivr.net/gh/devicons/devicon@${DEVICON_VERSION}/icons/${icon.slug}/${icon.slug}-${icon.variant ?? "original"}.svg`;

export const buildCarouselSkills = (skills: string[]): SkillIcon[] => {
  const seen = new Set<string>();
  const result: SkillIcon[] = [];

  for (const skill of skills) {
    const icon = resolveSkillIcon(skill);
    if (!icon || seen.has(icon.slug)) continue;
    seen.add(icon.slug);
    result.push(icon);
  }

  return result;
};
