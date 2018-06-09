import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: string;

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Rquired fields
    if (!this.validateService.validateRegister(user)) {
      console.log('FIll all');
      return false;
    }
    // Rquired fields
    if (!this.validateService.validateEmail(user.email)) {
      console.log('FIll all Email');
      return false;
    }

    console.log(user);
  }

}
