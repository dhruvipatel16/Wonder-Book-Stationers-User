export class custClass {
  constructor(
    public customer_id:number,
    public customer_name: string,
    public customer_gender: string,
    public customer_mobileno: number,
    public customer_address: string,
      public customer_photo: string,
    public fk_user_email: string
  ) { }
}
