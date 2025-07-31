"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { Instrument, Note } from "@/@types/rhythm";
import Selector from "./components/Selector";
import { generateRandomNotesWeighted } from "../generators/rhythmGenerator";

export default function Home() {
  const [barCount, setBarCount] = useState<number>(2);
  const [repeatCount, setRepeatCount] = useState<number>(2);
  const [sequence, setSequence] = useState<Note[]>(() =>
    generateRandomNotesWeighted(barCount, repeatCount)
  );
  const [bpm, setBpm] = useState<number>(120);
  const [instrument, setInstrument] = useState<Instrument>("repique");

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen">
        {/* Selectors */}
        <div className="flex flex-col items-end gap-4 w-full max-w-md">
          <Selector title="BPM" state={bpm} setState={setBpm} />
          <Selector title="Compassos" state={barCount} setState={setBarCount} />
          <div className="w-full">
            <Selector
              title={
                <span className="flex flex-col items-end">
                  Repetições
                  <br />
                  <span className="text-sm font-normal text-gray-500">
                    (quantas vezes repete os compassos completos)
                  </span>
                </span>
              }
              state={repeatCount}
              setState={setRepeatCount}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mb-4">
          <GenerateButton
            setSequence={setSequence}
            barCount={barCount}
            repeatCount={repeatCount}
          />
          <PlayerButton sequence={sequence} bpm={bpm} instrument={instrument} />
        </div>
      </main>
    </div>
  );
}
