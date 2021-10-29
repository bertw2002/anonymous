import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  firebaseErrorMessage: string;
  blogForm: FormGroup;
  user: Observable<any>;
  display:string;
  content:string;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private afs: AngularFirestore) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user != null) {
        let emailLower = user.email!.toLowerCase();
        this.user = this.afs.collection('users').doc(emailLower).valueChanges();
      }
    });
    this.blogForm = new FormGroup({
        'email': new FormControl(this.user),
        'display': new FormControl('', [Validators.required]),
        'content': new FormControl('', Validators.required)
    });
  }

  CreateBlog(){
    console.log(this.blogForm.value)
    if (this.blogForm.invalid)                            // if there's an error in the form, don't submit it
        return;
    this.authService.signupUser(this.blogForm.value).then((result) => {
        if (result == null)                                 // null is success, false means there was an error
            this.router.navigate(['/home']);
        else if (result.isValid == false)
            this.firebaseErrorMessage = result.message;
    }).catch(() => {

    });
  }

}
