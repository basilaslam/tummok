import fs from 'fs';

// Function to process a file
function processFile(filename) {
  console.log(`Processing file: ${filename}`);

  // Read file asynchronously
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filename}`);
    } else {
      console.log(`File content: ${data}`);

      // Simulate additional processing
      setTimeout(() => {
        console.log(`File processing complete: ${filename}`);
      }, 2000);
    }
  });

  console.log(`Request to process file ${filename} has been initiated.`);
}

// Process multiple files
function processFiles(files) {
  files.forEach((file) => {
    processFile(file);
  });
}

// Array of files to process
const files = ['file1.txt', 'file2.txt', 'file3.txt'];

// Trigger file processing
processFiles(files);



/**
// eslint-disable-next-line max-len

When we call processFiles with an array of file names, it loops through each file and calls processFile for each one.

Inside processFile, we start the file processing by logging a message that indicates the file is being processed.

Then, we use the fs.readFile function to read the file asynchronously. Once the file is read, the callback function is executed.

If there is an error while reading the file, we log an error message. 

Otherwise, we log the content of the file and simulate additional processing using setTimeout with a delay of 2000 milliseconds (2 seconds).

Now from here we are using the event loop  When the file is being read asynchronously, the event loop allows other operations to continue without

waiting for the file reading to end. 

now the event loop start to execute the remaining code, such as logging the message indicating that the file processing request has been initiated.

After the specified delay in setTimeout, the callback function is placed in the event queue. 

When the event loop becomes available, it retrieves the callback function from the queue and executes it. 

This is when the message indicating that the file processing is complete gets logged.
 */
