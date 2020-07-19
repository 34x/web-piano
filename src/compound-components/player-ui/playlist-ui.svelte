<script>
    import contents from 'public/midi/contents.json'
    import { createEventDispatcher } from 'svelte';
    import { setContext } from 'svelte';


    const dispatch = createEventDispatcher();

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
    <ul>
		{#each contents as content}
			<li on:click={createSongChangeHandler(content)}>
				{content.title}
			</li>
		{/each}
    </ul>
</center>

<style>
    li {
        cursor: pointer;
        margin: 0.5em;
    }
</style>