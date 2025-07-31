import { Instrument, Note, Pitch } from "@/@types/rhythm";
import { getSamplePath } from "./getSamplePath";

export async function loadSample(
  audioCtx: AudioContext,
  pitch: Pitch,
  instrument: Instrument
): Promise<AudioBuffer> {
  const response = await fetch(getSamplePath(pitch, instrument));
  const arrayBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

export async function playSequence(
  notes: Note[],
  bpm: number,
  instrument: Instrument
) {
  const audioCtx = new AudioContext();

  // Extract only note events and get unique pitches
  const nonStopNotes = notes.filter((note) => note.stop === false);
  const uniquePitches = [...new Set(nonStopNotes.map((note) => note.pitch))];
  const buffers: Record<string, AudioBuffer> = {};

  // Load all unique samples first
  await Promise.all(
    uniquePitches.map(async (pitch) => {
      buffers[pitch] = await loadSample(audioCtx, pitch, instrument);
    })
  );

  const startTime = audioCtx.currentTime;
  let currentTime = 0;

  // Schedule each event
  const secondsPerBeat = 60 / bpm;

  for (const note of notes) {
    if (!note.stop) {
      const buffer = buffers[note.pitch];
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(startTime + currentTime);
    }
    // For both notes and stops, advance the current time
    currentTime += note.lengthInBeats * secondsPerBeat;
  }
}
