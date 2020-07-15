import MidiPlayerJS from 'midi-player-js';
import Soundfont from 'soundfont-player';
import { base64ArrayBuffer } from './utils';

export class MidiPlayer {

    async play() {
        const ac = new AudioContext()
        const instrument = await Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' });
        console.log(instrument);

        // Initialize player and register event handler
        const player = new MidiPlayerJS.Player(function(event: any) {
            console.log(event);
            if(!(event.velocity > 0 && event.name == "Note on")) {
                return
            }
            instrument.play(event.noteName)
        });

        const midiData = await this.load();
        await player.loadDataUri(midiData);
        player.play();
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
