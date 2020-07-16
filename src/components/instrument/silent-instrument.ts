import { Instrument, InstrumentState } from './types.d';

// this instrument may be used e.g. when a user wants to have a sound from a midi keyboard directly

export class SilentInstrument implements Instrument {
    playNote(note: string) {
        // just do nothing and carry on
    }

    stopNote(note: string) {
        // nothing was played, so nothing to stop
    }

    getState() {
        return InstrumentState.ready;
    }
}