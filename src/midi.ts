import MidiPlayerJS from 'midi-player-js';
import { base64ArrayBuffer } from './utils';

export class MidiPlayer {

    async play() {
        // const instrument = await load instrument

        // Initialize player and register event handler
        const player = new MidiPlayerJS.Player(function(event:any) {
            console.log(event);
            // event.name = "Note on"
            // event.noteName = "C4"

            // instrument.play(event.noteName)
        });

        const midiData = await this.load();
        await player.loadDataUri(midiData);
        // player.play();
    }

    async load() {
        const response = await fetch('/midi/DavyJones.midi');
        // const reader = await response.body.getReader();
        // const result = await reader.read();
        // const encoded = btoa(result);

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const encoded = base64ArrayBuffer(arrayBuffer);


        const dataUri = 'data:audio/midi;base64,' + encoded;


        return dataUri;
    }
}
