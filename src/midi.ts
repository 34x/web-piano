import MidiPlayerJS from 'midi-player-js';
import Soundfont from 'soundfont-player';
import { base64ArrayBuffer } from './utils';

export class MidiPlayer {
    ac: AudioContext;
    player: any;

    constructor() {
        this.ac = new AudioContext();
    }

    async play() {
        const instrument = await Soundfont.instrument(this.ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' });

        this.player = new MidiPlayerJS.Player(function(event: any){
            // console.log(event);
            if(!(event.velocity > 0 && event.name == "Note on")) {
                return
            }
            instrument.play(event.noteName);
        });

        const midiData = await this.load();
        await this.player.loadDataUri(midiData);

        this.player.play();
    }

    stop () {
        this.player.stop();

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
