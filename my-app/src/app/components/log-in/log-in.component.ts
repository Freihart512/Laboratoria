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
  submit(){
    const validUser = this.fireValid.login(this.dataUser.value.email, this.dataUser.value.password)
    validUser.then((data)=> {
      const userWorker = {
        email: this.dataUser.value.email,
        id: data.user.uid,
        role: this.dataUser.value.role
      }
      if(userWorker.role === 'Meserx'){
        this.newRoute.navigate(['/take-orders'])
      } else if(userWorker.role=== 'Cocinerx'){
        this.newRoute.navigate(['/chef-view'])
      }
    })
    .catch((err)=> console.log(err))
  }
  ngOnInit(): void {
  }
}
