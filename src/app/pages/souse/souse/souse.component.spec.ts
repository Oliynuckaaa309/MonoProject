import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouseComponent } from './souse.component';

describe('SouseComponent', () => {
  let component: SouseComponent;
  let fixture: ComponentFixture<SouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
