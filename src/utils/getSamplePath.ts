import { Note, RepiqueNote } from "@/@types/rhythm";

export function getSamplePath(pitch: RepiqueNote["pitch"]): string {
  switch (pitch) {
    case "rimshot":
      return "sounds/repique/rimshot.wav";
    case "head":
      return "sounds/repique/head.wav";
    case "slap":
      return "sounds/repique/slap.wav";
    case "bass":
      return "sounds/repique/bass.wav";
    case "roll":
      return "sounds/repique/roll.wav";
    case "body":
      return "sounds/repique/body.wav";
    default:
      throw new Error(`Unknown pitch: ${pitch}`);
  }
}
