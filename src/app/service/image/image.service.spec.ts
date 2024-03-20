import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';
import {Storage} from "@angular/fire/storage";

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
class MockStorage {}


