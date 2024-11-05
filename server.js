const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/download', (req, res) => {
  const { url } = req.body;

  if (!url) {
    console.error('Erro: URL não fornecida');
    return res.status(400).json({ error: 'URL não fornecida' });
  }

  const command = `cd music && yt-dlp --extract-audio --audio-format mp3 --embed-thumbnail --add-metadata -o "%(title)s.%(ext)s" "${url}"`;
  console.log(`Executando comando: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Erro ao iniciar o download:', stderr);
      return res
        .status(500)
        .json({ error: 'Erro ao iniciar o download', details: stderr });
    }
    console.log('Download iniciado com sucesso:', stdout);
    res.status(200).json({ message: 'Download iniciado com sucesso' });
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor de download rodando em http://localhost:${PORT}`);
});
