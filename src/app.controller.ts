import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("pdf/download")
  async geneartePDF(@Res() res) {
    const buffer = await this.appService.generatePdf()
    res.set({
      'Content-Type':'application/pdf',
      'Content-Disposition':'attachment; filename-example.pdf',
      'Content-Length':buffer.length,
    })
    res.end(buffer)
  }

}
