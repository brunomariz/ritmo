import React, { useRef, useEffect } from "react";
import { Renderer, Stave, StaveNote, Formatter, Voice } from "vexflow";

function VexFlowRenderer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10);

    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    const notes = [
      new StaveNote({ keys: ["c/4"], duration: "q" }),
      new StaveNote({ keys: ["d/4"], duration: "q" }),
      new StaveNote({ keys: ["b/4"], duration: "qr" }),
      new StaveNote({ keys: ["c/4"], duration: "q" }),
    ];

    const voice = new Voice({ numBeats: 4, beatValue: 4 });
    voice.addTickables(notes);

    new Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }, []);

  return <div ref={containerRef} />;
}

export default VexFlowRenderer;
