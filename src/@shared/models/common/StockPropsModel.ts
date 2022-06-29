import { ItemModel } from "src/@core";
import { StockModalFieldsModel } from "./StockModalFieldsModel";

export interface StockPropsModel {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (data: StockModalFieldsModel) => void;
    items: ItemModel[]
}
