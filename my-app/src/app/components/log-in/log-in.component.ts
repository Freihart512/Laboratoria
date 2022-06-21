import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{FirebaseService} from '../../services/services-firebase/firebase.service'
import{FirestoreService} from '../../services/services-firestore/firestore.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  dataUser:FormGroup;
  constructor( private formBuil : FormBuilder ,
    private firebase : FirebaseService,
    private newRoute: Router,
    private firestore: FirestoreService,
    ) {
    this.dataUser = this.formBuil.group({
      email: ['', Validators.required, Validators.email],
      password : ['', Validators.required]
    })
  }

  submit(){
    this.firebase.login(this.dataUser.value.email, this.dataUser.value.password)
    .then((data)=>{
            this.firestore.getUserRole(data.user.uid)
            .then((docResult)=>{
              if(docResult['role']=== 'waiter'){
                this.newRoute.navigate(['/take-ordes'])
              }else{
                this.newRoute.navigate(['/chef-view'])
              }
            })
    })
  }
  ngOnInit(): void {
  }
}