// Simulated core extraction — rule-based parsing only, no external AI API.
// Turns a free-text ride request into structured fields.

export type CoreExtraction = {
  origin: string;
  destination: string;
  day: string;
  time: string;
  notes: string;
};

const DAYS = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

export function extractRideCore(text: string): CoreExtraction {
  const lower = text.toLowerCase();

  let destination = "Not specified";
  if (lower.includes("ibero")) {
    destination = "IBERO Campus";
  } else {
    const toMatch = text.match(/\bto\s+([a-zA-ZÀ-ÿ\s]+?)(?:\s*(?:on|at|around|,|\.)|$)/i);
    if (toMatch) destination = toMatch[1].trim();
  }

  let origin = "Not specified";
  const fromMatch = text.match(/\bfrom\s+([a-zA-ZÀ-ÿ\s]+?)(?:\s*(?:on|at|around|,|\.)|$)/i);
  if (fromMatch) origin = fromMatch[1].trim();

  let day = "Not specified";
  for (const d of DAYS) {
    if (lower.includes(d)) {
      day = d.charAt(0).toUpperCase() + d.slice(1);
      break;
    }
  }
  if (day === "Not specified" && lower.includes("tuesdays")) day = "Tuesday (recurring)";

  let time = "Not specified";
  const timeMatch = text.match(/\b(\d{1,2}(:\d{2})?\s?(am|pm)?)\b/i);
  if (timeMatch) time = timeMatch[1].trim();

  let notes = "";
  if (lower.includes("split") || lower.includes("gas") || lower.includes("cost")) {
    notes = "Willing to split cost / gas.";
  }
  if (!notes) notes = "No extra notes detected.";

  return { origin, destination, day, time, notes };
}

