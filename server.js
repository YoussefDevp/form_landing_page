
const { createServer } = require('node:http');
const fs = require('node:fs');
const querystring = require('querystring');
const path = require('path');


const server = createServer((req, res) => {

var url = req.url;
var fileName = "";

if (url === "/") {
    fileName = "index.html";
}

else if (url === "/thanks") {
    fileName = "thanksPage.html";
} 

else if (url === "/formulario")  {
    fileName = "formulario.html";
} else {
    fileName = "404.html";
}
    

   

if (req.method=='POST' && req.url == '/formulario') {
    let body =""
    req.on('data', chunk => {

        body += chunk.toString(); 
    });

    req.on('end', () => {
        console.log('Full Request body:', body);
        const formData = querystring.parse(body);
        console.log('form data: ', formData)

        console.log('form data: ', formData.puesto)
        res.end();
    
        const nombre = formData.nombre;
        const apellido = formData.apellido;
        const email = formData.email;
        const phone = formData.phone;
        const experiencia = formData.experiencia;
        const puesto = formData.puesto;

        const data = `Name: ${nombre}, LastName : ${apellido}, Email: ${email},Phone: ${phone}, experiencia: ${experiencia}, Puesto: ${puesto} \n`;

        fs.appendFile(path.join('', 'data.txt'), data, (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error saving data');
                return;
            }

        });


    })
    res.writeHead(302, { 'Location': '/thanks' });
    res.end();
}


fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
        res.statusCode = 404;
        res.writeHead(404, { 'Location': '/404' });
        res.end();
    }
    else {
        res.write(data.toString());
        res.end();
    } 
});

});


// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});


