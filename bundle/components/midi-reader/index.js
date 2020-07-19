import MidiPlayerJS from "https://github.com/34x/web-piano#readme/web_modules/midi-player-js.js";
import {base64ArrayBuffer} from "/bundle/utils.js";
export var MidiReaderEvent;
(function(MidiReaderEvent2) {
  MidiReaderEvent2[MidiReaderEvent2["noteOn"] = 0] = "noteOn";
  MidiReaderEvent2[MidiReaderEvent2["noteOff"] = 1] = "noteOff";
})(MidiReaderEvent || (MidiReaderEvent = {}));
export class MidiReader {
  constructor() {
    this.eventHandlers = {};
    this.reader = new MidiPlayerJS.Player(this.onReaderEvent.bind(this));
  }
  async loadDataUri(dataUri) {
    await this.reader.loadDataUri(dataUri);
  }
  async loadUrl(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const encoded = base64ArrayBuffer(arrayBuffer);
    const dataUri = "data:audio/midi;base64," + encoded;
    this.loadDataUri(dataUri);
  }
  startReading() {
    this.reader.play();
  }
  stopReading() {
    this.reader.stop();
  }
  on(event, handler) {
    this.eventHandlers[event] = handler;
  }
  onReaderEvent(event) {
    if (event.velocity > 0 && event.name == "Note on") {
      const handler = this.eventHandlers[0];
      if (handler) {
        handler({
          velocity: event.velocity,
          noteName: event.noteName,
          originalEvent: event
        });
      }
    }
  }
}
