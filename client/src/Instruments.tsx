// 3rd party library imports
import React, {useState, useEffect} from 'react';
import * as Tone from 'tone';

// project imports
import {DispatchAction} from './Reducer';
import {AppState} from './State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
    name: string;
    synth: Tone.Synth;
    setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
}

export class Instrument {
    public readonly name: string;
    public readonly component: React.FC<InstrumentProps>;

    constructor(name: string, component: React.FC<InstrumentProps>) {
        this.name = name;
        this.component = component;
    }
}

function TopNav({name}: { name: string }) {
    return (
        <div
            className={
                'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
            }
        >
            <div>{name}</div>
        </div>
    );
}

interface InstrumentContainerProps {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
    instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = (
    {
        instrument,
        state,
        dispatch,
    }: InstrumentContainerProps) => {
    const InstrumentComponent = instrument.component;
    const [synth, setSynth] = useState(
        new Tone.Synth({
            oscillator: {type: 'sine'} as Tone.OmniOscillatorOptions,
        }).toDestination(),
    );

    const notes = state.get('notes');
    const instruments = state.get("instrument");

    useEffect(() => {
        if (notes && synth) {
            let eachNote = notes.split(' ');
            let noteObjs = eachNote.map((note: string, idx: number) => ({
                idx,
                time: `+${idx / 4}`,
                note,
                velocity: 1,
            }));

            new Tone.Part((time, value) => {

                if (instruments.name === "jc305-Xylophone") {
                    const note = new Tone.Sampler({
                        urls: {
                            C1: "xylophone-c.wav",
                            D2: "xylophone-d1.wav",
                            E3: "xylophone-e1.wav",
                            F4: "xylophone-f.wav",
                            G5: "xylophone-g.wav",
                            A6: "xylophone-a.wav",
                            B7: "xylophone-b.wav",
                            C2: "C2.mp3"
                        },
                        baseUrl: "http://localhost:3000/",
                        onload: () => {
                            note.triggerAttackRelease(value.note, "4n", time, value.velocity);
                        },
                    }).toDestination();

                } else if (instruments.name === "Piano") {
                    synth.triggerAttackRelease(value.note, "4n", time, value.velocity);

                }
                if (value.idx === eachNote.length - 1) {
                    dispatch(new DispatchAction("STOP_SONG"));
                }
            }, noteObjs).start(0);

            Tone.Transport.start();

            return () => {
                Tone.Transport.cancel();
            };
        }

        return () => {
        };
        // eslint-disable-next-line
    }, [notes, synth, dispatch]);

    return (
        <div>
            <TopNav name={instrument.name}/>
            <div
                className={'bg-white absolute right-0 left-0'}
                style={{top: '4rem'}}
            >
                <InstrumentComponent
                    name={instrument.name}
                    state={state}
                    dispatch={dispatch}
                    synth={synth}
                    setSynth={setSynth}
                />
            </div>
        </div>
    );
};