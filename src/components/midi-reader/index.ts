import MidiPlayerJS from 'midi-player-js';
import { base64ArrayBuffer } from 'src/utils';

export enum MidiReaderEvent {
	noteOn,
	noteOff,
	tick,
	trackEnd
}

export type MidiEventHandler = (event: any) => void;

export class MidiReader {
	private eventHandlers: { [Key in MidiReaderEvent]?: MidiEventHandler };
	private reader: MidiPlayerJS.Player;

	constructor() {
		this.eventHandlers = {};
		this.reader = new MidiPlayerJS.Player(this.onReaderEvent.bind(this));
	}

	async loadDataUri(dataUri: string) {
		// clear list of instruments before load new MidiFile
		// because MidiPlayer has a bug with instuments update
		this.reader.instruments = [];
		await this.reader.loadDataUri(dataUri);
	}

	async loadUrl(url: string) {
		const response = await fetch(url);

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const encoded = base64ArrayBuffer(arrayBuffer);


        const dataUri = 'data:audio/midi;base64,' + encoded;

        this.loadDataUri(dataUri);
	}

	startReading() {
		this.reader.play();
	}

	stopReading() {
		this.reader.stop();
	}

	on(event: MidiReaderEvent, handler: MidiEventHandler) {
		this.eventHandlers[event] = handler;
	}

	getMidiInfo():{tempo: number, tracks:any, instruments:any} {
        const info = {
			tempo: this.reader.tempo,
			tracks: this.reader.tracks,
			instruments: this.reader.instruments,
        }
        return info
	}

	getPlayedPercent(): number {
		const totalTicks = (this.reader as any).totalTicks;
		const currentTick = this.reader.getCurrentTick();
		return currentTick / (totalTicks / 100)
	}

	private onReaderEvent(event: any) {
		if(event.velocity > 0 && event.name == "Note on") {
			const handler = this.eventHandlers[MidiReaderEvent.noteOn];
			if (handler) {
				handler({ velocity: event.velocity, noteName: event.noteName, originalEvent: event });
			}
		}
		if(event.tick) {
			const handler = this.eventHandlers[MidiReaderEvent.tick];
			if (handler) {
				handler({originalEvent: event });
			}
		}
		if(event.name == "End of Track") {
			const handler = this.eventHandlers[MidiReaderEvent.trackEnd];
			if (handler) {
				handler({originalEvent: event });
			}
		}
	}
}