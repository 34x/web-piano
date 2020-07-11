import MidiPlayerJS from 'midi-player-js';
import { base64ArrayBuffer } from './utils';

export class MidiPlayer {
    play() {
        // console.log(MidiPlayerJS);
        // Initialize player and register event handler
        const player = new MidiPlayerJS.Player(function(event:any) {
            console.log(event);
        });



        this.load().then(data => {

            // console.log(data)
            player.loadDataUri(data);
            // player.play();


        })
        // // Load a MIDI file



    }

    async load() {
        const response = await fetch('/midi/21_Guns.mid');
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
