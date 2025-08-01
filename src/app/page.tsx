"use client";
import { useEffect, useState } from "react";
import PlayerButton from "./components/PlayerButton";
import GenerateButton from "./components/GenerateButton";
import { Instrument, Note } from "@/@types/rhythm";
import NumberSelector from "./components/NumberSelector";
import { generateRandomNotesWeighted } from "../generators/rhythmGenerator";
import OptionSelector from "./components/OptionSelector";
import { instruments } from "@/constants/instruments";
import SliderSelector from "./components/SliderSelector";
import TitleSection from "./sections/TitleSection";
import AdvancedOptionsSection from "./sections/AdvancedOptionsSection";
import VexFlowSequenceRenderer from "./components/VexFlowSequenceRenderer";

export default function Home() {
  const [barCount, setBarCount] = useState<number>(1);
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [bpm, setBpm] = useState<number>(120);
  const [instrument, setInstrument] = useState<Instrument>(instruments[0]);
  const [showAdvancedConfigs, setShowAdvancedConfigs] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [durationWeights, setDurationWeights] = useState([
    { lengthInBeats: 4, weight: 0 },
    { lengthInBeats: 2, weight: 0 },
    { lengthInBeats: 1, weight: 1 },
    { lengthInBeats: 0.5, weight: 2 },
    { lengthInBeats: 0.25, weight: 8 },
    { lengthInBeats: 0.125, weight: 0 },
    { lengthInBeats: 0.0625, weight: 0 },
  ]);
  const [sequence, setSequence] = useState<Note[]>(() =>
    generateRandomNotesWeighted(barCount, instrument.pitchMap, durationWeights)
  );

  useEffect(() => {
    setSequence(
      generateRandomNotesWeighted(
        barCount,
        instrument.pitchMap,
        durationWeights
      )
    );
  }, [instrument]);

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen">
        <TitleSection></TitleSection>
        <div className="flex flex-col items-center">
          {/* Main Selectors */}
          <div className="p-2 flex flex-col items-center">
            <div className="flex flex-col items-end gap-4 w-full max-w-md">
              <OptionSelector
                title="Instrumento"
                onSelect={(value) => {
                  const selectedInstrument = instruments.find(
                    (inst) => inst.name === value
                  );
                  if (selectedInstrument) {
                    setInstrument(selectedInstrument);
                  }
                }}
                options={instruments.map((instrument) => {
                  return { value: instrument.name, label: instrument.label };
                })}
                selectedValue={instrument.name}
              ></OptionSelector>
              <NumberSelector
                title="BPM"
                state={bpm}
                setState={setBpm}
                min={30}
                max={240}
              />
              <NumberSelector
                title="Compassos"
                state={barCount}
                setState={setBarCount}
                min={1}
                max={10}
              />
              <div className="w-full">
                <NumberSelector
                  title={
                    <span className="flex flex-col items-end">
                      Repetições
                      <br />
                      <span className="text-sm font-normal text-gray-500 text-right">
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
            <div className="flex gap-4 mb-4 pt-6">
              <GenerateButton
                setSequence={setSequence}
                barCount={barCount}
                pitchMap={instrument.pitchMap}
                durationWeights={durationWeights}
              />
              <PlayerButton
                sequence={sequence}
                repeatCount={repeatCount}
                bpm={bpm}
                instrument={instrument}
              />
            </div>
          </div>
          {/* Music notation display */}
          <button
            className="m-1 text-md w-96 px-4 py-2 rounded hover:brightness-90 active:brightness-75 bg-[#4c6c6c] text-white"
            onClick={() => setShowScore((prev) => !prev)}
          >
            {showScore ? "🙈 Ocultar Partitura" : "🎼 Revelar Partitura"}
          </button>
          {showScore && (
            <VexFlowSequenceRenderer
              sequence={sequence}
              barCount={barCount}
              repeatCount={repeatCount}
            ></VexFlowSequenceRenderer>
          )}
          {/* Note and duration probability weights */}
          <AdvancedOptionsSection
            instrument={instrument}
            setInstrument={setInstrument}
            setShowAdvancedConfigs={setShowAdvancedConfigs}
            showAdvancedConfigs={showAdvancedConfigs}
            durationWeights={durationWeights}
            setDurationWeights={setDurationWeights}
          ></AdvancedOptionsSection>
        </div>
      </main>
    </div>
  );
}
