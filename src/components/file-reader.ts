export async function readFile(input: any, player: any) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = await async function() {
        // console.log(reader.result);
        await player.loadUserMidi(reader.result);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };

}