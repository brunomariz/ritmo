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

export function generateRandomBar(
  beatsPerBar: number,
  beatDuration: number,
  pitchMap: PitchMap,
  durationWeights: {
    lengthInBeats: number;
    weight: number;
  }[]
): Note[] {
  // Create an array filled with notes of smallest size, then merge notes followed by rests, then merging adjacent rests, respecting beat ends.

  // Get smallest duration availiable
  const smallestDuration = Math.min(
    ...durationWeights.map((d) => d.lengthInBeats)
  );
  // Initialize array of small notes
  const smallNotes: Note[] = [];

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
  const totalDurationWeight = durationWeights.reduce(
    (sum, d) => sum + d.weight,
    0
  );
  const durationCumSum: number[] = [];
  for (const d of durationWeights) {
    durationCumSum.push(
      (durationCumSum[durationCumSum.length - 1] || 0) + d.weight
    );
  }

  // Fill array with notes of smalles duration by randomly selecting durations, then breaking the note into a note of the smallest duration followed by the appropriate number of rests to complete the duration
  let totalBarDuration = 0; // in beats
  while (totalBarDuration < beatsPerBar * beatDuration) {
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
    const selectedDuration =
      durationWeights[selectedDurationIndex].lengthInBeats;

    // Add the note
    smallNotes.push({
      lengthInBeats: smallestDuration,
      pitch: selectedPitch,
      stop: false,
    });

    // The number of stops, subtract one because thats the place for the actual note
    const numStops = selectedDuration / smallestDuration - 1;

    // Add the stops, always using G4 for consistency
    for (let i = 0; i < numStops; i++) {
      smallNotes.push({
        lengthInBeats: smallestDuration,
        pitch: "G4",
        stop: true,
      });
    }

    totalBarDuration += selectedDuration;
  }

  console.log(smallNotes);

  // For each beat, replace notes followed by stops by longer notes, not exceeding the beat length
  // TODO: merge beats by adjacent pairs if they have the same value, or dont merge
  // Ex:
  // 32r 32r 32 32 32 32 32r 32r
  //  \   /   \ /   \ /   \  /  Merge if (same durations) and (rest-rest or note-rest)
  //   16r     16    16    32r
  //     \  x /                 Dont merge if rest-note
  //   16r     16    16    32r
  //            \    /
  //   16r        8        32r
  //    \    x    /\   x   /   Dont merge if different durations
  //   16r        8        32r   End
  return [];
}

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

      const randomFrequency = 0.8;
      const randomStop = Math.random() > randomFrequency;

      events.push({
        pitch: randomStop ? "G4" : selectedPitch,
        lengthInBeats: selectedLengthInBeats,
        stop: randomStop ? true : false,
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
