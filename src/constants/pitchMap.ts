import { Instrument, Pitch } from "@/@types/rhythm";

type RepiquePitches = "rimshot" | "head" | "slap" | "bass" | "roll" | "body";
type AgogoPitches = "b1" | "b2" | "b3" | "b4";

interface WeightedPitch {
  pitch: Pitch;
  weight: number;
}

// Generic type for pitch maps with weights
type WeightedPitchMap<T extends string> = Record<T, WeightedPitch>;

// Union type that encompasses both pitch map structures
export type InstrumentPitchMap =
  | WeightedPitchMap<RepiquePitches>
  | WeightedPitchMap<AgogoPitches>;

export const repiquePitchMap: WeightedPitchMap<RepiquePitches> = {
  rimshot: { pitch: "C4", weight: 7 },
  head: { pitch: "D4", weight: 7 },
  slap: { pitch: "E4", weight: 6 },
  bass: { pitch: "F4", weight: 5 },
  roll: { pitch: "G4", weight: 2 },
  body: { pitch: "A4", weight: 1 },
};

export const agogoPitchMap: WeightedPitchMap<AgogoPitches> = {
  b1: { pitch: "C4", weight: 1 },
  b2: { pitch: "D4", weight: 1 },
  b3: { pitch: "E4", weight: 1 },
  b4: { pitch: "F4", weight: 1 },
};

// Utility function to get total weight from any pitch map
export function getTotalWeight<T extends string>(
  pitchMap: WeightedPitchMap<T>
): number {
  return Object.values(pitchMap).reduce(
    (sum: number, item) => sum + (item as WeightedPitch).weight,
    0
  );
}

export function getPitchMapFromInstrument(instrument: Instrument) {
  if (instrument == "repique") {
    return repiquePitchMap;
  } else if (instrument == "agogo") {
    return agogoPitchMap;
  } else throw new Error(`Instrument not found: ${instrument}`);
}
