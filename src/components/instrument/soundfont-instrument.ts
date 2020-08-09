import { Instrument, InstrumentState } from './instrument';
import Soundfont from 'soundfont-player';

export type SoundfontInstrumentConfiguration = {
    name: string;
}

export class SoundfontInstrument implements Instrument {
    private currentState: InstrumentState = InstrumentState.created;
    private audioContext: any;
    private instrument: any;
    private name: Soundfont.InstrumentName;

    constructor() {
        this.audioContext = new AudioContext()
        this.name = 'acoustic_grand_piano'
    }

    configure(params: any) {
        const {name} = params
        this.name = name
    }

    getState() {
        return this.currentState;
    }

    playNote(note: string) {
        this.instrument.play(note);
    }

    stopNote(note: string) {

    }

    async load() {
        this.instrument = await Soundfont.instrument(this.audioContext, this.name, { soundfont: 'FatBoy' }); 
    }
}