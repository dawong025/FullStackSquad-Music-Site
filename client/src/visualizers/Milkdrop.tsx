// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const MilkdropVisualizer = new Visualizer(
  'Milkdrop',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);


    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      let currentDate = new Date();
      const amplitude = values[i] as number;
      p5.background(
        (p5.map(i, 0, values.length - 1, 0, width)) * .3, 
        (height / 2 + amplitude * height) * .3, 
        (values[i] as number * .2) * .3, 
        255 * (currentDate.getSeconds())
      );
    }

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x + 100, y);
    }
    p5.endShape();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x + 600, y);
    }
    p5.endShape();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x + 1100, y);
    }
    p5.endShape();

  },
);
