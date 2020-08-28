import { MidiReader, MidiReaderEvent } from 'src/components/midi-reader';
import { Instrument, SoundfontInstrument, SilentInstrument } from 'src/components/instrument';
import { getInstrumentByNumber }from 'src/components/instrument/instruments_list'
import { instrument } from 'soundfont-player';

export enum MidiPlayerState {
    playing,
    paused,
    idle
}

export class MidiPlayer {
    private state: MidiPlayerState;
    private reader: MidiReader;
    private instruments: {[key:string]: Instrument};
    private instrumentsCashe: {[key:string]: Instrument}
    private onStateChangeHandler: (event: any) => void;
    private onProgressChangeHandler: (event: any) => void;

    constructor() {
        this.instrumentsCashe = {};
        this.state = MidiPlayerState.idle;
        this.reader = new MidiReader();
        this.reader.on(MidiReaderEvent.noteOn, this.onNoteOn.bind(this));
        this.reader.on(MidiReaderEvent.tick, this.onTick.bind(this));
        this.reader.on(MidiReaderEvent.trackEnd, this.stop.bind(this));
    }

    getState(): MidiPlayerState {
        return this.state;
    }

    play() {
        this.changeState(MidiPlayerState.playing);
        this.reader.startReading();
    }

    pause() {
        this.changeState(MidiPlayerState.paused);
        this.reader.stopReading();
    }

    stop() {
        this.changeState(MidiPlayerState.idle);
        this.reader.stopReading();
    }

    getInfo() {
        return this.reader.getMidiInfo();
    }

    getPlayedPercent() {
		return this.reader.getPlayedPercent();
    }
    
    async loadUrl(url: string) {
        await this.load(url, this.reader.loadUrl.bind(this.reader));
    }
    
    async loadUserMidi(dataUri: string) {
        await this.load(dataUri, this.reader.loadDataUri.bind(this.reader));
    }
    
    private async load(data: string, callback: Function) {
        const enterState = this.getState();
        if(enterState == MidiPlayerState.playing) {
            this.stop();
        }
        await callback(data);
        await this.loadInstruments();
        
        if(enterState == MidiPlayerState.playing) {
            this.play();
        }
    }

    // setInstrument(instrument: any, track: number) {

    // }

    onStateChange(handler: (event: any) => void) {
        this.onStateChangeHandler = handler;
    }
    onProgressChange(handler: (event: any) => void) {
        this.onProgressChangeHandler = handler;
    }
    
    private async loadSingleInstrument(name: string) {
        const instrument = new SoundfontInstrument();
        instrument.configure({name: name})
        await instrument.load()
        return instrument
    }
    
    private async getInstrumentFromCashe(name: string) {
        let instrument = this.instrumentsCashe[name];
        if (instrument) {
            return instrument
        } 
        instrument = await this.loadSingleInstrument(name);
        this.instrumentsCashe[name] = instrument;
        return instrument 
    }

    private async loadInstruments() {
        this.instruments = {};
        const instrumentsChannel = this.reader.getMidiInfo().instrumentsChannel;        
        const instrumentChannelKeys = Object.keys(instrumentsChannel);
        for (let i = 0; i < instrumentChannelKeys.length; i++) {
            const instrumentName = instrumentsChannel[parseInt(instrumentChannelKeys[i], 10)];
            const channel = instrumentChannelKeys[i];
            const instrument = await this.getInstrumentFromCashe(instrumentName);
            this.instruments[channel] = instrument;
        }

    }

    private getInstrument(channel: number):Instrument {
        const instrument = this.instruments[channel]
        if (instrument) {
            return instrument
        }
        return this.instruments[0];
    }

    private changeState(state: MidiPlayerState) {
        this.state = state;
        if (this.onStateChangeHandler) {
            this.onStateChangeHandler({ state: state });
        }
    }

    private onTick(event: any) {
        if (this.onProgressChangeHandler) {
            this.onProgressChangeHandler({ progress: this.getPlayedPercent() });
        }
    }

    private onNoteOn(event: any) {
        this.getInstrument(event.channel).playNote(event.noteName)
        
    }
}