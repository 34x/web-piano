export enum InstrumentState {
    created,
    ready,
    preparing,
    error
}

export interface Instrument {
    playNote(note: string): void;
    stopNote(note: string): void;
    load(): void;


    getState(): InstrumentState;
}