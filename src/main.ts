import { hello } from './hello';
import { hello as hello2 } from './hello2';
import { MidiPlayer } from './midi';

export function main() {
    hello('Hello 1');
    hello2('Hello 2');
    const player = new MidiPlayer();
    player.play();
}