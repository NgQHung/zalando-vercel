export default interface IPurchasedProducts {
  _id: any;
  data: {
    listProducts: {
      id: number;
      size: string;
    }[];
    methodPayment: string;
  }[];
}
