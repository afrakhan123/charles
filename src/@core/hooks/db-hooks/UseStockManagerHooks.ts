import { set, ref, orderByChild, query, onValue, remove, equalTo, update } from "firebase/database";
import { useEffect, useState } from "react";
import { FirebaseDB, StockModel } from "src/@core";
import { StockModalFieldsModel } from "src/@shared";
import { uid } from "uid";


export const UseStockManagerHooks = () => {

    const [itemStockCollection, setStockCollection] = useState<StockModel[]>();

    useEffect(() => {
        const stockQuery = query(ref(FirebaseDB, 'stockCollection'),);

        onValue(stockQuery, (snapshot) => {

            let stockCollection: StockModel[] = [];

            snapshot?.forEach((child) => {

                const data: StockModel = child.val();

                stockCollection.push({
                    ...data,
                    id: child.key || ''
                });
            });

            setStockCollection(stockCollection);

        });
    }, []);

    function saveStock({ id, quantity, size }: StockModalFieldsModel): void {

        const stocks = itemStockCollection?.find(i => i.size === size && i.itemId === id);

        const uuid = stocks?.id || uid();

        set(ref(FirebaseDB, `/stockCollection/${uuid}`), {
            itemId: id, quantity: (stocks?.quantity || 0) + +quantity, size
        }).then(i => {
            console.log('save success')
        });
    }

    function deleteStock(ids: string[]): void {

        ids.forEach(id => {
            const stockQuery = query(ref(FirebaseDB, 'stockCollection'), orderByChild('itemId'), equalTo(id));

            onValue(stockQuery, (snapshot) => {
                snapshot?.forEach((child) => {
                    const data: StockModel = child.val();
                    remove(ref(FirebaseDB, `/stockCollection/${child.key}`));
                });
            });
        });
    }

    function updateStock(stocks: StockModel[]): void {

        const stockCollection: StockModel[] = [];

        (stocks || []).forEach((child) => {

            const data: StockModel = child;

            stockCollection.push({
                ...data,
                id: child.id || ''
            });
        });

        stockCollection.forEach(i => {
            update(ref(FirebaseDB, `stockCollection/${i.id}`), {
                ...i
            });
        });
    }


    return {
        saveStock,
        deleteStock,
        itemStockCollection,
        updateStock
    };
}
