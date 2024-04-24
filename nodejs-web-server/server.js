const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');
    const { method, url } = request;

    // if (method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }

    // if (method === 'POST') {
    //     let body = []
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const {name} = JSON.parse(body)
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     });
    // }

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah Home page'
            }))

        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Can\'t access this page with request ${method}`
            }))
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah About page'
            }))
        } else if (method === 'POST') {
            let body = []
            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body)
                response.statusCode = 201;
                response.end(JSON.stringify({
                    message: `Hai, ${name}! This is about page`
                }))
            })
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Can\'t access this page with request ${method}`
            }))
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// CLI to run the code that already comment
// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"