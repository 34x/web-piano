<script>
    import ControlsUI from 'src/compound-components/player-ui/controls-ui'
    import PlaylistUI from 'src/compound-components/player-ui/playlist-ui'
    let currentSong;
    function songSelected(event) {
        currentSong = event.detail;
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
</style>

<div class="player-container">
    <div class="piece-info">
        {#if currentSong}
            Now playing: <b>{currentSong.title}</b> ({currentSong.filename})
        {:else}
            Please selecte a piece from playlist
        {/if}
    </div>
    <ControlsUI fileInfo={currentSong}/>
    <PlaylistUI selected={currentSong} on:songSelected={songSelected}/>
</div>