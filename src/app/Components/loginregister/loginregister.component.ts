import { Component, OnInit } from '@angular/core';
import { CheckConnectivityService } from 'src/app/Services/check-connectivity.service';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.scss'],
})
export class LoginregisterComponent  implements OnInit {

  constructor(public checkService:CheckConnectivityService) { }

  ngOnInit() {}

}
