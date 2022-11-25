const fs = require("fs");
const http = require('http');
const PORT = 8899;
const api = {
    APPEND:"/append",
}
//create server
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> </head> <body> <h2> Perform the Actions </h2><br> <a href="/createfile" class="btn btn-success" id="c">CreateFile</a>  <a href="/fileexists" class="btn btn-primary">FileExists</a> <a href="/append" class="btn btn-danger">AppendFile</a>  <a href="/deletefile" class="btn btn-dark">DeleteFile</a></body> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> </html>');
    }
    else if (req.url == "/createfile") {
        //if file exists
        if (fs.existsSync("newcreated.txt")) {
            res.end('<html> Alread Exists !<a href="/" class="btn btn-success" id="c">HOME</a></html>');
        }
        else {
            //create file
            fs.writeFile('newcreated.txt', "welcome guys !", (err) => {
                if (err) throw err
                else res.end('<html> File Created <a href="/" class="btn btn-success" id="c">HOME</a></html>');
            })
        }
    }
    else if (req.url == "/fileexists") {
        if (fs.existsSync("newcreated.txt")) {
            //read file
            let data = fs.readFileSync("newcreated.txt")
            res.end(data.toString());
        }
        else {
            res.end('<html> file not exists <a href="/" class="btn btn-success" id="c">HOME</a></html>');
        }
    }
    else if (req.url == "/deletefile") {
        if (fs.existsSync("newcreated.txt")) {
            //delete file
            fs.unlink("newcreated.txt", (err) => {
                if (err) throw err
                else res.end('<html> file deleted <a href="/" class="btn btn-success" id="c">HOME</a></html>')
            })
        }
        else {
            res.end('<html> file not deleted <a href="/" class="btn btn-success" id="c">HOME</a></html>');
        }
    }
    else if (req.url == api.APPEND) {
        if (fs.existsSync("newcreated.txt")) {
            //append data
            fs.appendFile("newcreated.txt", "Data Added !", (err) => {
                if (err) throw err
                else res.end('<html> file append done <a href="/" class="btn btn-success" id="c">HOME</a></html>')
            })
        }
        else {
            res.end('<html> File append error <a href="/" class="btn btn-success" id="c">HOME</a></html>');
        }
    }

    else {
        res.end('Invalid Request')
    }
})

server.listen(PORT, (err) => {
    if (err) throw err
    else console.log(`server work on ${PORT}`)
})