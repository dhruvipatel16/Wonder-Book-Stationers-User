export class orderDetailClass {
  public constructor(
    public fk_order_id: number[],
    public fk_product_id: number[],
    public quantity: number[]
  ) { }
}


