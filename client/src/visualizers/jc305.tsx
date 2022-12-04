// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import {Visualizer} from "../Visualizers";



export const JC305Visualizer = new Visualizer(
    "jc305-visualizer",
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;

        p5.background('black');
        p5.angleMode("degrees");
        p5.strokeWeight(1);
        p5.stroke('white');
        p5.fill('red');
        p5.translate(width / 2, height / 2);

        const values = analyzer.getValue();
        for (let i = -1; i <= 1; i += 2) {

            p5.beginShape();
            for (let j = 0; j <= 180; j += 0.5) {
                const amplitude = values[j] as number;
                const r = p5.map(amplitude, -1, 1, 200, 200) / 1.5;


                const x = height / 2 + amplitude * height + r * Math.cos(j); // this will make the circle pulsate to beat
                const y = r * Math.sin(j) * i;

                p5.vertex(x, y);
            }
            p5.endShape();
        }
    }
);