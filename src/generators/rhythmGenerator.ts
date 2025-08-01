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
  pitchMap: PitchMap,
  durationWeights: {
    lengthInBeats: number;
    weight: number;
  }[]
): Note[] {
  const durations = durationWeights;

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

  const numBeatsInBar = 4;
  for (let index = 0; index < barCount; index++) {
    let totalCurrentBarDuration = 0;
    while (totalCurrentBarDuration < numBeatsInBar) {
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

      let selectedLengthInBeats =
        durations[selectedDurationIndex].lengthInBeats;

      while (selectedLengthInBeats + totalCurrentBarDuration > numBeatsInBar) {
        selectedLengthInBeats /= 2;
      }

      events.push({
        pitch: selectedPitch,
        lengthInBeats: selectedLengthInBeats,
        stop: false,
      });

      // Update total bar duration
      totalCurrentBarDuration += selectedLengthInBeats;
    }
  }

  return events;
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
