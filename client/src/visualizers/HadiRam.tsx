
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const HadiRam = new Visualizer(
    'Drum Machine Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;

        /*
        Code to make gradient background color of visualizer.
        Resource: Team Member - Darren Wong @dawong025
        */
        let color1 = p5.color(139, 210, 236);
        let color2 = p5.color(146, 206, 168);

        for (let y = 0; y < height; y++) {
            let n = p5.map(y, 0, height, 0, 1);
            let newColor = p5.lerpColor(color1, color2, n);
            p5.stroke(newColor);
            p5.line(0, y, width, y);
        }

        p5.angleMode("degrees");
        p5.strokeWeight(5);
        p5.stroke('white');
        p5.fill('blue');
        p5.rotate(0.1);
        p5.translate(width / 2.0, height / 2.0);

        
        const values = analyzer.getValue();
        // This is what draws the circle
        for (let i = -1; i <= 1; i += 2) {
            p5.beginShape();
            /*
            Resource used to draw this shape from
            Team Memeber - Jimmy Cheng @jc305
            */
            for (let j = 1; j <= 800; j += 100 / 20) {
                const amplitude = values[j] as number;
                const r = p5.map(amplitude, -1, 1, 200, 200) / 1.5;
                const x = height / 2 + amplitude * height + r * Math.cos(j);
                let y = r * Math.sin(j) * i;
                p5.vertex(x, y);
            }
            p5.endShape();
        }
    
    },

);

        
        