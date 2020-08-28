<script>
    import { readFile } from 'src/components/file-reader'
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    let input;

    const dispatch = createEventDispatcher();

    function onFileLoaded(data) {
        dispatch('input', data);
    }
</script>

<div>
    <input bind:this={input} type="file" id="file" on:change={readFile(input, onFileLoaded)}>
</div>