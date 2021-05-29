export class prod{
 public constructor(
  public product_id:number,
  public product_name:string,
  public product_price:number,
  public product_qty:number,
  public product_mfg:string,
  public product_desc:string,
  public product_img:string,
  public category_id?: number,
  public category_name?: string,
  public fk_cat_id?: number,
  public total?:number

  ){
  }
}
