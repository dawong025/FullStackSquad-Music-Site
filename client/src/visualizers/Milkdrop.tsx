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
      let flipper = false;
      if (new Date().getMilliseconds() == 0) {
        if (flipper) {
          var timer = new Date().getMilliseconds();
        }
        else {
          var timer = new Date().getMilliseconds() * -1;
        }
      }
    }

    

    // Background color gradient: color1 = top color, color2 = bottom color
    //p5.strokeWeight(dim * 0.0002)
    //let color2 = p5.color(218, 210, 216);
    let color1 = p5.color(20, 54, 66);
    //p5.strokeWeight(dim * 0.0002)
    p5.strokeWeight(dim * 0.0001)
    for (let y = 0; y < height; y++) {
      let n = p5.map(y, 0, height, 0, 1);
      let newColor = p5.lerpColor(color1, color1, n);
      p5.stroke(newColor);
      p5.line(0, y, width, y);
    }

    // for (let i = 0; i < values.length; i++) {
    //   let currentDate = new Date();
    //   const amplitude = values[i] as number;
    //   p5.background(
    //     (p5.map(i, 0, values.length - 1, 0, width)) * .3, 
    //     (height / 2 + amplitude * height) * .3, 
    //     (values[i] as number * .2) * .3, 
    //     255 * (currentDate.getSeconds())
    //   );
    // }


    p5.frameRate(30);
    p5.translate(width / 2.5, height / 1.2);
    p5.angleMode('degrees');
    p5.strokeWeight(0);
    p5.beginShape()
    //Create a half circle
    // for (let i = 0; i <= 180; i++) {
    //   //Map i to some value a value with the values array
    //   let ind = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
    //   const amplitude = values[ind] as number;

    //   // Map radius to wave form
    //   let radius = p5.map(amplitude, -1, 1, 100, 800);

    //   p5.fill(255);

    //   //Create x and y values for the half-circle, 1 to fit within window
    //   let x = (radius * p5.sin(i)) * .5;
    //   let y = (radius * p5.cos(i)) * .5;

    //   //Create shape
    //   p5.vertex(x + 57, y);
    // }
    // p5.endShape();

    p5.beginShape()
    //Create a half circle
    for (let i = 0; i <= 180; i++) {
      //Map i to some value a value with the values array
      let ind = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      const amplitude = values[ind] as number;

      // Map radius to wave form
      let radius = p5.map(amplitude, -1, 1, 100, 800);

      p5.fill(255);

      //Create x and y values for the half-circle, 1 to fit within window
      let y = ((radius * -1) * p5.sin(i)) * .5;
      let x = ((radius * 1) * p5.cos(i)) * .5;

      //Create shape
      p5.vertex(x + 57, y + 1);
    }
    p5.endShape();

    p5.beginShape()
    //Create a half circle
    // for (let i = 0; i <= 180; i++) {
    //   //Map i to some value a value with the values array
    //   let ind = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
    //   const amplitude = values[ind] as number;

    //   // Map radius to wave form
    //   let radius = p5.map(amplitude, -1, 1, 100, 800);

    //   p5.fill(255);

    //   //Create x and y values for the half-circle, 1 to fit within window
    //   let x = ((radius * -1) * p5.sin(i)) * .5;
    //   let y = ((radius * -1) * p5.cos(i)) * .5;

    //   //Create shape
    //   p5.vertex(x + 57, y);
    // }
    // p5.endShape();

    p5.beginShape()
    //Create a half circle
    for (let i = 0; i <= 180; i++) {
      //Map i to some value a value with the values array
      let ind = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      const amplitude = values[ind] as number;

      // Map radius to wave form
      let radius = p5.map(amplitude, -1, 1, 100, 800);

      p5.fill(255);

      //Create x and y values for the half-circle, 1 to fit within window
      let y = ((radius) * p5.sin(i)) * .5;
      let x = ((radius) * p5.cos(i)) * .5;

      //Create shape
      p5.vertex(x + 57, y);
    }
    p5.endShape();



    p5.strokeWeight(dim * 0.0001 * (new Date().getMilliseconds()));
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    p5.translate((width / 2.5) * -1, (height / 1.2) * -1);

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const y = p5.map(i, 0, values.length - 1, 0, width);
      const x = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x + 100, y);
    }
    p5.endShape();

    p5.strokeWeight(dim * 0.0001 * (new Date().getMilliseconds()));
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
