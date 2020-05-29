import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent implements OnInit {
  createUserForm: FormGroup;
  checkError: any;
  submitted = false;
  privilegeData: any;
  privilegeGroups = [];
  roleId: any;
  title: string;
  buttonText: string;
  snackText: string;
  roleData: any;
  roleIdArray = [];

  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router,
    private router1: ActivatedRoute
  ) {
    this.createUserForm = this.frmbuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      privilegeList: new FormArray([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createUserForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createUserForm.controls[controlName].hasError(errorName);
      }
    };

    this.router1.params.subscribe((params) => {
      this.roleId = params.page;
      if (this.roleId !== undefined) {
        this.getRoleData();
        this.title = 'Edit Role';
        this.buttonText = 'Update Details';
        this.snackText = 'updated';
      } else {
        this.title = 'Create Role';
        this.buttonText = 'Submit Details';
        this.snackText = 'created';
        this.roleId = 0;
      }
    });
    this.getPrivileges();
  }

  getRoleData() {
    this.authService.getRoleById(this.roleId).subscribe((res) => {
      this.roleData = res.body;

      this.createUserForm.controls['name'].setValue(this.roleData.displayName);
      this.roleData.privileges.map((i) => this.roleIdArray.push(i.id));

      const formArray: FormArray = this.createUserForm.get('privilegeList') as FormArray;
      this.roleIdArray.map((i) => formArray.push(new FormControl(i)));
    });
  }

  get formArray() {
    return this.createUserForm.get('privilegeList') as FormArray;
  }

  defaultChecked(id) {
    let flag = false;
    this.roleIdArray.forEach((item) => {
      if (item === id) {
        flag = true;
      }
    });
    return flag;
  }

  defaultExpanded(group) {
    let flag = false;
    this.privilegeData.forEach((priv) => {
      if (priv.displayGroupName === group) {
        this.roleIdArray.forEach((item) => {
          if (item === priv.id) {
            flag = true;
          }
        });
      }
    });
    return flag;
  }

  getPrivileges() {
    this.authService.getPrivilegeList().subscribe((res) => {
      this.privilegeData = res.body;
      this.privilegeData.map((i) => {
        let j = i.groupName.toUpperCase();
        j = j.replace(/_/g, ' ');
        i.displayGroupName = j;
        this.privilegeGroups.push(i.displayGroupName);
      });
      this.privilegeGroups = [...new Set(this.privilegeGroups)];
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.createUserForm.get('privilegeList') as FormArray;
    if (event.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.source.value));
    } else {
      /* unselected */
      // find the unselected element
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.source.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  createRole() {
    this.submitted = true;
    if (this.createUserForm.valid) {
      const obj = {
        id: this.roleId,
        isInternal: false,
        name: this.createUserForm.controls['name'].value,
        privilegeList: this.createUserForm.controls['privilegeList'].value,
      };
      this.authService.saveRole(obj).subscribe(
        (_response) => {
          this.snackBar.open(`Role successfully ${this.snackText}`, 'Close', { duration: 5000 });
          this.submitted = false;
          this.router.navigate(['user-management/roles']);
        },
        (_error) => {
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
