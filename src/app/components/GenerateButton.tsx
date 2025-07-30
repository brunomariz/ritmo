"use client";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Button from "./Button";

interface GenerateButtonProps {
  setSequence: (sequence: RepiqueRhythmEvent[]) => void;
  barCount: number;
  repeatCount: number;
}

export default function GenerateButton({
  setSequence,
  barCount,
  repeatCount,
}: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRandomNotesWeighted(barCount, repeatCount);
    setSequence(sequence);
  };

  return (
    <Button onClick={handleGenerate} className="bg-blue-500 text-white">
      Generate
    </Button>
  );
}
