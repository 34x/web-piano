import {InstrumentState} from "./instrument.js";
export class SilentInstrument {
  playNote(note) {
  }
  stopNote(note) {
  }
  getState() {
    return InstrumentState.ready;
  }
  load() {
  }
}
