import {InstrumentState} from "./types.d.js";
export class SilentInstrument {
  playNote(note) {
  }
  stopNote(note) {
  }
  getState() {
    return InstrumentState.ready;
  }
}
