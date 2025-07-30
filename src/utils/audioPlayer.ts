import { RepiqueNote, RepiqueRhythmEvent } from "@/@types/rhythm";
import { getSamplePath } from "./getSamplePath";

export async function loadSample(
  audioCtx: AudioContext,
  pitch: RepiqueNote["pitch"]
): Promise<AudioBuffer> {
  const response = await fetch(getSamplePath(pitch));
  const arrayBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

export async function playPercussionSequence(events: RepiqueRhythmEvent[]) {
  const audioCtx = new AudioContext();

  // Extract only note events and get unique pitches
  const noteEvents = events.filter((event) => event.type === "note") as Array<{
    type: "note";
    data: RepiqueNote;
  }>;
  const uniquePitches = [
    ...new Set(noteEvents.map((event) => event.data.pitch)),
  ];
  const buffers: Record<string, AudioBuffer> = {};

  // Load all unique samples first
  await Promise.all(
    uniquePitches.map(async (pitch) => {
      buffers[pitch] = await loadSample(audioCtx, pitch);
    })
  );

  const startTime = audioCtx.currentTime;
  let currentTime = 0;

  // Schedule each event
  const bpm = 120;

  for (const event of events) {
    if (event.type === "note") {
      const noteEvent = event.data as RepiqueNote;
      const buffer = buffers[noteEvent.pitch];
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(startTime + currentTime);
    }
    // For both notes and stops, advance the current time
    currentTime += event.data.lengthInBeats;
  }
}
