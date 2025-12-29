import { promises as fs } from "fs";
import path from "path";
import PrivacyContent from "@/app/privacy/PrivacyContent";

async function loadPrivacyMarkdown() {
  const filePath = path.join(process.cwd(), "app", "privacy", "privacy.md");

  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error("Failed to read privacy policy markdown", error);
    return "# 隐私政策\n\n未能加载隐私政策内容，请稍后重试。";
  }
}

export default async function PrivacyPage() {
  const markdown = await loadPrivacyMarkdown();
  return <PrivacyContent markdown={markdown} />;
}