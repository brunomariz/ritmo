"use client";
import { generateRandomNotesWeighted } from "@/generators/rhythmGenerator";
import { Note, PitchMap } from "@/@types/rhythm";
import Button from "./Button";

interface GenerateButtonProps {
  setSequence: (sequence: Note[]) => void;
  barCount: number;
  pitchMap: PitchMap;
  durationWeights: {
    lengthInBeats: number;
    weight: number;
  }[];
}

export default function GenerateButton({
  setSequence,
  barCount,
  pitchMap,
  durationWeights,
}: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRandomNotesWeighted(
      barCount,
      pitchMap,
      durationWeights
    );
    setSequence(sequence);
  };

  return (
    <Button onClick={handleGenerate} className="bg-[#e1cf63] text-white">
      🎲 Gerar
    </Button>
  );
}
