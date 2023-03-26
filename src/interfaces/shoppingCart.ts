export default interface IShoppingCart {
  _id: any;
  //   id: { type: String };
  data: [
    {
      id: { type: Number };
      brand: { type: String };
      name: { type: String };
      imageUrl: { type: String };
      currentPrice: { type: Number };
      previousPrice: { type: Number };
      isFavorite: { type: Boolean };
      amount: { type: Number };
      size: { type: String };
      totalProduct: { type: Number };
    }
  ];
}
