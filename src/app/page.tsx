"use client";
import { useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { Instrument, Note } from "@/@types/rhythm";
import NumberSelector from "./components/NumberSelector";
import { generateRandomNotesWeighted } from "../generators/rhythmGenerator";
import OptionSelector from "./components/OptionSelector";
import {
  getPitchMapFromInstrument,
  repiquePitchMap,
} from "@/constants/pitchMap";

export default function Home() {
  const [barCount, setBarCount] = useState<number>(2);
  const [repeatCount, setRepeatCount] = useState<number>(2);
  const [bpm, setBpm] = useState<number>(120);
  const [instrument, setInstrument] = useState<Instrument>("repique");
  const [sequence, setSequence] = useState<Note[]>(() =>
    generateRandomNotesWeighted(
      barCount,
      repeatCount,
      getPitchMapFromInstrument(instrument)
    )
  );

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen">
        {/* Selectors */}
        <div className="flex flex-col items-end gap-4 w-full max-w-md">
          <OptionSelector
            title="Instrumento"
            onSelect={(value) => {
              setInstrument(value);
            }}
            options={[
              { value: "repique" as Instrument, label: "Repique" },
              { value: "agogo" as Instrument, label: "Agogo" },
            ]}
            selectedValue={instrument}
          ></OptionSelector>
          <NumberSelector title="BPM" state={bpm} setState={setBpm} />
          <NumberSelector
            title="Compassos"
            state={barCount}
            setState={setBarCount}
          />
          <div className="w-full">
            <NumberSelector
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
            pitchMap={getPitchMapFromInstrument(instrument)}
          />
          <PlayerButton sequence={sequence} bpm={bpm} instrument={instrument} />
        </div>
      </main>
    </div>
  );
}
