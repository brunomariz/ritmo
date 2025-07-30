import { log } from "console";
import type {
  Note,
  RepiqueNote,
  RepiqueRhythmEvent,
} from "../../@types/rhythm.js";

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

export function generateRandomNotes(): RepiqueRhythmEvent[] {
  const pitches: RepiqueNote["pitch"][] = [
    "head",
    "rimshot",
    "slap",
    "bass",
    "roll",
    "body",
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
  const totalWeight = durations.reduce((sum, d) => sum + d.weight, 0);
  const cumSum: number[] = [];
  for (const d of durations) {
    cumSum.push((cumSum[cumSum.length - 1] || 0) + d.weight);
  }

  const events: RepiqueRhythmEvent[] = [];
  for (let i = 0; i < 16; i++) {
    // Select a random pitch and duration based on the cumulative sum
    const pitch = pitches[Math.floor(Math.random() * pitches.length)];
    const r = Math.random() * totalWeight;
    const selectedDurationIndex = cumSum.findIndex((sum) => sum >= r);

    events.push({
      type: "note",
      data: {
        pitch,
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
  return generateRandomNotes();
}
