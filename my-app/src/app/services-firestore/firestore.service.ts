import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc, getDoc, onSnapshot,query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : Firestore) { }

   addUser(email: string, id: string, role: string ){
    const createUser = collection(this.firestore, 'users');
    return  addDoc(createUser, {
    email: email,
    id: id,
    role: role
    })
    
   }

   getUserCollection(callback: string){

   }
}
