import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  addCatForm: FormGroup;
  allData: any;
  show = false;
  checkError: any;
  submitted = false;
  resourceId = null;
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
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    this.addCatForm = this.frmbuilder.group({
      description: new FormControl(''),
      displayName: new FormControl('', [Validators.required, Validators.pattern(regex)]),
      categoryGroupId: ['', Validators.required],
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
    this.getCategoryGroupDetails();
  }

  getCategoryGroupDetails() {
    this.authService.getCategoryGroupList().subscribe((res) => {
      this.allData = res.body;
    });
  }

  createCategory() {
    this.show = true;
    this.submitted = true;

    if (this.addCatForm.valid) {
      let catId;
      catId = this.addCatForm.controls['categoryGroupId'].value;

      const obj = {
        categoryGroupId: catId,
        active: true,
        description: this.addCatForm.controls['description'].value,
        id: 0,
        displayName: this.addCatForm.controls['displayName'].value,
      };

      this.authService.saveCategory(obj).subscribe(
        (_res) => {
          this.show = false;
          this.snackBar.open('Category Added Successfully', 'Close', { duration: 5000 });
          this.router.navigate(['/categories']);
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