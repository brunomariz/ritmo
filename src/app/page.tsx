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

export default function Home() {
  const [barCount, setBarCount] = useState<number>(2);
  const [repeatCount, setRepeatCount] = useState<number>(2);
  const [bpm, setBpm] = useState<number>(120);
  const [instrument, setInstrument] = useState<Instrument>(instruments[0]);
  const [sequence, setSequence] = useState<Note[]>(() =>
    generateRandomNotesWeighted(barCount, repeatCount, instrument.pitchMap)
  );
  const [showAdvancedConfigs, setShowAdvancedConfigs] = useState(false);

  useEffect(() => {
    setSequence(
      generateRandomNotesWeighted(barCount, repeatCount, instrument.pitchMap)
    );
  }, [instrument]);

  return (
    <div className="">
      <main className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen">
        <TitleSection></TitleSection>
        <div className="flex flex-col sm:flex-row">
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
            <div className="flex gap-4 mb-4">
              <GenerateButton
                setSequence={setSequence}
                barCount={barCount}
                repeatCount={repeatCount}
                pitchMap={instrument.pitchMap}
              />
              <PlayerButton
                sequence={sequence}
                bpm={bpm}
                instrument={instrument}
              />
            </div>
          </div>
          {/* Note probability weights */}
          <AdvancedOptionsSection
            instrument={instrument}
            setInstrument={setInstrument}
            setShowAdvancedConfigs={setShowAdvancedConfigs}
            showAdvancedConfigs={showAdvancedConfigs}
          ></AdvancedOptionsSection>
        </div>
      </main>
    </div>
  );
}
