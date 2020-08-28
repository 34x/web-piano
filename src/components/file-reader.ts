export async function readFile(input: any, callback: Function) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async function() {
        // console.log(reader.result);
        callback(reader.result)
    };

    reader.onerror = function() {
        console.log(reader.error);
    };

}