import { Instrument, Pitch } from "@/@types/rhythm";
import { agogoPitchMap, repiquePitchMap } from "@/constants/pitchMap";

export function getSamplePath(pitch: Pitch, instrument: Instrument): string {
  if (instrument == "repique") {
    switch (pitch) {
      case repiquePitchMap.rimshot.pitch:
        return "sounds/repique/rimshot.wav";
      case repiquePitchMap.head.pitch:
        return "sounds/repique/head.wav";
      case repiquePitchMap.slap.pitch:
        return "sounds/repique/slap.wav";
      case repiquePitchMap.bass.pitch:
        return "sounds/repique/bass.wav";
      case repiquePitchMap.roll.pitch:
        return "sounds/repique/roll.wav";
      case repiquePitchMap.body.pitch:
        return "sounds/repique/body.wav";
      default:
        throw new Error(`Unknown pitch: ${pitch}, ${instrument}`);
    }
  } else if (instrument == "agogo") {
    switch (pitch) {
      case agogoPitchMap.b1.pitch:
        return "sounds/agogo/boca1.wav";
      case agogoPitchMap.b2.pitch:
        return "sounds/agogo/boca2.wav";
      case agogoPitchMap.b3.pitch:
        return "sounds/agogo/boca3.wav";
      case agogoPitchMap.b4.pitch:
        return "sounds/agogo/boca4.wav";
      default:
        throw new Error(`Unknown pitch: ${pitch}, ${instrument}`);
    }
  } else throw new Error(`Unknown instrument: ${instrument}`);
}
