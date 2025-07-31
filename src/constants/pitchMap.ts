import { Pitch } from "@/@types/rhythm";

type RepiquePitches = "rimshot" | "head" | "slap" | "bass" | "roll" | "body";

export const repiquePitchMap: Record<RepiquePitches, Pitch> = {
  rimshot: "C4",
  head: "D4",
  slap: "E4",
  bass: "F4",
  roll: "G4",
  body: "A4",
};
