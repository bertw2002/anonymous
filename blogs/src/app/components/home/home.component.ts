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

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }
  goHome(){
   this.router.navigate(['home']);
  }
  logout(): void {
      this.afAuth.signOut();
  }

}
