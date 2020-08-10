import {InstrumentState} from "./instrument.js";
import Soundfont from "/web-piano/web_modules/soundfont-player.js";
export class SoundfontInstrument {
  constructor() {
    this.currentState = InstrumentState.created;
    this.audioContext = new AudioContext();
    this.name = "acoustic_grand_piano";
  }
  configure(params) {
    const {name} = params;
    this.name = name;
  }
  getState() {
    return this.currentState;
  }
  playNote(note) {
    this.instrument.play(note);
  }
  stopNote(note) {
  }
  async load() {
    const nameToUrl = (name, sf, format) => {
      format = "mp3";
      return "https://gleitz.github.io/midi-js-soundfonts/" + sf + "/" + name + "-" + format + ".js";
    };
    this.instrument = await Soundfont.instrument(this.audioContext, this.name, {
      soundfont: "FatBoy",
      nameToUrl
    });
  }
}
