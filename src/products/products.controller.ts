import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    addProduct(
        @Body('title') prodTitle :string,
        @Body('description') prodDesc :string,
        @Body('price') prodPrice :number
    ): any {
        const generatedId = this.productService.insertProduct(
            prodTitle, prodDesc, prodPrice 
        );
        return {id: generatedId}
    }

    @Get()
    getAllProducts(): any{
        return this.productService.getProducts();
    }

    @Get(':prodId')
    getProduct(@Param('prodId') prodId: string): any{
        return this.productService.getProduct(prodId);
    }

    @Patch(':prodId')
    updateProduct(
        @Param('prodId') prodId: string,
        @Body('title') prodTitle :string,
        @Body('description') prodDesc :string,
        @Body('price') prodPrice :number
        ): any{
            const updatedId = this.productService.updateProduct(
                prodId, prodTitle, prodDesc, prodPrice 
            );
            return updatedId
    }

    @Delete(':prodId')
    deleteProduct(@Param('prodId') prodId: string): any{
        return this.productService.deleteProduct(prodId);
    }
}