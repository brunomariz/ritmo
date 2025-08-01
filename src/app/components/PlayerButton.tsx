"use client";
import { playSequence } from "@/utils/audioPlayer";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { Instrument, Note } from "@/@types/rhythm";
import Button from "./Button";

interface PlayerButtonProps {
  sequence: Note[];
  bpm: number;
  instrument: Instrument;
  repeatCount: number;
}

export default function PlayerButton({
  sequence,
  bpm,
  instrument,
  repeatCount,
}: PlayerButtonProps) {
  const handlePlay = () => {
    // Use the passed sequence if available, otherwise generate a default one
    const repeatedSequence = Array(repeatCount).fill(sequence).flat();
    playSequence(repeatedSequence, bpm, instrument);
  };

  return (
    <Button onClick={handlePlay} className="bg-green-500 text-white">
      Play
    </Button>
  );
}
