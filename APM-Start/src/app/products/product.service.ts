import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ProductService{

    private productUrl  = 'api/products/products.json';

    constructor(private http:HttpClient){

    }

    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
                tap(data => console.log('All', JSON.stringify(data))),
                catchError(this.handleError)
            );

        // [
            
            //     "productId": 1,
            //     "productName": "Leaf Rake",
            //     "productCode": "GDN-0011",
            //     "releaseDate": "March 19, 2021",
            //     "description": "Leaf rake with 48-inch wooden handle.",
            //     "price": 19.95,
            //     "starRating": 3.2,
            //     "imageUrl": "assets/images/leaf_rake.png"
            //   },
            //   {
            //     "productId": 2,
            //     "productName": "Garden Cart",
            //     "productCode": "GDN-0023",
            //     "releaseDate": "March 18, 2021",
            //     "description": "15 gallon capacity rolling garden cart",
            //     "price": 32.99,
            //     "starRating": 4.2,
            //     "imageUrl": "assets/images/garden_cart.png"
            //   }

             
        // ]
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
  
}

