import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  adminUser$: Observable<User>;
  loggedUser$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private firestore: FirestoreService,
              private router: Router) {
    this.user$ = this.afAuth.authState;
    this.adminUser$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.getByAdmin(user.uid);
        } else {
          return of(null);
        }
      })
    );
    this.loggedUser$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.getByAuthUid(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
    );
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  isAdmin(): Observable<boolean> {
    return this.adminUser$.pipe(
      map(admin => !!admin)
    );
  }

  register(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
    );
  }
}
