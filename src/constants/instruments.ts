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

const chocalhoPitchMap: PitchMap = {
  frente: { pitch: "C4", weight: 1, samplePath: "sounds/chocalho/frente.wav" },
  tras: { pitch: "D4", weight: 1, samplePath: "sounds/chocalho/tras.wav" },
};

const marcacaoPitchMap: PitchMap = {
  primeira: {
    pitch: "C4",
    weight: 1,
    samplePath: "sounds/marcacao/primeira.wav",
  },
  segunda: {
    pitch: "D4",
    weight: 1,
    samplePath: "sounds/marcacao/segunda.wav",
  },
};

const terceiraPitchMap: PitchMap = {
  solto: { pitch: "C4", weight: 4, samplePath: "sounds/terceira/solto.wav" },
  preso: { pitch: "D4", weight: 3, samplePath: "sounds/terceira/preso.wav" },
  mao: { pitch: "E4", weight: 1, samplePath: "sounds/terceira/mao.wav" },
};

const tamborimPitchMap: PitchMap = {
  frente: { pitch: "C4", weight: 4, samplePath: "sounds/tamborim/frente.wav" },
  tras: { pitch: "D4", weight: 3, samplePath: "sounds/tamborim/tras.wav" },
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
    label: "Caixa",
    pitchMap: caixaPitchMap,
  },
  {
    name: "chocalho",
    label: "Chocalho",
    pitchMap: chocalhoPitchMap,
  },
  {
    name: "marcacao",
    label: "Marcação",
    pitchMap: marcacaoPitchMap,
  },
  {
    name: "terceira",
    label: "Terceira",
    pitchMap: terceiraPitchMap,
  },
  {
    name: "tamborim",
    label: "Tamborim",
    pitchMap: tamborimPitchMap,
  },
];
