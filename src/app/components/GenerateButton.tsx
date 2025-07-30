"use client";
import { generateRhythmSequence } from "@/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Button from "./Button";

interface GenerateButtonProps {
  setSequence: (sequence: RepiqueRhythmEvent[]) => void;
}

export default function GenerateButton({ setSequence }: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRhythmSequence();
    setSequence(sequence);
  };

  return (
    <Button onClick={handleGenerate} className="bg-blue-500 text-white">
      Generate
    </Button>
  );
}
