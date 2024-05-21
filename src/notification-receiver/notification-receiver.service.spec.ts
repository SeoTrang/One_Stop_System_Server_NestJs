import { Test, TestingModule } from '@nestjs/testing';
import { NotificationReceiverService } from './notification-receiver.service';

describe('NotificationReceiverService', () => {
  let service: NotificationReceiverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationReceiverService],
    }).compile();

    service = module.get<NotificationReceiverService>(NotificationReceiverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
