import { Note, RepiqueNote } from "@/@types/rhythm";

export function getSamplePath(pitch: RepiqueNote["pitch"]): string {
  switch (pitch) {
    case "rimshot":
      return "sounds/rimshot.wav";
    case "head":
      return "sounds/head.wav";
    case "slap":
      return "sounds/slap.wav";
    case "bass":
      return "sounds/bass.wav";
    case "roll":
      return "sounds/roll.wav";
    case "body":
      return "sounds/body.wav";
    default:
      throw new Error(`Unknown pitch: ${pitch}`);
  }
}
