import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse, gymImages } from '../../../common/models/CommonInterfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCategory } from '../add-update-category/add-update-category';
import { Observable, Subscription, map, take } from 'rxjs';
import * as CategoryAction from '../../../store/actions/category.action';
import { selectAllCategory } from '../../../store/selectors/category.selector';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList implements OnInit {

  // Convert to observables - no more local state management
  allCategories$: Observable<CategoryResponse[]>;
  parentcategoryList$: Observable<CategoryResponse[]>;
  childcategoryList$: Observable<CategoryResponse[]>;
  private subscriptions: Subscription[] = [];
  
  // Keep these as local state since they're UI-specific
  selectedParentCategory!: CategoryResponse | null;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog  
  ) {
    this.allCategories$ = this.store.select(selectAllCategory);
    this.parentcategoryList$ = this.allCategories$.pipe(
      map(categories => categories.filter((x: CategoryResponse) => x.parentCategoryID === null))
    );

    this.childcategoryList$ = new Observable<CategoryResponse[]>();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.store.dispatch(CategoryAction.loadCategory());
  }

  handleImageError(event:any){
    const img = event.target as HTMLImageElement;
    img.src = gymImages[Math.floor(Math.random() * gymImages.length)];
  }

  selectSubCategory(category: CategoryResponse) {
    this.selectedParentCategory = category;
    this.childcategoryList$ = this.allCategories$.pipe(
      map(categories => categories.filter((x: CategoryResponse) => x.parentCategoryID === category.categoryId))
    );
  }

  addeditCategory(category?: CategoryResponse | null, isAddCategory?: boolean) {
    if (category?.imageUrl && gymImages.includes(category.imageUrl)) {
      category.imageUrl = '';
    }
    
    let isParentCategory: boolean = category?.parentCategoryID == null;
    
    const categoriesSub = this.allCategories$.pipe(
      take(1)
    ).subscribe(categories => {
      let data = {
        CategoryData: category,
        isParentCategory: isParentCategory,
        allCategories: categories,
        isAddCategory: isAddCategory
      };

      let dialogRef = this.dialog.open(AddUpdateCategory, {
        data: { data },
        autoFocus: false,
        width: '600px',
        disableClose: true,
        closeOnNavigation: true
      });

      const dialogSub = dialogRef.afterClosed().subscribe({
        next: (response) => {
          if (response) {
            this.getCategoryList();
            if (this.selectedParentCategory) {
              this.selectSubCategory(this.selectedParentCategory);
            }
          }
        }
      });
      
      this.subscriptions.push(dialogSub);
    });
    
    this.subscriptions.push(categoriesSub);
  }
}

