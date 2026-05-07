import fs from "fs";
import path from "path";

export function getArticleWriteupHtml(articleId: string): string | null {
  const dir = path.join(process.cwd(), "src/content/articles");
  const single = path.join(dir, `${articleId}.html`);
  if (fs.existsSync(single)) return fs.readFileSync(single, "utf8");
  const a = path.join(dir, `${articleId}.a.html`);
  const b = path.join(dir, `${articleId}.b.html`);
  let out = "";
  if (fs.existsSync(a)) out += fs.readFileSync(a, "utf8");
  if (fs.existsSync(b)) out += fs.readFileSync(b, "utf8");
  return out || null;
}
