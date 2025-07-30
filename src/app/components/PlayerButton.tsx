"use client";
import { playPercussionSequence } from "@/utils/audioPlayer";
import { generateRhythmSequence } from "@/app/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";

interface PlayerButtonProps {
  sequence: RepiqueRhythmEvent[];
  bpm: number;
}

export default function PlayerButton({ sequence, bpm }: PlayerButtonProps) {
  const handlePlay = () => {
    // Use the passed sequence if available, otherwise generate a default one
    const sequenceToPlay =
      sequence.length > 0 ? sequence : generateRhythmSequence();
    playPercussionSequence(sequenceToPlay, bpm);
  };

  return (
    <button
      onClick={handlePlay}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Play
    </button>
  );
}
