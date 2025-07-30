import { log } from "console";
import type {
  Note,
  RepiqueNote,
  RepiqueRhythmEvent,
} from "../@types/rhythm.js";

function createBasicEvents(): RepiqueRhythmEvent[] {
  const pitches: Note["pitch"][] = [
    "head",
    "rimshot",
    "rimshot",
    "slap",
    "head",
    "rimshot",
    "rimshot",
    "bass",
  ];

  return pitches.map((pitch) => ({
    type: "note",
    data: {
      pitch,
      lengthInBeats: 0.25,
      grouping: "simple",
      dotted: false,
      accent: "strong",
    },
  }));
}

export function generateViradaDeDois(): RepiqueRhythmEvent[] {
  const events = createBasicEvents();

  return [
    ...events,
    ...events,
    {
      type: "note",
      data: {
        pitch: "head",
        lengthInBeats: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        lengthInBeats: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "weak",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        lengthInBeats: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "bass",
        lengthInBeats: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        lengthInBeats: 0.5,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "head",
        lengthInBeats: 0.5,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        lengthInBeats: 0.5,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
  ];
}

export function generateRandomNotesWeighted(): RepiqueRhythmEvent[] {
  const pitches = [
    { pitch: "head" as RepiqueNote["pitch"], weight: 7 },
    { pitch: "rimshot" as RepiqueNote["pitch"], weight: 7 },
    { pitch: "bass" as RepiqueNote["pitch"], weight: 6 },
    { pitch: "slap" as RepiqueNote["pitch"], weight: 5 },
    { pitch: "roll" as RepiqueNote["pitch"], weight: 2 },
    { pitch: "body" as RepiqueNote["pitch"], weight: 1 },
  ];

  const durations = [
    { lengthInBeats: 4, weight: 0 },
    { lengthInBeats: 2, weight: 0 },
    { lengthInBeats: 1, weight: 1 },
    { lengthInBeats: 0.5, weight: 2 },
    { lengthInBeats: 0.25, weight: 8 },
    { lengthInBeats: 0.125, weight: 0 },
    { lengthInBeats: 0.0625, weight: 0 },
  ];

  // Calculate cumulative sums for pitches
  const totalPitchWeight = pitches.reduce((sum, p) => sum + p.weight, 0);
  const pitchCumSum: number[] = [];
  for (const p of pitches) {
    pitchCumSum.push((pitchCumSum[pitchCumSum.length - 1] || 0) + p.weight);
  }

  // Calculate cumulative sums for durations
  const totalDurationWeight = durations.reduce((sum, d) => sum + d.weight, 0);
  const durationCumSum: number[] = [];
  for (const d of durations) {
    durationCumSum.push(
      (durationCumSum[durationCumSum.length - 1] || 0) + d.weight
    );
  }

  const events: RepiqueRhythmEvent[] = [];
  for (let i = 0; i < 16; i++) {
    // Select a random pitch based on weights
    const pitchRandom = Math.random() * totalPitchWeight;
    const selectedPitchIndex = pitchCumSum.findIndex(
      (sum) => sum >= pitchRandom
    );
    const selectedPitch = pitches[selectedPitchIndex].pitch;

    // Select a random duration based on weights
    const durationRandom = Math.random() * totalDurationWeight;
    const selectedDurationIndex = durationCumSum.findIndex(
      (sum) => sum >= durationRandom
    );

    events.push({
      type: "note",
      data: {
        pitch: selectedPitch,
        lengthInBeats: durations[selectedDurationIndex].lengthInBeats,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    });
  }

  return events;
}

export function generateRhythmSequence(): RepiqueRhythmEvent[] {
  return generateRandomNotesWeighted();
}
