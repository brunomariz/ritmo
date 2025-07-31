export type Pitch = "C4" | "D4" | "E4" | "F4" | "G4" | "A4" | "B4";
export type Instrument = "repique" | "agogo";

export type Accent = "strong" | "weak" | "none";
export type Grouping = "simple" | "triplet";

export type Note = {
  pitch: Pitch;
  lengthInBeats: number;
  stop: boolean;
};
