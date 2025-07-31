import { Note, Pitch } from "@/@types/rhythm";
import { repiquePitchMap } from "@/constants/pitchMap";

export function getSamplePath(pitch: Pitch): string {
  switch (pitch) {
    case repiquePitchMap.rimshot:
      return "sounds/repique/rimshot.wav";
    case repiquePitchMap.head:
      return "sounds/repique/head.wav";
    case repiquePitchMap.slap:
      return "sounds/repique/slap.wav";
    case repiquePitchMap.bass:
      return "sounds/repique/bass.wav";
    case repiquePitchMap.roll:
      return "sounds/repique/roll.wav";
    case repiquePitchMap.body:
      return "sounds/repique/body.wav";
    default:
      throw new Error(`Unknown pitch: ${pitch}`);
  }
}
