<script>
    import { MidiPlayer, MidiPlayerState } from 'src/compound-components/midi-player';

    export let fileInfo;
    const player = new MidiPlayer();

    let playerState = player.getState();
    player.onStateChange(event => playerState = event.state);


    function loadSongUrl(filename) {
        player.loadUrl('/midi/' + filename);
    }

    function startNewSong(info) {
        if (info) {
            loadSongUrl(info.filename);
        }
    }

    $:{startNewSong(fileInfo)};

    function playBtnHandler() {
        if(player.getState() === MidiPlayerState.playing) {
            player.stop();
        } else {
            player.play();
        }
    }

    const getButtonImage = (state) => state === MidiPlayerState.playing ? './pause.png' : './play.png';

    $: buttonImage = getButtonImage(playerState);

</script>

<center>
    <img on:click={playBtnHandler} src={buttonImage} alt="кнопка играть">
</center>

<style>
    img {
        width: 128px;
        height: 128px;
        cursor: pointer;
}
</style>