import { log } from "console";
import type { Note, Pitch } from "../@types/rhythm.js";
import { repiquePitchMap } from "@/constants/pitchMap";

function createBasicEvents(): Note[] {
  const pitches: Pitch[] = [
    repiquePitchMap.head,
    repiquePitchMap.rimshot,
    repiquePitchMap.rimshot,
    repiquePitchMap.slap,
    repiquePitchMap.head,
    repiquePitchMap.rimshot,
    repiquePitchMap.rimshot,
    repiquePitchMap.bass,
  ];

  return pitches.map(
    (pitch) => ({ lengthInBeats: 0.25, pitch, stop: false } as Note)
  );
}

export function generateViradaDeDois(): Note[] {
  const events = createBasicEvents();

  return [
    ...events,
    ...events,
    {
      pitch: repiquePitchMap.head,
      lengthInBeats: 0.25,
      stop: false,
    },
    {
      pitch: repiquePitchMap.rimshot,
      lengthInBeats: 0.25,
      stop: false,
    },
    {
      pitch: repiquePitchMap.rimshot,
      lengthInBeats: 0.25,
      stop: false,
    },
    {
      pitch: repiquePitchMap.bass,
      lengthInBeats: 0.25,
      stop: false,
    },
    {
      pitch: repiquePitchMap.rimshot,
      lengthInBeats: 0.5,
      stop: false,
    },
    {
      pitch: repiquePitchMap.head,
      lengthInBeats: 0.5,
      stop: false,
    },
    {
      pitch: repiquePitchMap.rimshot,
      lengthInBeats: 0.5,
      stop: false,
    },
  ];
}

export function generateRandomNotesWeighted(
  barCount: number,
  repeatCount: number
): Note[] {
  const pitches = [
    { pitch: repiquePitchMap.head, weight: 7 },
    { pitch: repiquePitchMap.rimshot, weight: 7 },
    { pitch: repiquePitchMap.bass, weight: 6 },
    { pitch: repiquePitchMap.slap, weight: 5 },
    { pitch: repiquePitchMap.roll, weight: 2 },
    { pitch: repiquePitchMap.body, weight: 1 },
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

  const events: Note[] = [];

  let totalPhraseDuration = 0;
  while (totalPhraseDuration < (barCount / repeatCount) * 4) {
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

    const lengthInBeats = durations[selectedDurationIndex].lengthInBeats;

    events.push({
      pitch: selectedPitch,
      lengthInBeats: lengthInBeats,
      stop: false,
    });

    // Update total phrase duration
    totalPhraseDuration += lengthInBeats;
  }

  const repeatedEvents: Note[] = [];
  for (let i = 0; i < repeatCount; i++) {
    repeatedEvents.push(...events);
  }
  return repeatedEvents;
}

export function generateRandomWeightedNotesGeneric(barCount: number): Note[] {
  const events: Note[] = [];

  events.push({
    lengthInBeats: 1,
    pitch: "C4",
    stop: false,
  } as Note);
  return events;
}
