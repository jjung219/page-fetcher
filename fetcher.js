const request = require('request');
const args = process.argv.slice(2);
const fs = require('fs');
const filename = args[1];
const url = args[0];

request(url, (error, response, body) => {
  //how to get the filesize - https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js
  let fileSize = fs.statSync(filename);
  let fileSizeBytes = fileSize['size'];


  // how to write file - https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
  fs.writeFile(filename, body, (err) => {
    if (err) {
      console.log("Could not read the file");
      console.log("Error: ", err);
    }
    console.log(`Downloaded and saved ${fileSizeBytes} bytes to ${filename}`);
  });
});

