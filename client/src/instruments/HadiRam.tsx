// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { MembraneInstrument, InstrumentProps } from '../DrumnIstrument';


//Drum components 
interface DrumPadProps {
  note: string;
  duration?: string;
  synth?: Tone.MembraneSynth; //membrane synth for more drum like songs.
  index: number;
  // minor?: boolean; , minor not needed for drum ads
}

//Pastel colors for drum pads.
const padColors = ['#a0d2eb', '#D4FAFA', '#AFD5F0',
  '#9DCAEB', '#488282', '#52AB90', '#8AC294', '#E6D5A1']
export function DrumKey({
  note,
  synth,
  index,
}: DrumPadProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, '8n')}
      className={classNames('pointer')}
      style={{
        backgroundColor: padColors[index],
        borderStyle: 'solid',
        borderColor: '#0000FF',
        borderWidth: 10,
        display: "inline-block",
        width: 125,
        height: 125,
        marginLeft: 10,
        marginRight: 10,
      }}
    ></div >
  );
}

function DrumType({ title, onClick, active }: any): JSX.Element {
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

function Drums({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'A2', idx: 0 },
    { note: 'B2', idx: 1 },
    { note: 'C2', idx: 2 },
    { note: 'D2', idx: 3 },
    { note: 'E2', idx: 4 },
    { note: 'F2', idx: 5 },
    { note: 'G2', idx: 6 },
    { note: 'H2', idx: 7 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.MembraneSynth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        /*
        values for attack, decay, sustain and release values taken from
        Resource: https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
        */
        "envelope": {
          "attack": 0.001,
          "decay": 0.20,
          "sustain": 0.15,
          "release": 0.03,
        },
        "pitchDecay": 0.001,
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
      <div className="relative dib h4 w-100 ">
        {keys.map(key => {
          const note = `${key.note}`;
          return (
            <DrumKey
              key={note} //react key
              note={note}
              synth={synth}
              index={key.idx}
            />
          );
        },
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const DrumsInstrument = new MembraneInstrument('Drum Machine', Drums);
