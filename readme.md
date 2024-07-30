# Alibexpress
Alibexpress in a lightweight and simple framework for building web applications with node js.
this is npm Page : https://www.npmjs.com/package/alibexpress
# Features
- Simple routing
- Strongly typed
- Dev Mode
- Validation Request Data
- Serving static files
- Defualt Error Handler(5xx,4xx)
# How To Install
Install this package using
```
npm install alibexpress
```
# Usage
Here's an example of using Alibexpress:
```
const AlibExpress = require('alibexpress');
const app = new AlibExpress();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(8000, () => {
    console.log('App is running on port 8000');
});
```
# Static Files
To serve static files, use:
```
const AlibExpress = require('alibexpress');
const { serveStatic } = require('alibexpress');
const app = new AlibExpress();

app.use(serveStatic('public'));
```
# Dev Mode
To Enable Logger for req Status, use:
```
const AlibExpress = require('alibexpress');
const { serveStatic } = require('alibexpress');
const app = new AlibExpress("isDev");

```
# Middlewares
You can add middlewares as follows:
```
app.use((req, res, next) => {
    console.log('Middleware');
    next();
});
```
# Example Usage
Here's a more comprehensive example demonstrating various features:
```
const { AlibExpress, Validator, serveStatic } = require('alibexpress');
const app = new AlibExpress();

// Serve static files from the 'public' directory
app.use(serveStatic('./public'));

// Basic GET route
app.get('/', (req, res) => {
    res.send('This is a GET request');
});

// JSON response with middleware example
app.get('/json', (req, res, next) => {
    res.json({ message: 'This is a JSON response' });
    next();
}, (req, res) => {
    console.log({ message2: 'Next middleware' });
});

// Redirect example
app.get('/redirect', (req, res) => {
    res.redirect('https://www.example.com');
});

// Custom status code
app.get('/status', (req, res) => {
    res.send('I\'m a teapot', 418);
});

// POST request with validation
app.post('/', Validator({ name: true, email: true }), (req, res) => {
    res.status(201).json({ message: 'POST request received', data: req.body });
});

// PUT request
app.put('/data', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});

// Set custom header
app.get('/header', (req, res) => {
    res.setHeader('X-Custom-Header', 'CustomValue');
    res.send('Header set!');
});

// End response without headers or status code
app.get('/end', (req, res) => {
    res.end('Ending the response without any headers or status code');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

```
