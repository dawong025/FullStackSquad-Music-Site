// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import bassImg from '../img/bassline.png'

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { MonoSynth } from 'tone';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Bass.
 ** ------------------------------------------------------------------------ */

interface BassStringProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.MonoSynth; // Contains library code for making sound
  minor?: boolean; // True if minor stroke, false if major stroke
  octave: number;
  index: number; // octave + index together give a location for the Bass stroke
}

export function BassString({
  note,
  synth,
  minor,
  index,
}: BassStringProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor stroke in the Bass.
   * See `BassStringWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {
          // 'bg-black black h3': minor, // minor strokes are black
          'bg-black white h3': minor, // minor strokes are black
          'black bg-white h4': !minor, // major strokes are white
        })}
        style={{
          // CSS
          backgroundColor: `#333333`,
          border: "none",
          borderRight: `solid 7px #875b35`,
          zIndex: 0,
          top: `${(index % 7) * 5}rem`,
          left: /*`${((Math.floor(index) % 7 === 0) ? (Math.floor(index)) + 1 : (Math.floor(index))) * 5}px`*/ `0`,
          height: `40px`,
          width: `200px`,
          marginLeft: `${((Math.floor(index) % 7 === 0) ? (Math.floor(index)) + 1 : (Math.floor(index))) * 28.6}px`,
        }}
      >
        <div
          style={{
            backgroundColor: `lightyellow`,
            position: `absolute`,
            zIndex: 1,
            top: `19px`,
            left: `0px`,
            height: `${ 6 - (index % 7) * 2.5}px`,
            width: `200px`,
          }}
        ></div>
    </div>
  );
}

// eslint-disable-next-line
function BassStringWithoutJSX({
  note,
  synth,
  minor,
  index,
}: BassStringProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `BassString` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack((`${note}`)),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function Bass({ }: InstrumentProps): JSX.Element {
  const strokes = List([
    { note: 'G', idx: 0 },
    { note: 'D', idx: 0.5 },
    { note: 'A', idx: 1 },
    { note: 'E', idx: 1.5 },
  ]);

  var bass = new Tone.MonoSynth({
    "oscillator": {
        "type": "fmsquare5",
		"modulationType" : "triangle",
      	"modulationIndex" : 2,
      	"harmonicity" : 0.501
    },
    "filter": {
        "Q": 1,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.4,
        "release": 2
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.8,
        "release": 1.5,
        "baseFrequency": 70,
        "octaves": 3.7
    }
  }).toDestination();

  return (
    <div className="pv4">
      <img src = {bassImg} alt = "Bass guitar img" style = {
        {
          zIndex: 0,
          width: `30rem`,
          height: `10rem`,
          marginLeft: `5rem` 
        }
        }/>
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          strokes.map(stroke => {
            const isMinor = stroke.note.indexOf('b') !== -1;
            const note = `${stroke.note}${octave}`;
            return (
              <BassString
                key={note} //react stroke
                note={note}
                synth={bass}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + stroke.idx}
              />
            );
          }),
        )}
      </div>
      
    </div>
  );
}

export const BassInstrument = new Instrument('Bass', Bass);

