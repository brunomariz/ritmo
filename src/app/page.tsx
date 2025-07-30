"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import Selector from "./components/Selector";

export default function Home() {
  const [sequence, setSequence] = useState<RepiqueRhythmEvent[]>([]);
  const [bpm, setBpm] = useState<number>(120);
  const [barCount, setBarCount] = useState<number>(4);

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen space-y-2 space-x-2">
        <Selector title="BPM" state={bpm} setState={setBpm} />
        <Selector title="Compassos" state={barCount} setState={setBarCount} />
        <GenerateButton setSequence={setSequence} />
        <PlayerButton sequence={sequence} bpm={bpm} />
      </main>
    </div>
  );
}
