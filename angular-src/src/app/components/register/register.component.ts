import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
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

  constructor(private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Fill all required fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // Rquired fields
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Invalid Email', { cssClass: 'alert-danger', timeout: 3000 })
      return false;
    }

    console.log(user);
  }

}
