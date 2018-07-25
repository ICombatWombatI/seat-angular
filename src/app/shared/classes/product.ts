export class CProduct {

    constructor(public product_id: number = 0,
                public product_name: string ="",
                public category_id: string="",
                public product_price: number= 0,
                public product_featured_url: string="",
                public product_description: string="",
            ){ }
}