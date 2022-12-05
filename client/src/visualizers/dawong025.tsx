// 3rd party library imports
import P5 from 'p5';
import { listenerCount } from 'process';
import * as Tone from 'tone';
import { SideNav } from '../SideNav';

// project imports
import { Visualizer } from '../Visualizers';

export const dawong025Visualizer = new Visualizer(
  'dawong025',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    // Background color gradient: color1 = top color, color2 = bottom color
    let color1 = p5.color(183, 44, 60);
    let color2 = p5.color(69, 56, 91);

    for (let y = 0; y < height; y++) {
      let n = p5.map(y, 0, height, 0, 1);
      let newColor = p5.lerpColor(color1, color2, n);
      p5.stroke(newColor);
      p5.line(0, y, width, y);
    }
    
    p5.noFill();
    p5.strokeWeight(12);

    //Setup 
    p5.frameRate(60);
    p5.translate(width / 2.5, height);
    p5.angleMode('degrees');
    p5.rotate(270);
    
    
    var values = analyzer.getValue();
    p5.beginShape();
    //Create a half circle
    for (let i = 0; i <= 180; i++) {
      //Map i to some value a value with the values array
      let ind = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      const amplitude = values[ind] as number;

      // Map radius to wave form
      let radius = p5.map(amplitude, -1, 1, 100, 800);

      p5.fill(255);

      //Create x and y values for the half-circle, 0.5 to fit within window
      let x = (radius * p5.sin(i)) * 0.5;
      let y = (radius * p5.cos(i)) * 0.5;

      //Create shape
      p5.vertex(x, y);
    }
    p5.endShape();

    //Egg Yolk
    p5.rotate(90);
    p5.beginShape();
    p5.fill(209, 121, 59);
    p5.circle(0, 0, 275);
    p5.endShape();

    //Egg Eyes
    p5.fill(color2);
    p5.beginShape();
    p5.circle(-40, -60, 20);
    p5.endShape();

    p5.beginShape();
    p5.circle(90, -60, 20);
    p5.endShape();

    //Egg Smile
    p5.beginShape();
    p5.translate(25, -30);
    p5.rotate(90);
    for (let i = 0; i <= 180; i++) {
      p5.fill(209, 121, 59);

      //Create x and y values for the half-circle
      let x = (15 * p5.sin(i));
      let y = (15 * p5.cos(i));

      //Create shape
      p5.vertex(x, y);
    }
    p5.endShape();

    
  },
);
