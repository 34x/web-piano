<script>
    import ControlsUI from 'src/compound-components/player-ui/controls-ui'
    import PlaylistUI from 'src/compound-components/player-ui/playlist-ui'
    let currentSong;
    function songSelected(event) {
        console.log('song Select')
        console.log(event.detail)

        currentSong = event.detail;
    }
    // $:songSelected(currentSong)
  
</script>
<center>
    <ControlsUI fileInfo={currentSong}/>
    <PlaylistUI on:songSelected={songSelected}/>
    <h1>
        {#if currentSong}
            {currentSong.title} {currentSong.filename}
        {:else}
            Ничего не выбрано
        {/if}
    </h1>

</center>