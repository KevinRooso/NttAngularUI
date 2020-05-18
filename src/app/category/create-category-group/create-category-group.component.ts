import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private router1: ActivatedRoute
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

    this.router1.queryParams.subscribe((params) => {
      this.resourceId = params.page;
      if (this.resourceId !== undefined) {
        this.getCategoryGroupData();
        this.title = 'Edit Category Group';
        this.buttonText = 'Update Details';
      } else {
        this.title = 'Create Category Group';
        this.buttonText = 'Submit Details';
        this.resourceId = 0;
      }
    });
  }

  getCategoryGroupData() {
    this.authService.getCategoryGroupList().subscribe((res) => {
      this.categories = res.body.filter((c) => {
        return c.id.toString() === this.resourceId;
      });
      this.addCatForm.get(['name']).setValue(this.categories[0].name);
      if (this.categories.isActive !== null) {
        this.addCatForm.get(['active']).setValue(this.categories[0].isActive);
      }
    });
  }

  createCategoryGroup() {
    this.show = true;
    this.submitted = true;

    if (this.addCatForm.valid) {
      const obj = {
        active: this.addCatForm.controls['active'].value,
        id: Number(this.resourceId),
        name: this.addCatForm.controls['name'].value,
      };

      this.authService.saveCategoryGroup(obj).subscribe(
        (_res) => {
          this.show = false;
          if (this.resourceId !== 0) {
            this.snackBar.open('Category Group Updated Successfully', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Category Group Added Successfully', 'Close', { duration: 5000 });
          }

          this.router.navigate(['/categories/group']);
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
