import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category-group',
  templateUrl: './create-category-group.component.html',
  styleUrls: ['./create-category-group.component.css'],
})
export class CreateCategoryGroupComponent implements OnInit {
  addCatForm: FormGroup;
  allData: any;
  show = false;
  checkError: any;
  submitted = false;
  resourceId: any;
  title: string;
  buttonText: string;
  categories: any;

  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addCatForm = this.frmbuilder.group({
      name: new FormControl('', Validators.required),
      active: [true],
    });

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.addCatForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.addCatForm.controls[controlName].hasError(errorName);
      }
    };
  }

  createCategoryGroup() {
    this.show = true;
    this.submitted = true;

    if (this.addCatForm.valid) {
      const obj = {
        active: true,
        id: 0,
        displayName: this.addCatForm.controls['name'].value,
      };

      this.authService.saveCategoryGroup(obj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Category Group Added Successfully', 'Close', { duration: 5000 });
          this.router.navigate(['/categoryGroup']);
        },
        (_error) => {
          (this.show = false), this.snackBar.open('Oops, something went wrong..', 'Close');
        }
      );
    } else {
      this.show = false;
      this.snackBar.open('Please fill all mandatory fields', 'Close', {
        duration: 5000,
      });
    }
  }
}
