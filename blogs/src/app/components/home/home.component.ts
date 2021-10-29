import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Observable<any>;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user != null) {
        let emailLower = user.email!.toLowerCase();
        this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
      }
    });
  }
  goHome(){
   this.router.navigate(['home']);
  }
  logout(): void {
      this.afAuth.signOut();
  }

}
