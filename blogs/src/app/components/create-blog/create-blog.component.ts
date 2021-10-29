import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  user: Observable<any>;
  display:string;
  content:string;
  constructor(public afAuth: AngularFireAuth, private authService: AuthService, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user != null) {
        let emailLower = user.email!.toLowerCase();
        this.user = this.afs.collection('users').doc(emailLower).valueChanges();
      }
    });
  }

  CreateBlog(){
    let Record: any = {};
    Record['email'] = this.user;
    Record['display'] = this.display;
    Record['content'] = this.content;
    this.authService.createBlog(Record).then(res => {
      this.display = "";
      this.content = "";
    }).catch(error => {
      console.log(error);
    });
  }

}
