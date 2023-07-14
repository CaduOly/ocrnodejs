const fs = require("fs");
const pdf2img = require("pdf-img-convert");
const TesseractService = require("../../domain/services/tesseractService");

class TesseractController {
  constructor() {
    this.tesseractService = new TesseractService();
    this.processarImagem = this.processarImagem.bind(this);
  }

  async processarImagem(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo fornecido" });
      }

      const { path: imagePath, mimetype: imageType } = req.file;
      const { linguagem } = req.body;

      if (imageType === "application/pdf") {
        const pdfOptions = {
          width: 800,
          height: 1200,
          base64: false,
          scale: 1.0,
        };

        const pdfArray = await pdf2img.convert(imagePath, pdfOptions);

        const texts = [];
        for (const imageData of pdfArray) {
          const pdfToImage = `uploads/output.png`;
          const imageBuffer = Buffer.from(imageData, "png");

          await fs.promises.writeFile(pdfToImage, imageBuffer);

          const text = await this.tesseractService.recognizeText(
            pdfToImage,
            linguagem
          );
          texts.push(text);

          await fs.promises.unlink(pdfToImage);
        }

        await fs.promises.unlink(imagePath);

        return res.status(200).json({ text: texts });
      }

      const text = await this.tesseractService.recognizeText(
        imagePath,
        linguagem
      );

      await fs.promises.unlink(imagePath);

      return res.status(200).json({ text });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro durante o processamento" });
    }
  }
}

module.exports = TesseractController;