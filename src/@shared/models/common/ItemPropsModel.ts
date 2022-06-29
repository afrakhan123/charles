import { ItemModalFieldsModel } from "./ItemModalFieldsModel";

export interface ItemPropsModel {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (data: ItemModalFieldsModel) => boolean;
}
