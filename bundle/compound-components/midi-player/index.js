import {MidiReader, MidiReaderEvent} from "/web-piano/bundle/components/midi-reader/index.js";
import {SoundfontInstrument} from "/web-piano/bundle/components/instrument/index.js";
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
    this.reader.on(MidiReaderEvent.tick, this.onTick.bind(this));
    this.reader.on(MidiReaderEvent.trackEnd, this.stop.bind(this));
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
  getInfo() {
    return this.reader.getMidiInfo();
  }
  getPlayedPercent() {
    return this.reader.getPlayedPercent();
  }
  async loadUrl(url) {
    const enterState = this.getState();
    if (enterState == 0) {
      this.stop();
    }
    await this.reader.loadUrl(url);
    await this.loadInstruments();
    if (enterState == 0) {
      this.play();
    }
  }
  onStateChange(handler) {
    this.onStateChangeHandler = handler;
  }
  onProgressChange(handler) {
    this.onProgressChangeHandler = handler;
  }
  async loadInstruments() {
    this.instruments = {};
    const instrumentsChannel = this.reader.getMidiInfo().instrumentsChannel;
    const instrumentChannelKeys = Object.keys(instrumentsChannel);
    for (let i = 0; i < instrumentChannelKeys.length; i++) {
      const instrument3 = new SoundfontInstrument();
      const instrumentName = instrumentsChannel[parseInt(instrumentChannelKeys[i], 10)];
      const channel = instrumentChannelKeys[i];
      instrument3.configure({
        name: instrumentName
      });
      await instrument3.load();
      this.instruments[channel] = instrument3;
    }
  }
  getInstrument(channel) {
    const instrument3 = this.instruments[channel];
    if (instrument3) {
      return instrument3;
    }
    return this.instruments[0];
  }
  changeState(state) {
    this.state = state;
    if (this.onStateChangeHandler) {
      this.onStateChangeHandler({
        state
      });
    }
  }
  onTick(event) {
    if (this.onProgressChangeHandler) {
      this.onProgressChangeHandler({
        progress: this.getPlayedPercent()
      });
    }
  }
  onNoteOn(event) {
    this.getInstrument(event.channel).playNote(event.noteName);
  }
}
