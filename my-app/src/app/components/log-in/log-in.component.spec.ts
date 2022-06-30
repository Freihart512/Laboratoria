import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseService } from 'src/app/services/services-firebase/firebase.service';
import { FirestoreService } from 'src/app/services/services-firestore/firestore.service';
import { FirestoreServiceMock } from 'src/app/__mocks__/firestore.service.mock';
import { FirebaseServiceMock } from 'src/app/__mocks__/firebase.service.mock';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LogInComponent } from '../../components/log-in/log-in.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router'
import { TakeOrdersComponent } from '../waiter-view/take-orders/take-orders.component';
import { ChefViewComponent } from '../chef-view/chef-view.component';


describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'take-orders', component: TakeOrdersComponent }, { path: 'chef-view', component: ChefViewComponent }]),
        MatSnackBarModule,
      ],
      declarations: [LogInComponent],
      providers: [{ provide: FirebaseService, useClass: FirebaseServiceMock },
      { provide: FirestoreService, useClass: FirestoreServiceMock }
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('Está creado', () => {
    expect(component).toBeTruthy();
  });
  //Validación de formulario
  it('Debe retornar formulario invalido si algún campo está vacío', () => {
    const email = component.dataUser.controls['email']
    email.setValue('mesera@cicysburger.com');
    expect(component.dataUser.invalid).toBeTrue();
  });
  it('Debe retornar formulario valido todo está relleno', () => {
    const email = component.dataUser.controls['email']
    const password = component.dataUser.controls['password']
    email.setValue('mesera@cicysburger.com');
    password.setValue('laboratoria');
    expect(component.dataUser.invalid).toBeFalse();
  });


  //Validar botón
  it('Debe navegar a xyz', () => {
    const btn = fixture.debugElement.query(By.css('.btnSubmit'))

    spyOn(router, 'navigate')
    btn.nativeElement.click()
    component.submit()
      .then((a) => {
        // console.log('CONSOLE DE ROUTEEEEER', spy)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', location)
        //expect(location.path()).toBe('/chef-view')
        expect(router.navigate).toHaveBeenCalledWith(['/chef-view']);
      }).catch((err) => {
        console.log(err)
      })
  });



  // it('Debe ir a la otra ruta', () => waitForAsync (() =>{
  //   fixture.detectChanges();
  //   let btnElement = fixture.debugElement.queryAll(By.css('.btnSubmit'))
  //   btnElement[0].nativeElement.click()
  //   fixture.whenStable().then(()=>{
  //     const location: Location = TestBed.inject(Location);
  //     expect(location.path()).toEqual('/take');
  //   })
  // }));

})

