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
        p5.stroke('yellow')
        p5.line(0, height, width, height);
        p5.fill('red');
        p5.translate(width / 2, height / 2);

        const values = analyzer.getValue();
        // This is what draws the circle
        for (let i = -1; i <= 1; i += 2) {

            p5.beginShape();

            // This will create all the shapes that will react to playback
            for (let j = 1; j <= 20000; j += 100 / 20) {
                const amplitude = values[j] as number;
                const r = p5.map(amplitude, -1, 1, 200, 200) / 1.5;
                // this will make the circle pulsate to beat
                // const x = height / 2 + amplitude * height + r * Math.cos(j);
                // let y = r * Math.sin(j) * i;
                // this variation will create an X
                const x = height / 2 + amplitude * height + r * Math.cos(j);
                let y = r * Math.cos(j) * i;
                p5.vertex(x, y);
            }
            p5.endShape();
        }
    }
);
