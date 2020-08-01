<script>
    import { getContents } from 'src/components/midi-contents';
    import { createEventDispatcher } from 'svelte';
    import { setContext } from 'svelte';

    export let selected = undefined;

    const contents = getContents();

    const dispatch = createEventDispatcher();
    let selectedIndex = -1;

    const contentsSorted = contents.sort((a, b) => a.title.localeCompare(b.title));

    function songChanged(content) {
        dispatch('songSelected', content)
    }

    function getSelectedIndex(aList, selectedItem) {
        if (!selectedItem) {
            return -1;
        }

        return aList.findIndex((el) => el.filename === selectedItem.filename)
    }

    function createSongChangeHandler(content) {
        const a = function () {
            songChanged(content);
        }
        return a;
    }

    $: {
        selectedIndex = getSelectedIndex(contentsSorted, selected);
    }
</script>


<center>
    <h2>Playlist</h2>
    <ul>
        {#each contentsSorted as content, index}
            <li  class:selected={selectedIndex === index}>
                <span on:click={createSongChangeHandler(content)}>{content.title}</span>
                <a href="./public/midi/{content.filename}" download><img src="./download.png" alt="download"></a>
            </li>
        {/each}
     </ul>
</center>

<style>
    ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    li {
        text-align: left;
        padding: 0.8em;
        border-bottom: 1px solid lightgray;
        display: flex;
        justify-content: space-between;
    }

    span {
        cursor: pointer;
    }

    img {
        width: 20px;
        height: 20px;
        cursor: pointer;

    }

    .selected {
        background-color: rgba(200, 200, 200, 1);
    }
</style>