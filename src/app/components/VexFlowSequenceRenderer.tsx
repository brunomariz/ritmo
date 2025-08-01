import { Note } from "@/@types/rhythm";
import React, { useRef, useEffect } from "react";
import { Renderer, Stave, StaveNote, Formatter, Voice } from "vexflow";
import VexFlowBar from "./VexFlowBar";

interface VexFlowSequenceRendererProps {
  sequence: Note[];
  barCount: number;
  repeatCount: number;
}

function VexFlowSequenceRenderer({
  sequence,
  barCount,
  repeatCount,
}: VexFlowSequenceRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function splitNotesIntoBars(notes: Note[]): Note[][] {
    const bars: Note[][] = [];
    let currentBar: Note[] = [];
    let currentBarBeats = 0;
    const beatsPerBar = 4;

    for (const note of notes) {
      // If adding this note would exceed 4 beats, start a new bar
      if (currentBarBeats + note.lengthInBeats > beatsPerBar) {
        // Only push the current bar if it has notes
        if (currentBar.length > 0) {
          bars.push(currentBar);
        }
        // Start new bar with current note
        currentBar = [note];
        currentBarBeats = note.lengthInBeats;
      } else {
        // Add note to current bar
        currentBar.push(note);
        currentBarBeats += note.lengthInBeats;
      }

      // If current bar is exactly 4 beats, complete it
      if (currentBarBeats === beatsPerBar) {
        bars.push(currentBar);
        currentBar = [];
        currentBarBeats = 0;
      }
    }

    // Add any remaining notes as the final bar
    if (currentBar.length > 0) {
      bars.push(currentBar);
    }

    return bars;
  }

  const bars = splitNotesIntoBars(sequence);

  return (
    <div className="w-screen flex justify-center">
      <div className="w-10/12 overflow-x-auto">
        {bars.map((bar, index) => {
          return <VexFlowBar key={index} notes={bar}></VexFlowBar>;
        })}
      </div>
    </div>
  );
}

export default VexFlowSequenceRenderer;
