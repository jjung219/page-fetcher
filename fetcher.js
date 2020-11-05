const request = require('request');
const args = process.argv.slice(2);
const fs = require('fs');
const filename = args[1];
const url = args[0];


request(url, (error, response, body) => {
  let fileSize = fs.statSync(filename);
  let fileSizeBytes = fileSize['size'];


  if (error === null && response.statusCode === 200) {
    fs.stat(filename, (err, stat) => {
      if (err == null) {
        fs.writeFile(filename, body, (err) => {
          console.log(`Downloaded and saved ${fileSizeBytes} bytes to ${filename}`);
        });
      } else if (err.code === 'ENOENT') {
        console.log('Error: Filepath you provided did not exist')
      } else {
        console.log('Some other error: ', err.code);
      }
    });
  } else {
    console.log('Error requesting a page:', response.statusCode, response.statusMessage)
  }
});



//how to get the filesize - https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js
// how to validate filepath - https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists
// how to write file - https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback$