import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthComponent } from './dialog-auth.component';
import {Auth, AuthModule} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DialogAuthComponent', () => {
  let component: DialogAuthComponent;
  let fixture: ComponentFixture<DialogAuthComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports:[DialogAuthComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialog, useValue: mockMatDialog },
        { provide: Auth, useClass: MockStorage },
        {provide: Firestore, useClass: MockStorage}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close dialog and navigate after registration', async () => {
    // Arrange
    spyOn(component, 'emailSignUp').and.returnValue(Promise.resolve());
    spyOn(component, 'login').and.returnValue(Promise.resolve());
    spyOn(component.router, 'navigate');

    // Act
    await component.registerUsers();

    // Assert
    expect(component.dialog.closeAll).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
class MockStorage{}

