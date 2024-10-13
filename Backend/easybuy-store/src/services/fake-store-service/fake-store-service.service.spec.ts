import { Test, TestingModule } from '@nestjs/testing';
import { FakeStoreService } from './fake-store-service.service';

describe('FakeStoreServiceService', () => {
  let service: FakeStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeStoreService],
    }).compile();

    service = module.get<FakeStoreService>(FakeStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
