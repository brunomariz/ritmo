import type { Note, Pitch, PitchMap } from "../@types/rhythm.js";

// function createBasicEvents(): Note[] {
//   const pitches: Pitch[] = [
//     repiquePitchMap.head.pitch,
//     repiquePitchMap.rimshot.pitch,
//     repiquePitchMap.rimshot.pitch,
//     repiquePitchMap.slap.pitch,
//     repiquePitchMap.head.pitch,
//     repiquePitchMap.rimshot.pitch,
//     repiquePitchMap.rimshot.pitch,
//     repiquePitchMap.bass.pitch,
//   ];

//   return pitches.map(
//     (pitch) => ({ lengthInBeats: 0.25, pitch, stop: false } as Note)
//   );
// }

// export function generateViradaDeDois(): Note[] {
//   const events = createBasicEvents();

//   return [
//     ...events,
//     ...events,
//     {
//       pitch: repiquePitchMap.head.pitch,
//       lengthInBeats: 0.25,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.rimshot.pitch,
//       lengthInBeats: 0.25,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.rimshot.pitch,
//       lengthInBeats: 0.25,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.bass.pitch,
//       lengthInBeats: 0.25,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.rimshot.pitch,
//       lengthInBeats: 0.5,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.head.pitch,
//       lengthInBeats: 0.5,
//       stop: false,
//     },
//     {
//       pitch: repiquePitchMap.rimshot.pitch,
//       lengthInBeats: 0.5,
//       stop: false,
//     },
//   ];
// }

export function generateRandomNotesWeighted(
  barCount: number,
  repeatCount: number,
  pitchMap: PitchMap
): Note[] {
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
  const totalPitchWeight = Object.values(pitchMap).reduce(
    (sum, p) => sum + p.weight,
    0
  );
  const pitchCumSum: number[] = [];
  for (const p of Object.values(pitchMap)) {
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

  let totalSequenceDuration = 0;
  const numBeatsInSequence = (barCount / repeatCount) * 4;
  while (totalSequenceDuration < numBeatsInSequence) {
    // Select a random pitch based on weights
    const pitchRandom = Math.random() * totalPitchWeight;
    const selectedPitchIndex = pitchCumSum.findIndex(
      (sum) => sum >= pitchRandom
    );
    const selectedPitch = Object.values(pitchMap)[selectedPitchIndex].pitch;

    // Select a random duration based on weights
    const durationRandom = Math.random() * totalDurationWeight;
    const selectedDurationIndex = durationCumSum.findIndex(
      (sum) => sum >= durationRandom
    );

    let selectedLengthInBeats = durations[selectedDurationIndex].lengthInBeats;

    while (selectedLengthInBeats + totalSequenceDuration > numBeatsInSequence) {
      selectedLengthInBeats /= 2;
    }

    events.push({
      pitch: selectedPitch,
      lengthInBeats: selectedLengthInBeats,
      stop: false,
    });

    // Update total phrase duration
    totalSequenceDuration += selectedLengthInBeats;
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
