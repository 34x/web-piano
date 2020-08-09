import { Instrument, InstrumentState } from './instrument';
import Soundfont from 'soundfont-player';

export type SoundfontInstrumentConfiguration = {
    name: string;
}

export class SoundfontInstrument implements Instrument {
    private currentState: InstrumentState;
    private audioContext: any;
    private instrument: any;
    private name: Soundfont.InstrumentName;

    constructor() {
        this.currentState = InstrumentState.created;
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
        const nameToUrl = (name: string, sf: string, format: string) => {
            format = 'mp3';
            return 'https://gleitz.github.io/midi-js-soundfonts/' + sf + '/' + name + '-' + format + '.js'
        };

        this.instrument = await Soundfont.instrument(this.audioContext, this.name, { soundfont: 'FatBoy', nameToUrl: nameToUrl}); 
    }
}