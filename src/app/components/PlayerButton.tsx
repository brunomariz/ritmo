"use client";
import { playPercussionSequence } from "@/utils/audioPlayer";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Button from "./Button";

interface PlayerButtonProps {
  sequence: RepiqueRhythmEvent[];
  bpm: number;
}

export default function PlayerButton({ sequence, bpm }: PlayerButtonProps) {
  const handlePlay = () => {
    // Use the passed sequence if available, otherwise generate a default one
    playPercussionSequence(sequence, bpm);
  };

  return (
    <Button onClick={handlePlay} className="bg-green-500 text-white">
      Play
    </Button>
  );
}
