"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { RepiqueRhythmEvent } from "@/@types/rhythm";
import BpmSelector from "./components/BpmSelector";

export default function Home() {
  const [sequence, setSequence] = useState<RepiqueRhythmEvent[]>([]);
  const [bpm, setBpm] = useState<number>(120);

  return (
    <div className="">
      <main className="text-3xl font-bold">
        <BpmSelector bpm={bpm} setBpm={setBpm} />
        <GenerateButton setSequence={setSequence} />
        <PlayerButton sequence={sequence} bpm={bpm} />
      </main>
    </div>
  );
}
