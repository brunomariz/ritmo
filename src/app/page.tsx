"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { RepiqueRhythmEvent } from "@/@types/rhythm";

export default function Home() {
  const [sequence, setSequence] = useState<RepiqueRhythmEvent[]>([]);

  return (
    <div className="">
      <main className="">
        <GenerateButton setSequence={setSequence} />
        <PlayerButton sequence={sequence} />
      </main>
    </div>
  );
}
