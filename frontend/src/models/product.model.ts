export interface Product {
    id?: number,
    name:string,
    description: string,
    price?: number,
    status: boolean,
    createdat?: Date,
    updatedat?: Date
}

export class ProductClass implements Product {
    id?: number | undefined;
    name: string;
    description: string;
    price: number | undefined;
    status!: boolean;
    createdat!: Date;
    updatedat!: Date;

    constructor() {
        this.id = undefined;
        this.name = '';
        this.description = '';
        this.price = undefined; 
    }

}
