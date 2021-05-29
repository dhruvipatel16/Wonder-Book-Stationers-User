import { cartdetails } from '../cartdetails';

export class addtoCart{
  public constructor(
    public cart:cartdetails[],
    public fk_order_id:number
  ){}
}
