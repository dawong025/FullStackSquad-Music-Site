// 3rd party library imports
import * as Tone from 'tone';
import React from 'react';
// project imports
import {Instrument} from '../Instruments';
import CNoteImg from "../img/XyloCNote.png";
import DNoteImg from "../img/XyloDNote.png";
import ENoteImg from "../img/XyloENote.png";
import FNoteImg from "../img/XyloFNote.png";
import GNoteImg from "../img/XyloGNote.png";
import ANoteImg from "../img/XyloANote.png";
import BNoteImg from "../img/XyloBNote.png";
import CApostrophe from "../img/XyloC'Note.png";


/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

export function Xylophone(): JSX.Element {
    const note = new Tone.Sampler({
        urls: {
            C1: "xylophone-c.wav",
            D2: "xylophone-d1.wav",
            E3: "xylophone-e1.wav",
            F4: "xylophone-f.wav",
            G5: "xylophone-g.wav",
            A6: "xylophone-a.wav",
            B7: "xylophone-b.wav",
            C2: "xylophone-c2.wav",
        },
        baseUrl: "http://localhost:3000/",

    }).toDestination();
    return (
        <div>
            <div className="xylophone-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginLeft: 'auto',
                marginRight: 'auto',
                cursor: 'pointer'

            }}>
                <img className="CNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("C1", "10n");
                    }}
                    src={CNoteImg}
                    alt="red"


                    style={{
                        width: '100px',
                        background: 'red',
                        height: '280px',
                    }}
                />
                <img className="DNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("D2", "10n");
                    }}
                    src={DNoteImg}
                    alt="orange"

                    style={{
                        width: '100px',
                        background: '#edb262',
                        height: '260px'
                    }}
                />
                <img className="ENoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("E3", "10n");
                    }}
                    src={ENoteImg}
                    alt="yellow"

                    style={{
                        width: '100px',
                        background: '#f1e554',
                        height: '240px'
                    }}
                />
                <img className="FNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("F5", "10n");
                    }}
                    src={FNoteImg}
                    alt="green"

                    style={{
                        width: '100px',
                        background: '#9acd5b',
                        height: '220px'
                    }}
                />
                <img className="GNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("G5", "10n");
                    }}
                    src={GNoteImg}
                    alt="darkerGreen"

                    style={{
                        width: '100px',
                        background: '#3ab369',
                        height: '200px'
                    }}
                />
                <img className="ANoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("A6", "10n");
                    }}
                    src={ANoteImg}
                    alt="purple"

                    style={{
                        width: '100px',
                        background: '#6d4098',
                        height: '180px'
                    }}
                />
                <img className="BNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("B7", "10n");
                    }}
                    src={BNoteImg}
                    alt="pink"

                    style={{
                        width: '100px',
                        background: '#dc63dc',
                        height: '160px'
                    }}
                />
                <img className="CApostropheNoteImage"
                    onMouseDown={() => {
                        note.triggerAttackRelease("C2", "10n");
                    }}
                    src={CApostrophe}
                    alt={"salmon"}
                    style={{
                        width: '100px',
                        background: '#e45155',
                        height: '140px'
                    }}
                />

            </div>
        </div>
    );
}

export const XylophoneInstrument = new Instrument("jc305-Xylophone", Xylophone);