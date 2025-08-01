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
  durationWeights: {
    lengthInBeats: number;
    weight: number;
  }[];
  setDurationWeights: (
    value: {
      lengthInBeats: number;
      weight: number;
    }[]
  ) => void;
};

function AdvancedOptionsSection({
  instrument,
  setInstrument,
  showAdvancedConfigs,
  setShowAdvancedConfigs,
  durationWeights,
  setDurationWeights,
}: Props) {
  function lengthToString(length: number) {
    if (length == 4) {
      return "semibreve";
    }
    if (length == 2) {
      return "mínima";
    }
    if (length == 1) {
      return "semínima";
    }
    if (length == 1 / 2) {
      return "colcheia";
    }
    if (length == 1 / 4) {
      return "semicolcheia";
    }
    if (length == 1 / 8) {
      return "fusa";
    }
    if (length == 1 / 16) {
      return "semifusa";
    }
    return length.toString();
  }

  return (
    <>
      <div className="flex flex-col items-center p-5">
        <button
          className="m-1 text-sm w-72 px-4 py-2 rounded hover:brightness-90 active:brightness-75 bg-gray-600 text-white"
          onClick={() => setShowAdvancedConfigs((prev) => !prev)}
        >
          {showAdvancedConfigs
            ? "Ocultar configurações avançadas"
            : "Configurações avançadas"}
        </button>
        {showAdvancedConfigs && (
          <>
            <div>
              <h2 className="pt-5">Frequências das notas</h2>
              <p className="text-sm opacity-75 pb-3">
                Quanto maior o número, maior a frequência que a nota irá
                aparecer. Se o número for zero, a nota não aparecerá.
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
                          newInstrument.pitchMap[pitchKey].weight =
                            pitchMapItem;
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
            <div>
              <h2 className="pt-5">Frequências das durações</h2>
              <p className="text-sm opacity-75 pb-3">
                Quanto maior o número, maior a frequência que a duração
                (colcheia, semicolcheia, etc) irá aparecer. Se o número for
                zero, a duração não aparecerá.
              </p>
              {Object.values(durationWeights).map((value, i) => {
                return (
                  <div key={i}>
                    <SliderSelector
                      max={10}
                      min={0}
                      onChange={(newWeight) => {
                        const newDurationWeights = [...durationWeights];
                        newDurationWeights[i] = {
                          ...value,
                          weight: newWeight,
                        };
                        setDurationWeights(newDurationWeights);
                      }}
                      value={value.weight}
                      title={lengthToString(value.lengthInBeats)}
                    ></SliderSelector>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AdvancedOptionsSection;
