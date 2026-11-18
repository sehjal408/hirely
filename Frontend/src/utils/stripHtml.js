export default function stripHtml(text = "") {
  if (!text || typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
