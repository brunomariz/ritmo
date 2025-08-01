import { Note } from "@/@types/rhythm";
import React, { useRef, useEffect } from "react";
import { Renderer, Stave, StaveNote, Formatter, Voice } from "vexflow";

interface VexFlowRendererProps {
  sequence: Note[];
  barCount: number;
  repeatCount: number;
}

function VexFlowRenderer({
  sequence,
  barCount,
  repeatCount,
}: VexFlowRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function convertNotesToVexNotes(notes: Note[]) {
    const vexNotes = notes.map((note) => {
      const [letter, octave] = [note.pitch.slice(0, -1), note.pitch.slice(-1)];
      let duration = (4 / note.lengthInBeats).toString();
      if (!note.stop) {
        duration = (4 / note.lengthInBeats).toString();
      } else {
        duration = (4 / note.lengthInBeats).toString() + "r";
      }
      return new StaveNote({
        keys: [`${letter.toLowerCase()}/${octave}`],
        duration: duration,
      });
    });

    return vexNotes;
  }

  function drawBar(
    notes: Note[],
    containerRef: React.RefObject<HTMLDivElement | null>
  ) {
    const numBeats = 4;

    // Create new canvas
    const renderer = new Renderer(containerRef.current!, Renderer.Backends.SVG);
    // Canvas size capped at 5000 to avoid users setting them too big
    const pixelsPerBeat = 110;
    const width = Math.min(pixelsPerBeat * numBeats * 1.2, 5000);
    const height = 120;
    renderer.resize(width, height);
    const context = renderer.getContext();

    // Create stave with variable size depending on number of beats
    const stave = new Stave(0, 0, pixelsPerBeat * numBeats + 34);
    stave.addClef("percussion").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Add white background after drawing
    const svgElement = containerRef.current!.querySelector("svg") as SVGElement;
    if (svgElement) {
      svgElement.style.backgroundColor = "white";
    }

    const vexNotes = convertNotesToVexNotes(notes);

    const voice = new Voice({ numBeats: numBeats, beatValue: 4 });
    voice.addTickables(vexNotes);

    new Formatter()
      .joinVoices([voice])
      .format([voice], pixelsPerBeat * numBeats - 50);
    voice.draw(context, stave);
  }

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

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up last render
    containerRef.current.innerHTML = "";

    const bars = splitNotesIntoBars(sequence);
    for (let index = 0; index < barCount; index++) {
      const bar = bars[index];
      // Draw bar
      drawBar(bar, containerRef);
    }
  }, [sequence]);

  return (
    <div className="w-screen flex justify-center">
      <div className="w-10/12 overflow-x-auto">
        <div ref={containerRef} />
      </div>
    </div>
  );
}

export default VexFlowRenderer;
