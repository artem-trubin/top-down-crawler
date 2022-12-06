import { DEBUG_MODE } from "./globals.js";

export function msg(text) {
  if (DEBUG_MODE) console.log(text)
}
