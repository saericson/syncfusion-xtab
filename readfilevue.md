<!-- File input.  When changed, file inputs produce a FileList object (this.files) - the first item within being the first selected file.

<template>
    <input type="file" onchange="fileChange(this.files[0])" />    
</template>

<script>
import { readFile } from 'fs';

export default {
    name:readFile,

methods:{

    // this is from https://www.linuxscrew.com/javascript-read-json-file
    // hopefully it can be made to work 
    // it will need to be invoked async with await in the right place...
    // Function to read the JSON from a file - returns a promise containing the parsed JSON
        readJSONFile(file) {
        // Function will return a new Promise which will resolve or reject based on whether the JSON file is read and parsed successfully
        return new Promise((resolve, reject) => {
            // Define a FileReader Object to read the file
            const fileReader = new FileReader();
            // Specify what the FileReader should do on the successful read of a file
            fileReader.onload = event => {
                // If successfully read, resolve the Promise with JSON parsed contents of the file
                resolve(JSON.parse(event.target.result))
            };
            // If the file is not successfully read, reject with the error
            fileReader.onerror = error => reject(error);
            // Read from the file, which will kick-off the onload or onerror events defined above based on the outcome
            fileReader.readAsText(file);
        });
    },

    // Function to be triggered when file input changes
    // async function  
    fileChange(file){
        // As readJSONFile is a promise, it must resolve before the contents can be read - in this case logged to the console
        // eslint-disable-next-line no-console
        this.readJSONFile(file).then(json => console.log(json));
    }


}

}


    
</script>
     -->
