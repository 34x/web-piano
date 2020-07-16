import { Instrument, InstrumentState } from './types.d';

export type SoundfontInstrumentConfiguration = {
    name: string;
}

export class SoundfontInstrument implements Instrument {
    private currentState: InstrumentState = InstrumentState.created;
    private audioContext: any;

    constructor() {
        // this.audioContext = new AudioContext()
    }

    configure() {

    }

    getState() {
        return this.currentState;
    }

    playNote(note: string) {

    }

    stopNote(note: string) {

    }
}