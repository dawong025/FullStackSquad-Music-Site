// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Bass.
 ** ------------------------------------------------------------------------ */

interface BassStringProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
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
          border: `solid 2px #876635`,
          zIndex: 0,
          top: `${(index % 7) * 5}rem`,
          left: `${((Math.floor(index) % 7 === 0) ? (Math.floor(index)) + 1 : (Math.floor(index)))}rem`,
          height: `40px`,
          width: `270px`,
          marginLeft: `${((Math.floor(index) % 7 === 0) ? (Math.floor(index)) + 1 : (Math.floor(index))) * 1.4}rem`,
        }}
      >
        <div
          style={{
            backgroundColor: `white`,
            position: `absolute`,
            zIndex: 1,
            top: `19px`,
            left: `0px`,
            height: `2px`,
            width: `290px`,
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
      onMouseDown: () => synth?.triggerAttack(`${note}`),
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

function BassType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Bass({ synth, setSynth }: InstrumentProps): JSX.Element {
  const strokes = List([
    { note: 'G', idx: 0 },
    { note: 'D', idx: 0.5 },
    { note: 'A', idx: 1 },
    { note: 'E', idx: 1.5 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          strokes.map(stroke => {
            const isMinor = stroke.note.indexOf('b') !== -1;
            const note = `${stroke.note}${octave}`;
            return (
              <BassString
                key={note} //react stroke
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + stroke.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <BassType
            stroke={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const BassInstrument = new Instrument('Bass', Bass);
