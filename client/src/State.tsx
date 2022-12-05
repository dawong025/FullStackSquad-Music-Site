// NOTE: TRUMPET HAS NOT BEEN IMPLEMENTED YET

// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { XylophoneInstrument } from './instruments/Xylophone';
import { WaveformVisualizer } from './visualizers/Waveform';
<<<<<<< HEAD
import { JC305Visualizer } from './visualizers/jc305';
=======
import { dawong025Visualizer } from './visualizers/dawong025';
import { TrumpetInstrument } from './instruments/dawong025';
>>>>>>> dawong025


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
<<<<<<< HEAD
const instruments = List([PianoInstrument, XylophoneInstrument]);       // similar to Instrument[]
=======
const instruments = List([PianoInstrument, TrumpetInstrument]);       // similar to Instrument[]
>>>>>>> dawong025

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
<<<<<<< HEAD
const visualizers = List([WaveformVisualizer, JC305Visualizer]);    // similar to Visualizer[]
=======
const visualizers = List([WaveformVisualizer, dawong025Visualizer]);    // similar to Visualizer[]
>>>>>>> dawong025


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