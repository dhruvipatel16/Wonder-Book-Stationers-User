export class succClass {
  constructor(
    public order_id: number,
    public order_amount: number,
    public order_date: Date,
    public product_name: string,
    public product_qty: number,
    public quantity: number,
    public shipping_address: string,
    public customer_name: string,
    public customer_mobileno: number,
    public customer_address: string,
    public fk_user_email: string,
    public fk_customer_id?: number,
    // public subtotal: number,
    public oid?: number
  ) { }
}
