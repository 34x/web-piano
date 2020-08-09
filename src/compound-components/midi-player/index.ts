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
    private instruments: {[key:number]: Instrument};
    private instrumentsCash: {[key:string]: Instrument}
    private onStateChangeHandler: (event: any) => void;
    private onProgressChangeHandler: (event: any) => void;

    constructor() {
        this.state = MidiPlayerState.idle
        this.reader = new MidiReader();
        this.reader.on(MidiReaderEvent.noteOn, this.onNoteOn.bind(this));
        this.reader.on(MidiReaderEvent.tick, this.onTick.bind(this));
        this.reader.on(MidiReaderEvent.trackEnd, this.stop.bind(this));
        this.reader.on(MidiReaderEvent.programChange, this.onInstrumentChange.bind(this));
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
        const enterState = this.getState();
        if(enterState == MidiPlayerState.playing) {
            this.stop();
        }
        await this.reader.loadUrl(url);
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
    onInstrumentChange(event: any) {
        this.instruments[event.channel] = this.instrumentsCash[event.instrumentName];
    }

    

    private async loadInstruments() {

        this.instruments = [];
        this.instrumentsCash = {};

        const instrumentsName = this.reader.getMidiInfo().instruments.map(getInstrumentByNumber);
        // this.instruments.push(new SilentInstrument());
        for (let instrument of instrumentsName) {
            try{
                const i = new SoundfontInstrument();
                i.configure({name: instrument})
                await i.load()
                this.instrumentsCash[instrument] = i
            }
            catch(error) {
                console.error(error)
            }
            
        }
        const i = new SoundfontInstrument();
        await i.load()
        this.instruments[0] = i
    }

    private getInstrument(channel: number):Instrument {
        const instrument = this.instruments[channel]
        console.log(this.instruments[channel]);
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