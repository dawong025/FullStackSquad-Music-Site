// NOTE: TRUMPET HAS NOT BEEN IMPLEMENTED YET

// 3rd party
import {List, Map} from 'immutable';

// project dependencies
import {BassInstrument} from './instruments/bass';
import {MilkdropVisualizer} from './visualizers/Milkdrop';
import {PianoInstrument} from './instruments/Piano';
import {XylophoneInstrument} from './instruments/Xylophone';
import {WaveformVisualizer} from './visualizers/Waveform';
import {JC305Visualizer} from './visualizers/jc305';
import {dawong025Visualizer} from './visualizers/dawong025';
import {TrumpetInstrument} from './instruments/dawong025';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, TrumpetInstrument, XylophoneInstrument, BassInstrument]);       // similar to Instrument[]


/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, JC305Visualizer, dawong025Visualizer, MilkdropVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
    'instruments': instruments,
    'visualizers': visualizers,
});