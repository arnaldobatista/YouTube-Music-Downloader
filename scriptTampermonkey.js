// ==UserScript==
// @name         YouTube Music Download Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adiciona um botão de download ao YouTube Music para baixar a música atual em MP3
// @match        https://music.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// ==/UserScript==

(function () {
  'use strict';

  function addDownloadButton() {
    const controls = document.querySelector(
      '#right-controls .right-controls-buttons'
    );
    if (!controls) {
      console.log('Não foram encontrados controles na interface.');
      return;
    }

    if (document.querySelector('#download-button')) {
      return;
    }

    const downloadButton = document.createElement('button');
    downloadButton.id = 'download-button';
    downloadButton.title = 'Baixar Música';
    downloadButton.style.display = 'flex';
    downloadButton.style.alignItems = 'center';
    downloadButton.style.justifyContent = 'center';
    downloadButton.style.width = '40px';
    downloadButton.style.height = '40px';
    downloadButton.style.background = 'transparent';
    downloadButton.style.border = 'none';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.color = '#909090';
    downloadButton.style.transition = 'none';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', '24');
    svg.setAttribute('width', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.pointerEvents = 'none';
    svg.style.display = 'inherit';
    svg.style.width = '100%';
    svg.style.height = '100%';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z'
    );
    path.style.fill = 'currentColor';

    svg.appendChild(path);
    downloadButton.appendChild(svg);

    downloadButton.addEventListener('click', () => {
      const videoId = new URLSearchParams(window.location.search).get('v');

      if (!videoId) {
        alert('Nenhuma música em reprodução encontrada.');
        return;
      }

      const videoUrl = `https://music.youtube.com/watch?v=${videoId}`;

      GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://localhost:5001/download',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ url: videoUrl }),
        onload: (response) => {
          if (response.status === 200) {
            alert('Download iniciado com sucesso!');
          } else {
            alert('Erro ao iniciar o download.');
          }
        },
        onerror: (error) => {
          console.error('Erro ao conectar com o servidor de download:', error);
          alert('Erro ao se conectar com o servidor de download.');
        },
      });
    });

    controls.appendChild(downloadButton);
  }

  const observer = new MutationObserver(addDownloadButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
