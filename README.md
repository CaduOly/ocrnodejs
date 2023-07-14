## API TESSERACT

API TESSERACT permite realizar o reconhecimento óptico de caracteres (OCR) em imagens para extrair texto delas usando a biblioteca Tesseract. Ela suporta diferentes formatos de imagem e oferece recursos para processar e obter o texto extraído.

### Requisitos

Antes de começar, Certifique-se de ter instalado instalado em seu sistema:

- Node.js (versão 12 ou superior)
- NPM (gerenciador de pacotes do Node.js)

### Instalação

Siga estas etapas para configurar e executar a API OCR:

1. Clone este repositório em sua máquina local:

   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   ```

2. Acesse o diretório raiz da API:

   ```bash
   cd api-ocr
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Inicie o servidor da API:

   ```bash
   npm start
   ```

   Isso iniciará o servidor na porta padrão 3000. Você pode alterar a porta no arquivo `index.js` se necessário.

### Rotas da API

A API OCR possui as seguintes rotas disponíveis:

#### POST api/v1/processar-imagem

Realiza o reconhecimento óptico de caracteres em uma imagem fornecida.

**Corpo da solicitação:**

form-data
```form-data
imagem: imagem.jpeg.
linguagem: "por".
```

| Parâmetro    | Tipo     | Descrição                                      |
| ------------ | -------- | ---------------------------------------------- |
| `imagem`     | `file` | **Obrigatório**.  O arquivo de imagem a ser processado (formatos suportados: JPEG, PNG, TIFF, BMP, GIF). |
| `linguagem`  | `string` | **Opcional**. O idioma usado para o OCR (por exemplo: "eng" para inglês, "por" para português).           |

**Resposta de sucesso:**

```json
{
  "texto": "Texto extraído da imagem."
}
```

**Códigos de status:**

- 200: OK
- 400: Solicitação inválida
- 400: Formato de arquivo inválido
- 500: Erro interno do servidor

### Exemplos de Uso

Aqui estão alguns exemplos de uso da API TESSERACT:

#### Exemplo de solicitação usando cURL:

```bash
curl -X POST -F "imagem=@imagem.jpg" -F "linguagem=por" http://localhost:3000/api/ocr
```

#### Exemplo de resposta de sucesso:

```json
{
  "texto": "Este é o texto extraído da imagem."
}
```

### Considerações Finais

A API Tesseract permite extrair texto de imagens usando o Tesseract OCR. Certifique-se de fornecer uma imagem válida e a linguagem correta para obter resultados precisos. A biblioteca Tesseract não tem suporte a arquivos PDF.