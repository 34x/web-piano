<script>
    import { readFile } from 'src/components/file-reader'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let input;

    document.addEventListener("DOMContentLoaded", () => {
        input = document.getElementById('file');
        input.addEventListener('change' , loadBtnHandler)
    });

    function onFileLoaded(data) {
        dispatch('input', data);
    }

    async function loadBtnHandler() {
        await readFile(input, onFileLoaded);
    }
</script>

<div>
    <input type="file" id="file">
</div>