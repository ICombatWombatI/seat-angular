export class COrder {

    constructor(public order_id: number,
                public user_id: number,
                public order_stadium_id: number,
                public order_stand_id: number,
                public order_kiosk_id: number,
                public order_date_created: string,
                public order_status: string,
            ){ }
}