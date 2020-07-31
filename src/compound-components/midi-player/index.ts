import { MidiReader, MidiReaderEvent } from 'src/components/midi-reader';
import Soundfont from 'soundfont-player';

export enum MidiPlayerState {
    playing,
    paused,
    idle
}

export class MidiPlayer {
    private state: MidiPlayerState;
    private reader: MidiReader;
    private instrument: any;
    private onStateChangeHandler: (event: any) => void;
    private onProgressChangeHandler: (event: any) => void;

    constructor() {
        this.state = MidiPlayerState.idle
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
        const enterState = this.getState();
        if(enterState == MidiPlayerState.playing) {
            this.stop();
        }
        await this.reader.loadUrl(url);
        const audioContext = new AudioContext();
        this.instrument = await Soundfont.instrument(audioContext, 'acoustic_grand_piano');
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
        this.instrument.play(event.noteName)
        
    }
}