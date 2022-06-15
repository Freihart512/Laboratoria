import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import{FirebaseService} from '../../services-firebase/firebase.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  dataUser:FormGroup;
  constructor( private formBuil : FormBuilder , private fireValid : FirebaseService, private newRoute: Router) {
    this.dataUser = this.formBuil.group({
      email: ['', Validators.required],
      password : ['', Validators.required],
      role : ['' , Validators.required]
    })
  }
  submitDataUser(){
    const emailUser = this.dataUser.value.email
    const passwordUser = this.dataUser.value.password
    const role = this.dataUser.value.role
    const validUser = this.fireValid.login(emailUser, passwordUser)
    validUser.then((data)=> {
      const userWorker = {
        email: emailUser,
        id: data.user.uid,
        role: role
      }
      if(userWorker.role === 'Meserx'){
        this.newRoute.navigate(['/take-orders'])
      } else {
        this.newRoute.navigate(['/chef-view'])
      }
    })
    .catch((err)=> console.log(err))
  }
  ngOnInit(): void {
  }
}
