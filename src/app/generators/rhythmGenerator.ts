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
      duration: 0.25,
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
        duration: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        duration: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "weak",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        duration: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "bass",
        duration: 0.25,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        duration: 0.5,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "head",
        duration: 0.5,
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    },
    {
      type: "note",
      data: {
        pitch: "rimshot",
        duration: 0.5,
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

  const durations = [0.25 / 2, 0.25];

  const events: RepiqueRhythmEvent[] = [];
  for (let i = 0; i < 16; i++) {
    const pitch = pitches[Math.floor(Math.random() * pitches.length)];
    events.push({
      type: "note",
      data: {
        pitch,
        duration: durations[Math.floor(Math.random() * durations.length)],
        grouping: "simple",
        dotted: false,
        accent: "strong",
      },
    });
  }

  console.log(events);

  return events;
}

export function generateRhythmSequence(): RepiqueRhythmEvent[] {
  return generateRandomNotes();
}
