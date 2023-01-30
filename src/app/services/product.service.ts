import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductDetail } from '../interfaces/product.interface';
import { tokenHeader } from '../utils/getConfig';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * This function takes a string as a parameter and returns an observable of type ProductDetail
   * @param {string} term - The product ID
   * @returns An observable of type ProductDetail
   */
  getProduct(term: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${base_url}/products/${term}`, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It returns an Observable of an array of ProductDetail objects
   * @returns An observable of an array of ProductDetail objects.
   */
  getProducts(): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(`${base_url}/products`, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It takes a product object as an argument, and then it returns an observable of the response from
   * the server
   * @param {Product} product - Product - this is the product object that we are sending to the
   * backend.
   * @returns The response from the server.
   */
  createProduct(product: Product) {
    return this.http.post(`${base_url}/products`, product, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It takes a product and an id as parameters, and then it returns an http patch request to the
   * products endpoint with the product and id as parameters, and the tokenHeader as the headers
   * @param {Product} product - Product - The product object that we want to update.
   * @param {string} id - The id of the product you want to update.
   * @returns The updated product
   */
  updateProduct(product: Product, id: string) {
    return this.http.patch(`${base_url}/products/${id}`, product, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It deletes a product from the database
   * @param {string} id - The id of the product to be deleted.
   * @returns The deleteProduct method returns an observable of type any.
   */
  deleteProduct(id: string) {
    return this.http.delete(`${base_url}/products/${id}`, {
      headers: tokenHeader.headers,
    });
  }
}
