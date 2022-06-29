import { ItemModel, StockModel } from "src/@core";

export interface EditModalPropsModel {
    item: ItemModel;
    stocks: StockModel[];
    open: boolean;
    handleClose: () => void;
    handleSubmit: (item: ItemModel, stocks: StockModel[]) => boolean;
}
