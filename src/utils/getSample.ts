import { Note } from "@/@types/rhythm";

export function getSample(note: Note): string {
  switch (note.pitch) {
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
      throw new Error(`Unknown pitch: ${note.pitch}`);
  }
}
