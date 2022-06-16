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
      email: ['', Validators.required],
      password : ['', Validators.required],
      role : ['' , Validators.required]
    })
  }
  submit(){
  this.fireValid.login(this.dataUser.value.email, this.dataUser.value.password)
    .then((data)=> {
      this.firestore.addUser(this.dataUser.value.email, data.user.uid, this.dataUser.value.role)
      .then((result)=>{ 
        this.firestore.getUserData(result.id)
        .then((doc)=>{
          if(doc['id']=== data.user.uid){
            console.log('SOY YO')
          }
        })
      })
      // if(userWorker.role === 'Meserx'){
      //   this.newRoute.navigate(['/take-orders'])
      // } else if(userWorker.role=== 'Cocinerx'){
      //   this.newRoute.navigate(['/chef-view'])
      // }
    })
    .catch((err)=> console.log(err))
  }
  ngOnInit(): void {
  }
}
