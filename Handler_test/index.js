const AlibExpress = require('../dist/Alibexpress').AlibExpress;
const { serveStatic } = require('../dist/static');

const app = new AlibExpress(process.env.NODE_ENV === 'development');

app.use(serveStatic('./public'));

app.get('/', (req, res) => {
  res.send(req.query);
});

app.get('/json', (req, res) => {
  res.json({ message: 'This is a JSON response' });
});

app.get('/redirect', (req, res) => {
  res.redirect('https://www.example.com');
});

app.get('/status', (req, res) => {
  res.send("I'm a teapot",418);
});

app.post('/', (req, res) => {
  res.json({ message: 'POST request received', data: req.body },201);
});

app.put('/data', (req, res) => {
  console.log(req.body); 
  res.send('Data received');
  
});


app.get('/header', (req, res) => {
  res.setHeader('X-Custom-Header', 'CustomValue');
  res.send('Header set!');
});

app.get('/end', (req, res) => {
  res.end('Ending the response without any headers or status code');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
