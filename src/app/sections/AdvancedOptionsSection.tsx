import React from "react";
import { Instrument } from "@/@types/rhythm";
import SliderSelector from "../components/SliderSelector";

type Props = {
  instrument: Instrument;
  setInstrument: (instrument: Instrument) => void;
  showAdvancedConfigs: boolean;
  setShowAdvancedConfigs: (
    value: boolean | ((prev: boolean) => boolean)
  ) => void;
};

function AdvancedOptionsSection({
  instrument,
  setInstrument,
  showAdvancedConfigs,
  setShowAdvancedConfigs,
}: Props) {
  return (
    <>
      <div className="p-2 flex flex-col">
        <button
          className="text-sm px-4 py-2 rounded hover:brightness-90 active:brightness-75 bg-gray-600 text-white"
          onClick={() => setShowAdvancedConfigs((prev) => !prev)}
        >
          {showAdvancedConfigs
            ? "Ocultar configurações avançadas"
            : "Configurações avançadas"}
        </button>
        {showAdvancedConfigs && (
          <div className="">
            <h2>Frequências das notas</h2>
            <p className="text-sm opacity-75 pb-3">
              Quanto maior o número, mais a nota irá aparecer. Se o número for
              zero, a nota não aparece.
            </p>
            {Object.entries(instrument.pitchMap).map(
              ([pitchKey, pitchMapItem], i) => {
                return (
                  <div key={i}>
                    <SliderSelector
                      max={10}
                      min={0}
                      onChange={(pitchMapItem) => {
                        const newInstrument = { ...instrument };
                        newInstrument.pitchMap[pitchKey].weight = pitchMapItem;
                        setInstrument({ ...newInstrument });
                      }}
                      value={pitchMapItem.weight}
                      title={pitchMapItem.label}
                    ></SliderSelector>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdvancedOptionsSection;
