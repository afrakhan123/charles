import { SizeEnum } from "src/@shared";

export interface StockModel {
    id: string;
    itemId: string;
    size: SizeEnum | '';
    quantity: number;
}
