import {InstrumentState} from "./types.d.js";
export class SoundfontInstrument {
  constructor() {
    this.currentState = InstrumentState.created;
  }
  configure() {
  }
  getState() {
    return this.currentState;
  }
  playNote(note) {
  }
  stopNote(note) {
  }
}
