<script>
    import ControlsUI from 'src/compound-components/player-ui/controls-ui'
    import PlaylistUI from 'src/compound-components/player-ui/playlist-ui'
    let currentSong;
    let currentMidi;
    function songSelected(event) {
        currentSong = event.detail;
    }
    function midiChanched(event) {
        currentMidi = event.detail;
    }
</script>

<style>
    .player-container {
        width: 80em;
    }

    .piece-info {
        margin: 0.4em;
        height: 2em;
    }
    .midi-info {
        margin: 0.4em;
        height: 2em;
    }
</style>

<div class="player-container">
    <div class="piece-info">
        {#if currentSong}
            Now playing: <b>{currentSong.title}</b> ({currentSong.filename})
        {:else}
            Please selecte a piece from playlist
        {/if}
    </div>
    <div class="midi-info">
        {#if currentMidi}
            Tempo: <b>{currentMidi.tempo}</b> 
            Tracks: <b>{currentMidi.tracks.length}</b> 
            Instruments: <b>{currentMidi.instruments.length}</b>
        {:else}
            Please selecte a piece from playlist for midi-info
        {/if}
    </div>
    <ControlsUI fileInfo={currentSong} on:midiChanched={midiChanched}/>
    <PlaylistUI selected={currentSong} on:songSelected={songSelected}/>
</div>