
export class orderClass {
  constructor(
    public order_id: number,
    public shipping_address:string,
    public order_notes: string,
    public order_amount: number,
    public order_type: string,
    public order_date: Date,
    public order_status: string,
    public fk_customer_id?: number
  ) { }
}
