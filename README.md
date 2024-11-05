# YouTube Music Downloader

Este projeto permite baixar músicas específicas do YouTube Music com um botão de download diretamente na interface do site. A solução é composta por um script Tampermonkey que adiciona o botão ao YouTube Music e um backend em Node.js que executa o download utilizando o `yt-dlp`.

## Funcionalidades

- **Botão de Download**: Adiciona um botão de download ao YouTube Music para baixar a música atualmente em reprodução.
- **Conversão para MP3**: Baixa a música em formato MP3 com a melhor qualidade disponível.
- **Metadados e Miniatura**: O arquivo MP3 baixado contém metadados completos, incluindo miniatura (capa do álbum).

## Requisitos

- **Node.js** (versão 14 ou superior)
- **yt-dlp** (instalado globalmente)
- **Tampermonkey** ou outro gerenciador de scripts de usuário no navegador

## Instalação

### 1. Instalar o `yt-dlp`

O `yt-dlp` é a ferramenta responsável por baixar e converter os vídeos do YouTube Music. Siga os passos para instalar o `yt-dlp` no seu sistema:

#### macOS

Instale usando o Homebrew:

```bash
brew install yt-dlp
```

#### Linux

Instale diretamente com o `curl` ou `wget`:

```bash

# Com curl

sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp

# Com wget

sudo wget -O /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp

# Dar permissão de execução

sudo chmod a+rx /usr/local/bin/yt-dlp
```

#### Windows

1. Baixe o executável `yt-dlp.exe` da página oficial do [yt-dlp no GitHub](https://github.com/yt-dlp/yt-dlp/releases/latest).
2. Coloque o arquivo `yt-dlp.exe` em uma pasta de sua preferência.
3. Adicione essa pasta ao **PATH** do Windows:
   - Abra o **Painel de Controle** > **Sistema e Segurança** > **Sistema** > **Configurações avançadas do sistema**.
   - Clique em **Variáveis de Ambiente** e, em **Variáveis do sistema**, edite a variável `Path` para incluir o caminho onde você salvou `yt-dlp.exe`.

#### Verifique a Instalação

Após instalar o `yt-dlp`, verifique a instalação executando o comando:

```bash
yt-dlp --version
```

Se o comando retornar a versão do `yt-dlp`, a instalação foi concluída com sucesso.

### 2. Configurar o Backend em Node.js

Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/arnaldobatista/YouTube-Music-Downloader
cd YouTube-Music-Downloader
```

Instale as dependências do Node.js:

```bash
npm install
```

### 3. Executar o Servidor

Para iniciar o backend, execute:

```bash
node server.js
```

O servidor deve estar rodando em `http://localhost:5001`.

### 4. Configurar o Script Tampermonkey

Instale o [Tampermonkey](https://www.tampermonkey.net/) (ou um equivalente) no seu navegador e adicione o script Tampermonkey (`scriptTampermonkey.js`) que está disponível no repositório.

Esse script adiciona um botão de download no YouTube Music. Quando o botão é clicado, ele envia a URL da música atual para o servidor backend.

## Uso

1. **Abra o YouTube Music** e toque uma música.
2. **Clique no botão de download** que aparece ao lado dos controles do player.
3. **O backend processa o download** usando o `yt-dlp` e cria um arquivo MP3 com a melhor qualidade disponível, incluindo metadados e a capa do álbum.

## Estrutura do Código

- `server.js`: Código do backend que recebe requisições do Tampermonkey e executa o comando `yt-dlp` para fazer o download.
- `scriptTampermonkey.js`: Script Tampermonkey que adiciona o botão de download ao YouTube Music.

## Resolução de Problemas

- **Erro \`command not found\` para \`yt-dlp\`**: Certifique-se de que o \`yt-dlp\` está instalado e acessível globalmente. Execute \`yt-dlp --version\` para confirmar.
- **Erro de CORS**: Verifique se o Tampermonkey possui permissão para se conectar a \`http://localhost:5001\`.
- **Erro \`500 Internal Server Error\`**: Verifique o console do Node.js para mensagens detalhadas. Este erro geralmente indica um problema com o \`yt-dlp\` ou uma URL inválida.

## Contribuição

Sinta-se à vontade para abrir um pull request ou relatar problemas na seção de "Issues".

## Licença

Este projeto é distribuído sob a licença MIT.
