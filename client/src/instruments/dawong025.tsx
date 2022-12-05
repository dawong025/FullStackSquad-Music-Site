// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import trumpetImg from '../img/trumpet.png'

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

//Array of trumpet notes - credit to https://www.youtube.com/watch?v=xa17zHJhNhA for sounds
const noteSounds = ["/trumpet/trumpet-c.wav", "/trumpet/trumpet-d.wav", 
  "/trumpet/trumpet-e.wav", "/trumpet/trumpet-f.wav", "trumpet/trumpet-g.wav"];

interface TrumpetProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function TrumpetKey({
  note,
  synth,
  minor,
  index,
}: TrumpetProps): JSX.Element {
  
  //Use note sounds to play sounds
function tonePlayer (ind: any): void {
  const tp = new Tone.Player(noteSounds[ind]).toDestination();
  tp.autostart = true;
}
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.

    <div
      onMouseDown={() => synth?.triggerAttack(`${tonePlayer(index)}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('10n')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black white h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        //Individual Key CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: 1,
        width: '2rem',
        height: '2rem',
        borderRadius: '2rem',
        backgroundColor: 'goldenrod',
        stroke: "none"
        
      }}
    ></div>
  );
}

function Trumpet({ synth}: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'G', idx: 4 }
  ]);

  return (
    <div className="pv4" style = {{
      height: "fit-content",
      width: "fit-content",
      position: "relative"
    }}>
      <img src = {trumpetImg} alt = "this should be a trumpet.." style = {
        {
          //Trumpet CSS
          zIndex: 0,
          width: window.innerWidth/2,
          height: window.innerHeight/2 - window.innerHeight/4,
          marginLeft: window.innerWidth/8  
        }
        }/>
      <div className="relative dib h4 w-100 ml4" style ={{
        //Translate Key CSS
        transform: "translate(36%, -113%)"
      }}>
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}`;
            return (
              <TrumpetKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const TrumpetInstrument = new Instrument('Trumpet', Trumpet);
