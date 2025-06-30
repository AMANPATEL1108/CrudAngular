import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'CrudAngular';

  users: any[] = [];
  userIdCounter: number = 1;

  showModal = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // initialize form without uid
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      country: ['india'],
    });
  }

  ngOnInit() {
    // load existing users
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = storedUsers;

    console.log('Loaded users from localStorage:', this.users);

    // load existing counter or default to 1
    this.userIdCounter = parseInt(
      localStorage.getItem('userIdCounter') || '1',
      10
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitData() {
    if (this.userForm.valid) {
      const newUser = {
        ...this.userForm.value,
        uid: this.userIdCounter,
      };

      console.log('User Data:', newUser);

      // get existing users from local storage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      // add new user to array
      storedUsers.push(newUser);

      // save back to local storage
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // increment and store userIdCounter
      this.userIdCounter++;
      localStorage.setItem('userIdCounter', this.userIdCounter.toString());

      // update local array
      this.users = storedUsers;

      this.closeModal();
      this.userForm.reset({
        country: 'india',
      });
    } else {
      console.log('Form invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
