import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ReactiveFormsModule], // Importing ReactiveFormsModule for the form handling
})
export class ProfileComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.setUserData(this.userForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
