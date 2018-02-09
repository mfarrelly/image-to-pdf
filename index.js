var PDFDocument = require("pdfkit");
var fs = require("fs");
var args = require("args");

args
    .option("output", "The output PDF filename", "output.pdf")
    .option("files", "A list of files, comma separated. ie, file1.jpg,file2.jpg");

const flags = args.parse(process.argv)

// Create a document 
var doc = new PDFDocument();
 
// Pipe its output somewhere, like to a file or HTTP response 
// See below for browser usage 
doc.pipe(fs.createWriteStream(flags.output));

// Add an image, constrain it to a given size
var imageOptions = {
    fit: [615, 792], // 72 px per inch
    x: 0, y: 0
};

var files = flags.files.split(",");
for (var i in files) {
    if (i > 0) {
        doc.addPage();
    }
    doc.image(files[i], imageOptions);
}

// Finalize PDF file 
doc.end();