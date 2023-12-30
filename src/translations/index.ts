import cs from "./cs.json";
import en from "./en.json";

export function getMessages(locale: string): Record<string, string> {
  switch (locale) {
    case "cs":
      return cs;
    default:
      return en;
  }
}
