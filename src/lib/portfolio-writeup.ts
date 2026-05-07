import fs from "fs";
import path from "path";

export function getPortfolioWriteupHtml(projectId: string): string | null {
  const filePath = path.join(process.cwd(), "src/content/portfolio", `${projectId}.html`);
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}
