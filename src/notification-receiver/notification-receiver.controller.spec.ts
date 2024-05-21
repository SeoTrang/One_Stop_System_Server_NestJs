import { Test, TestingModule } from '@nestjs/testing';
import { NotificationReceiverController } from './notification-receiver.controller';

describe('NotificationReceiverController', () => {
  let controller: NotificationReceiverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationReceiverController],
    }).compile();

    controller = module.get<NotificationReceiverController>(NotificationReceiverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
