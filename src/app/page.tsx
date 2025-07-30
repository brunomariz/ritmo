"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Selector from "./components/Selector";
import { generateRandomNotesWeighted } from "../generators/rhythmGenerator";

export default function Home() {
  const [barCount, setBarCount] = useState<number>(4);
  const [sequence, setSequence] = useState<RepiqueRhythmEvent[]>(() =>
    generateRandomNotesWeighted(barCount)
  );
  const [bpm, setBpm] = useState<number>(120);

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen">
        {/* Selectors */}
        <div className="flex flex-col items-end gap-4">
          <Selector title="BPM" state={bpm} setState={setBpm} />
          <Selector title="Compassos" state={barCount} setState={setBarCount} />
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mb-4">
          <GenerateButton setSequence={setSequence} barCount={barCount} />
          <PlayerButton sequence={sequence} bpm={bpm} />
        </div>
      </main>
    </div>
  );
}
