// logging.middleware.ts
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => { // Lắng nghe sự kiện khi phản hồi đã hoàn thành
      console.log(`Request ${req.method} ${req.url} - Status: ${res.statusCode}`); // Ghi lại route, phương thức và mã trạng thái HTTP
    });
    next();
  }
}
