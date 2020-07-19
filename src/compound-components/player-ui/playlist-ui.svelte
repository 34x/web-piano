<script>
    import contents from 'public/midi/contents.json'
    import { createEventDispatcher } from 'svelte';
    import { setContext } from 'svelte';

    const dispatch = createEventDispatcher();
    let selectedIndex: number = 2
    const contentsSorted = contents.sort((a, b) => a.title > b.title);

    function songChanged(content) {
        dispatch('songSelected', content)
    }

    function createSongChangeHandler(content) {
        const a = function () {
            songChanged(content);
        }
        return a;
    }
</script>


<center>
    <h2>Playlist</h2>
    <ul>
		{#each contentsSorted as content, index}
			<li on:click={createSongChangeHandler(content)} class:selected={selectedIndex === index}>
				{content.title}
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
        cursor: pointer;
        padding: 0.8em;
        border-bottom: 1px solid lightgray;
    }

    .selected {
        background-color: rgba(200, 200, 200, 1);
    }
</style>