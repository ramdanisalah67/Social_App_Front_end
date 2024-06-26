import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/Services/user-info.service';


export interface FieldPermission {
  field: string;
  permission: string;
}



@Component({
  selector: 'app-permissions-personal-info',
  templateUrl: './permissions-personal-info.component.html',
  styleUrls: ['./permissions-personal-info.component.scss'],
})
export class PermissionsPersonalInfoComponent  implements OnInit {
  displayedColumns: string[] = ['field',  'permission'];
  permissions = ['Private', 'Friend', 'Public'];
  email =""
  fieldPermissions:any
  dataSource: FieldPermission[] = [];
  constructor(private userInfo:UserInfoService) { }

  ngOnInit() {
  this.email = localStorage.getItem("email") || ""

  this.userInfo.getPermissions(this.email).subscribe(data => {
    this.dataSource = data.map((item:any) => ({
      field: item.fieldName,
      permission: item.permissions
    }));
  });

  }

  changePermission(element: FieldPermission, newPermission: string) {
    element.permission = newPermission;
  }

  setAllPermissions(permission: string) {
    this.dataSource.forEach((element:any) => {
      element.permission = permission;
    });
  }

  savePermissions() {
    const permissionsToSave: any[] = this.dataSource.map((item:any) => ({
      fieldName: item.field,
      permissions: item.permission
    }));
    console.log(permissionsToSave)
    this.userInfo.setPermissions(permissionsToSave,this.email).subscribe(data=>{
      console.log(data)
    })
   

  }
}
