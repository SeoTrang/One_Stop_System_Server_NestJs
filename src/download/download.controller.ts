import { Controller, Get, Param, Query, Res, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('download')
@ApiTags('Download')
@ApiBearerAuth()
export class DownloadController {
  @Get()
  @SetMetadata('isPublic',true)
  async downloadFile(
    @Query('fileLink') fileLink: string,
    @Res() res,
  ): Promise<any> {
    const file = process.cwd()+""+fileLink; // Đặt đường dẫn đến thư mục chứa các tệp của bạn
    const fileName = fileLink.split('/').pop();
    res.download(file, fileName); // Sử dụng phương thức download() để tải xuống tệp
  }
}
