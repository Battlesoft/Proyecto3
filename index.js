require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ------------
// MY CODE
// ------------
// Ruta para manejar las solicitudes POST a /api/shorturl
app.post("/api/shorturl", function (req, res) {
  const originalUrl = req.body.url; // Obtiene la URL original de la solicitud POST

  // Verifica si la URL es válida
  if (!isValidUrl(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  // Verifica el nombre de dominio de la URL
  const { hostname } = new URL(originalUrl);
  dns.lookup(hostname, (err, address) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    // Genera un identificador corto único y almacena la URL original en la base de datos
    const shortUrl = shortUrlCounter++;
    urlDatabase[shortUrl] = originalUrl;

    // Devuelve la URL original y su identificador corto en una respuesta JSON
    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

// Ruta para redirigir las solicitudes GET a URLs cortas a sus respectivas URLs originales
app.get("/api/shorturl/:shortUrl", function (req, res) {
  const shortUrl = req.params.shortUrl; // Obtiene el identificador corto de la solicitud GET
  const originalUrl = urlDatabase[shortUrl]; // Obtiene la URL original correspondiente al identificador corto

  // Redirige a la URL original si se encuentra en la base de datos
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

// ----------------------------------------

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
