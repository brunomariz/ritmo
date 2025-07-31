import { Instrument, PitchMap } from "@/@types/rhythm";

const repiquePitchMap: PitchMap = {
  rimshot: { pitch: "C4", weight: 7, samplePath: "sounds/repique/rimshot.wav" },
  head: { pitch: "D4", weight: 7, samplePath: "sounds/repique/head.wav" },
  slap: { pitch: "E4", weight: 6, samplePath: "sounds/repique/slap.wav" },
  bass: { pitch: "F4", weight: 5, samplePath: "sounds/repique/bass.wav" },
  roll: { pitch: "G4", weight: 2, samplePath: "sounds/repique/roll.wav" },
  body: { pitch: "A4", weight: 1, samplePath: "sounds/repique/body.wav" },
};

const agogoPitchMap: PitchMap = {
  b1: { pitch: "C4", weight: 1, samplePath: "sounds/agogo/boca1.wav" },
  b2: { pitch: "D4", weight: 1, samplePath: "sounds/agogo/boca2.wav" },
  b3: { pitch: "E4", weight: 1, samplePath: "sounds/agogo/boca3.wav" },
  b4: { pitch: "F4", weight: 1, samplePath: "sounds/agogo/boca4.wav" },
};

const caixaPitchMap: PitchMap = {
  down: { pitch: "C4", weight: 2, samplePath: "sounds/caixa/down.wav" },
  up: { pitch: "D4", weight: 1, samplePath: "sounds/caixa/up.wav" },
};

// Utility function to get total weight from any pitch map
export function getTotalInstrumentWeight(pitchMap: PitchMap): number {
  return Object.values(pitchMap).reduce(
    (sum: number, item) => sum + item.weight,
    0
  );
}

export const instruments: Instrument[] = [
  {
    name: "repique",
    label: "Repique",
    pitchMap: repiquePitchMap,
  },
  {
    name: "agogo",
    label: "Agogo",
    pitchMap: agogoPitchMap,
  },
  {
    name: "caixa",
    label: "Chocalho",
    pitchMap: caixaPitchMap,
  },
];
