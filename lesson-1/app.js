const fs = require('fs');
const path = require('path');

// const s = path.join(__dirname, 'netflix', 'page.txt');


// const filePath = __dirname + '/dir/file.txt';
const fileNet = path.join(__dirname, 'netflix', 'page.txt');


// зчитуєм файл
fs.readFile(fileNet, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data.toString());
})

// fs.rename(filePath, `${fileNet}/page.txt`, (err) => {
//     if(err) {
//         console.log(err);
//     }
// })

// fs.readdir(filePath, (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(files);
// })
// fs.writeFile(filePath, 'Hell World\n', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.appendFile(filePath, 'Hello Alex', (err) => {
//     if (err) {
//         console.log(err);
//     } 
// });

// fs.mkdir(`${__dirname}/netflix`, {recursive: true}, (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

// fs.rmdir(`${__dirname}/netflix`, {recursive: true}, (err) => {
//     if (err) {
//         console.log(err);
//     }
// })