import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number): string {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(): Array<Product>{
        return [...this.products];
    }

    getProduct(prodId: string): any{
        return this.findProduct(prodId);
    }

    updateProduct(prodId: string, title: string, description: string, price: number): any{
        let myProd = this.findProduct(prodId);
        const id = prodId;
        myProd = {id, title, description, price};
        return myProd
    }

    deleteProduct(prodId: string): any{
        const myProd = this.findProductIndex(prodId);
        const produList = [...this.products];
        produList.splice(myProd,1);
        return produList
    }

    private findProduct(prodId){
        const produList = [...this.products];
        const myProd = produList.find(e=> e.id === prodId);
        if(!myProd){
            throw new NotFoundException('Could not find product');
        }
        return myProd
    }

    private findProductIndex(prodId){
        const produList = [...this.products];
        const myProdIndex = produList.findIndex(e=> e.id === prodId);
        if(!myProdIndex){
            throw new NotFoundException('Could not find product');
        }
        return myProdIndex
    }
}