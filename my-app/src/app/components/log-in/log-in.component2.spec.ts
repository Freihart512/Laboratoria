import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/services-firebase/firebase.service';
import { FirestoreService } from 'src/app/services/services-firestore/firestore.service';
import { FirestoreServiceMock } from 'src/app/__mocks__/firestore.service.mock';
import { FirebaseServiceMock } from 'src/app/__mocks__/firebase.service.mock';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogInComponent } from '../log-in/log-in.component';


describe("Router: App", () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate').and.callFake(() => {
      console.log("ESJECUTO este SPY")
    })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: FirebaseService, useClass: FirebaseServiceMock },
        { provide: FirestoreService, useClass: FirestoreServiceMock },
        { provide: Router, useValue: mockRouter },
      ]
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debe navegar a xyz', fakeAsync(() => {
    console.log("Esta cosa", component.dataUser)
    const email = component.dataUser.controls['email']
    const password = component.dataUser.controls['password']
    email.setValue('mesera@cicysburger.com');
    password.setValue('laboratoria');

    const btn = fixture.debugElement.query(By.css('.btnSubmit'))
    setTimeout(() => {
      btn.nativeElement.click()
    }, 50);
    tick(100);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chef-view']);
  }));
});
