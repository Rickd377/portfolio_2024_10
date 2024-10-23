const fs = require('fs');
const path = require('path');
const terser = require('terser');

const inputFilePath = path.resolve(__dirname, 'js/typewriter.js');
const outputFilePath = path.resolve(__dirname, 'js/typewriter.min.js');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        return;
    }

    terser.minify(data).then(result => {
        if (result.error) {
            console.error('Error during minification:', result.error);
            return;
        }

        fs.writeFile(outputFilePath, result.code, err => {
            if (err) {
                console.error('Error writing the output file:', err);
                return;
            }

            console.log('JavaScript has been minified and saved to', outputFilePath);
        });
    }).catch(err => {
        console.error('Error during minification:', err);
    });
});