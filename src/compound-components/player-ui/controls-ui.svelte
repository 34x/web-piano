<script>
    import { MidiPlayer, MidiPlayerState } from 'src/compound-components/midi-player';
    import { createEventDispatcher } from 'svelte';
    import FileInput from 'src/compound-components/player-ui/file-input'

    export let fileInfo = undefined;
    export let midiFileInfo = undefined;

    const dispatch = createEventDispatcher();
    
    const player = new MidiPlayer();
    
    let playerState = player.getState();
    let progress = 0;
    let loading;

    player.onStateChange(event => playerState = event.state);
    player.onProgressChange(event => progress = event.progress);


    async function loadSongUrl(filename) {
        loading = true;
        await player.loadUrl('/midi/' + filename);
        loading = false;
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

    async function userFileLoad(event) {
        loading = true;
        await player.loadUserMidi(event.detail);
        loading = false;
        midiFileInfo = player.getInfo();
    }
</script>

<center>
    <FileInput on:input={userFileLoad}></FileInput>
    {#if !midiFileInfo}
    <button class="play-btn" disabled style="filter: opacity(0.5);">
        <img  src={buttonImage} alt="кнопка играть" >
    </button>
    {:else}
        {#if loading}
            <button class="play-btn" disabled style="cursor: auto;">
                <img class="image" src="./loading.png" alt="">
            </button>
        {:else}
            <button class="play-btn" on:click={playBtnHandler}>
                <img  src={buttonImage} alt="кнопка играть">
            </button>
        {/if}

    {/if}
   
    <div id="greyProgress">
        <div style="width: {progress}%" id="greenBar"></div>
    </div>
</center>

<style>
    .image {
        -webkit-animation:spin 4s linear infinite;
        -moz-animation:spin 4s linear infinite;
        animation:spin 4s linear infinite;
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

    .play-btn {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: transparent;
        outline: none;
        cursor: pointer;
    }
    img {
        width: 128px;
        height: 128px;
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