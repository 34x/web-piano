<script>
    import { MidiPlayer, MidiPlayerState } from 'src/compound-components/midi-player';
    import { createEventDispatcher } from 'svelte';

    export let fileInfo = undefined;
    export let midiFileInfo = undefined;

    const dispatch = createEventDispatcher();
    
    const player = new MidiPlayer();
    
    let playerState = player.getState();
    let progress = 0;

    player.onStateChange(event => playerState = event.state);
    player.onProgressChange(event => progress = event.progress);


    async function loadSongUrl(filename) {
        await player.loadUrl('/midi/' + filename);
        midiFileInfo = player.getInfo();
    }

    function startNewSong(info) {
        if (info) {
            loadSongUrl(info.filename);
        }
    }

    $:{startNewSong(fileInfo)};
    $:{dispatch('midiChanched', midiFileInfo)};

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
    <div id="greyProgress">
        <div style="width: {progress}%" id="greenBar"></div>
      </div>
</center>

<style>
    img {
        width: 128px;
        height: 128px;
        cursor: pointer;
    }

    #greyProgress {
        text-align: left;
        width: 100%;
        background-color: #ddd;
        }

    #greenBar {
        width: 0%;
        height: 10px;
        background-color: #4CAF50;
        text-align: center;
        line-height: 10px;
        color: white;
    }
</style>