import { prod } from './product';

export class cartdetails{
  public constructor(
    public product:prod,
    public qty:number,
    public subtotal:number,
    public oid?:number
  ){}
}
