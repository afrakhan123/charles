import { SizeEnum } from "src/@shared";

export interface StockModalFieldsModel {
    id: string;
    size: SizeEnum | '';
    quantity: number;
}
