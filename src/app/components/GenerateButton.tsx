"use client";
import { playPercussionSequence } from "@/utils/audioPlayer";
import { generateRhythmSequence } from "@/app/generators/rhythmGenerator";
import { RepiqueRhythmEvent } from "@/@types/rhythm";

interface GenerateButtonProps {
  setSequence: (sequence: RepiqueRhythmEvent[]) => void;
}

export default function GenerateButton({ setSequence }: GenerateButtonProps) {
  const handleGenerate = () => {
    const sequence = generateRhythmSequence();
    setSequence(sequence);
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Generate
    </button>
  );
}
