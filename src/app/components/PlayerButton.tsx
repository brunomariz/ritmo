"use client";
import { playPercussionSequence } from "@/utils/audioPlayer";
import { generateRhythmSequence } from "@/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Button from "./Button";

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
    <Button onClick={handlePlay} className="bg-green-500 text-white">
      Play
    </Button>
  );
}
