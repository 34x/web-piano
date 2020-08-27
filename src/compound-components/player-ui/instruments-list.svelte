<script>
    import { MidiPlayer} from 'src/compound-components/midi-player';
    import { createEventDispatcher } from 'svelte';
    import { getInstrumentsName }from 'src/components/instrument/instruments_list'

    export let player;
    export let midiFileInfo;

    let instruments;
    let allInstrumentsName = ["string_ensemble_1", "fretless_bass", "pan_flute", "choir_aahs", "voice_oohs", "synthstrings_1", "acoustic_guitar_steel", "acoustic_grand_piano", "guitar_fret_noise"];
    let channels;
    let selected = {};

    async function loadNewInstrument (selected) {
        await player.setInstruments(selected);
    }

    $:instruments = midiFileInfo ? midiFileInfo.instrumentsChannel : undefined;
    $:instrumentsName = midiFileInfo ? getInstrumentsName(midiFileInfo.instruments) : allInstrumentsName;
    $:channels = midiFileInfo ? Object.keys(midiFileInfo.instrumentsChannel) : undefined ;  
    $:loadNewInstrument (selected);
</script>

<div class="instruments">
    {#if midiFileInfo}
        {#each channels as channel, i}
            <div class="instruments__block">
                <span class="channel">Channel {channel}:</span>
                <select bind:value="{selected[channel]}">
                    {#each instrumentsName as instrument, index}
                    <option value="{instrument}">{instrument}</option>
                    {/each}
                </select> 
            </div>
        {/each}
    {/if}
</div>