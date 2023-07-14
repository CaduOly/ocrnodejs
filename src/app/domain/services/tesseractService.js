const { createWorker, OEM} = require('tesseract.js');

/**
 * TesseractService
 *
 * Serviço responsável pelo OCR (Reconhecimento Óptico de Caracteres) usando o Tesseract.js.
 * Este serviço fornece métodos para reconhecer texto a partir de um arquivo de imagem usando a biblioteca Tesseract.js.
 *
 * @name TesseractService
 * @property {Worker} worker - Instância do worker do Tesseract.
 */
class TesseractService {
  
  constructor() {
    this.worker = null;
  }

/**
 * Realiza o reconhecimento de texto em uma imagem.
 * 
 * @param {string} imagePath - O caminho do arquivo de imagem a ser processado.
 * @param {string} linguagem - O idioma usado para o OCR **OPCIONAL**.
 * @returns {string} O texto extraído da imagem.
 */
  async recognizeText(imagePath, linguagem) {
    if (!this.worker) {
      this.worker = await createWorker();
      await this.worker.loadLanguage(linguagem);
      await this.worker.initialize(linguagem, OEM.LSTM_ONLY);
    }
  
    await this.worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ áàãâéèêíìîóòõôúùûÁÀÃÂÉÈÊÍÌÎÓÒÕÔÚÙÛçÇ',
    });
    
  
    const { data: { text } } = await this.worker.recognize(imagePath);
    return text;
  }
  
}

module.exports = TesseractService;
