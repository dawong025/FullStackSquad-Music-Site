// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import {Visualizer} from "../Visualizers";

let dot: any[] = [];


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

//TODO, need to make a reactive background of some sort...
        // class Dots {
        //     pos: P5.Vector;
        //     vel: P5.Vector;
        //     acc: Vector;
        //     w: number;
        //     color: any[];
        //
        //     constructor() {
        //
        //         this.pos = P5.Vector.random2D().mult(250)
        //
        //         this.vel = createVector(0, 0);
        //
        //         this.acc = this.pos.copy().mult(random(0.00001,0.00001));
        //         this.w = random(3, 5);
        //         this.color = [random(200,255),random(200,255),random(200,255)]
        //
        //     }
        //
        //     update() {
        //         this.pos.add(this.vel);
        //     }
        //
        //     edges() {
        //         return this.pos.x < -width / 2 || this.pos.x > width / 2
        //             || this.pos.y < -height / 2 || this.pos.y > height / 2;
        //     }
        //
        //     draw() {
        //         dot.push(new Dots());
        //         dot.forEach((d, index) => {
        //             if (!dot[index].edges()) {
        //                 d.update();
        //                 d.show();
        //             }
        //         });
        //     }
        //
        //     show() {
        //         p5.noStroke();
        //         fill(this.color);
        //         p5.circle(this.pos.x, this.pos.y, this.w);
        //     }
        // }


        // let d = new Dots();
        // dot.push(d);
        //
        // for(let i = 0; i < dot.length; i++) {
        //     dot[i].show()
        // }
    }
);