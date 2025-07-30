export type RepiquePitch =
  | "rimshot"
  | "head"
  | "slap"
  | "bass"
  | "roll"
  | "body";
export type Accent = "strong" | "weak" | "none";
export type Grouping = "simple" | "triplet";

export type Note = {
  pitch: string;
  duration: number;
  grouping: Grouping;
  dotted: boolean;
  accent: Accent;
};

export type RepiqueNote = Note & {
  pitch: RepiquePitch;
};

export type Stop = {
  duration: number;
};

export type RepiqueRhythmEvent = {
  type: "note" | "stop";
  event: RepiqueNote | Stop;
};
