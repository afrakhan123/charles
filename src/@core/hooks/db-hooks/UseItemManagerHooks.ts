import { onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react"
import { FirebaseDB, ItemModel } from 'src/@core';
import { ItemModalFieldsModel, StockModalFieldsModel } from 'src/@shared';
import { uid } from "uid";

export const UseItemManagerHooks = () => {

    const [itemCollection, setItemCollection] = useState<ItemModel[]>();

    useEffect(() => {

        const itemQuery = query(ref(FirebaseDB, 'itemCollection'), orderByChild('itemName'));

        onValue(itemQuery, (snapshot) => {

            let itemCollection: ItemModel[] = [];

            snapshot?.forEach((child) => {

                const { category, cost, itemName, price }: ItemModel = child.val();

                itemCollection.push({
                    id: child.key,
                    category,
                    cost,
                    itemName,
                    price
                });
            });

            setItemCollection(itemCollection);

        });
    }, []);


    function saveItem(itemData: ItemModalFieldsModel): void {

        const uuid = uid();

        set(ref(FirebaseDB, `/itemCollection/${uuid}`), {
            ...itemData
        }).then(i => {
            console.log('success', i)

        });
    }

    // function saveStock({ id, quantity, size }: StockModalFieldsModel): void {

    //     const uuid = uid();

    //     set(ref(FirebaseDB, `/stockCollection/${uuid}`), {
    //         itemId: id, quantity, size
    //     }).then(i => {
    //         console.log('success', i)

    //     });
    // }

    function deleteItem(ids: string[]): void {
        ids.forEach(id => remove(ref(FirebaseDB, `/itemCollection/${id}`)));
    }

    function updateItem(item: ItemModel): void {
        update(ref(FirebaseDB, `itemCollection/${item.id}`), {
            ...item
        });
    }

    return {
        itemCollection,
        saveItem,
        deleteItem,
        updateItem
    }
}
