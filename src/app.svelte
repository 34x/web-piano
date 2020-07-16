<script>
    import { MidiPlayer, MidiPlayerState } from 'src/compound-components/midi-player';


    const player = new MidiPlayer();

    let playerState = player.getState();
    player.onStateChange(event => playerState = event.state);

    player.loadUrl('/midi/DavyJones.midi');

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
    <h1>web-piano</h1>
    <img on:click={playBtnHandler} src={buttonImage} alt="кнопка играть">
</center>

    <style>
        img {
            width: 128px;
            height: 128px;
            cursor: pointer;
    }
    </style>