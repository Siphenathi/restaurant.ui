import ItemModel from "./reducers/itemModel";

export default interface StoreModel {

    Items: ItemModel[],
    AddedItems: ItemModel[],
    TotalPrice: number,
    TotalQuantity: number
};