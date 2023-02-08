import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit-table')

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async generatePdf(): Promise<Buffer> {
    const pdfBuffer:Buffer= await new Promise(resolve=>{
      const doc = new PDFDocument({
        size:"LETTER",
        bufferPages: true
      })
      //body
      doc.text("PDF generado en nuetro servidor")
      doc.moveDown();
      doc.text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")

      //
      const buffer=[]
      doc.on('data',buffer.push.bind(buffer))
      doc.on('end',()=>{
        const data=Buffer.concat(buffer)
        resolve(data)
      })
      doc.end()

    })
    return pdfBuffer;
  }

}
