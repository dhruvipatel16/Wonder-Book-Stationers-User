import { cartdetails } from './cartdetails';

export class cart {
  public constructor(
    public CartItems: cartdetails[],
    public grandtotal: number,
    public user_email: string,
    public cart_id?: number,
    public fk_user_email?: number,
    public fk_product_id?: number,
    public product_name?: string
  ) { }
}
