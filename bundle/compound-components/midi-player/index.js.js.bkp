import {MidiReader, MidiReaderEvent} from "/bundle/components/midi-reader/index.js";
import Soundfont from "/web-piano/web_modules/soundfont-player.js";
export var MidiPlayerState;
(function(MidiPlayerState2) {
  MidiPlayerState2[MidiPlayerState2["playing"] = 0] = "playing";
  MidiPlayerState2[MidiPlayerState2["paused"] = 1] = "paused";
  MidiPlayerState2[MidiPlayerState2["idle"] = 2] = "idle";
})(MidiPlayerState || (MidiPlayerState = {}));
export class MidiPlayer {
  constructor() {
    this.state = 2;
    this.reader = new MidiReader();
    this.reader.on(MidiReaderEvent.noteOn, this.onNoteOn.bind(this));
  }
  getState() {
    return this.state;
  }
  play() {
    this.changeState(0);
    this.reader.startReading();
  }
  pause() {
    this.changeState(1);
    this.reader.stopReading();
  }
  stop() {
    this.changeState(2);
    this.reader.stopReading();
  }
  async loadUrl(url) {
    const enterState = this.getState();
    if (enterState == 0) {
      this.stop();
    }
    await this.reader.loadUrl(url);
    const audioContext = new AudioContext();
    this.instrument = await Soundfont.instrument(audioContext, "acoustic_grand_piano");
    if (enterState == 0) {
      this.play();
    }
  }
  onStateChange(handler) {
    this.onStateChangeHandler = handler;
  }
  changeState(state) {
    this.state = state;
    if (this.onStateChangeHandler) {
      this.onStateChangeHandler({
        state
      });
    }
  }
  onNoteOn(event) {
    this.instrument.play(event.noteName);
  }
}
