import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private router1: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addCatForm = this.frmbuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      active: [true],
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

    this.router1.queryParams.subscribe((params) => {
      this.resourceId = params.page;
      if (this.resourceId !== undefined) {
        this.getCategoryData();
        this.title = 'Edit Category';
        this.buttonText = 'Update Details';
      } else {
        this.title = 'Create Category';
        this.buttonText = 'Submit Details';
        this.resourceId = 0;
      }
    });

    this.getCategoryGroupDetails();
  }

  getCategoryData() {
    this.show = true;
    this.authService.getAllCategoryList().subscribe((res) => {
      this.categories = res.body.filter((c) => {
        return c.id.toString() === this.resourceId;
      });
      this.addCatForm.get(['name']).setValue(this.categories[0].name);
      this.addCatForm.get(['description']).setValue(this.categories[0].description);
      if (this.categories.isActive !== null) {
        this.addCatForm.get(['active']).setValue(this.categories[0].isActive);
      }
      this.addCatForm.get(['displayName']).setValue(this.categories[0].displayName);
      this.addCatForm.get(['categoryGroupId']).setValue(this.categories[0].categoryGroup.id);
      this.show = false;
    });
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
        active: this.addCatForm.controls['active'].value,
        description: this.addCatForm.controls['description'].value,
        id: Number(this.resourceId),
        name: this.addCatForm.controls['name'].value,
        displayName: this.addCatForm.controls['displayName'].value,
      };

      this.authService.saveCategory(obj).subscribe(
        (_res) => {
          this.show = false;
          if (this.resourceId !== 0) {
            this.snackBar.open('Category Updated Successfully', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Category Added Successfully', 'Close', { duration: 5000 });
          }

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
