import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/Models/Backend/User';
import { UserForUpdate } from 'src/app/Models/Backend/UserForUpdate';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends CommonComponent implements OnInit {
  currentUser: User;
  userForUpdate: UserForUpdate = new UserForUpdate();

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');

    if (id == undefined) {
      this.updateCurrentUser();
      return;
    }
    this.updateUserById(Number(id));
  }

  updateCurrentUser(): void {
    this.currentUser = this.userService.user;
    this.createUserForUpdate();
  }

  updateUserById(id: number) {
    this.userService
      .getUserById(id)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.currentUser = res;
        this.createUserForUpdate();
      });
  }

  save(): void {
    if (!this.userForm.valid) {
      //TODO
      console.log('popup not valid');
      return;
    }

    this.userForUpdate.firstName = this.userForm.get('firstName').value;
    this.userForUpdate.lastName = this.userForm.get('lastName').value;
    this.userForUpdate.email = this.userForm.get('email').value;

    this.userService
      .updateUser(this.userForUpdate)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        //TODO add popup succeess
        console.log(res);
      });
  }

  createUserForUpdate(): void {
    this.userForUpdate.id = this.currentUser.id;
    let separatedName = separateNameAndLastName(this.currentUser.fullName);
    this.userForUpdate.firstName = separatedName.firstName;
    this.userForUpdate.lastName = separatedName.lastName;
    this.userForUpdate.email = this.currentUser.email;

    this.userForm = new FormGroup({
      firstName: new FormControl(this.userForUpdate.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.userForUpdate.lastName, [
        Validators.required,
      ]),
      email: new FormControl(this.userForUpdate.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
}

function separateNameAndLastName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const nameParts = fullName.split(' ');
  const lastName = nameParts.pop(); // Extract the last name
  const firstName = nameParts.join(' '); // Join the remaining parts as the first name

  return { firstName, lastName };
}
