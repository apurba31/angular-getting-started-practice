import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  
    private _productService;
    errorMessage: string = '';

    products: IProduct[] = [];

    sub!: Subscription;

    constructor(productService:ProductService){
        this._productService = productService;
    }

    ngOnInit(): void {
        // this.products = this._productService.getProducts();
        this.sub = this._productService.getProducts().subscribe({
            next: products => 
            {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
        this.listFilter = 'cart';
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List' + message;
    }
}