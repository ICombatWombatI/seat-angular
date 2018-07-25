export class COrderData {

    constructor(public client_name: string,
                public client_phone: string,
                public delivery: number,
                public order_delivery_section: string,
                public order_delivery_row: number,
                public order_delivery_seat: number,
                public created: string,
                public order_readiness_time: string,
                public order_status: string,
                public total_price: number,
            ){ }
}