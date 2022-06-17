import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import{FirebaseService} from '../../services-firebase/firebase.service'
import{FirestoreService} from '../../services-firestore/firestore.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  dataUser:FormGroup;
  constructor( private formBuil : FormBuilder , private fireValid : FirebaseService, private newRoute: Router, private firestore: FirestoreService) {
    this.dataUser = this.formBuil.group({
      email: ['', Validators.required, Validators.email],
      password : ['', Validators.required],
      role : ['' , Validators.required]
    })
  }

  validate(){
  this.fireValid.login(this.dataUser.value.email, this.dataUser.value.password)
    .then((data)=> {
      if(this.dataUser.value.role === 'Cocinerx'){
        this.firestore.getUserData(data.user.uid, 'chefs')
        .then((docResult)=>{
          if( docResult === undefined){
            console.log('usted no es chef')
          } else if(docResult['role'] === this.dataUser.value.role){
              this.newRoute.navigate(['/chef-view'])
          }
        })
      }
      if(this.dataUser.value.role === 'Meserx'){
        this.firestore.getUserData(data.user.uid, 'waiters')
        .then((docResult)=>{
          if(docResult === undefined){
            console.log('usted no es waiter')
          } else if(docResult['id'] === this.dataUser.value.id){
              this.newRoute.navigate(['/take-orders'])
          }
        })
      }
      })
    .catch((err)=> console.log(err))
  }
  ngOnInit(): void {
  }
}
