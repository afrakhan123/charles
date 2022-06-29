import { useState } from "react";
import { ItemModel, StockModel, UseItemManagerHooks, UseStockManagerHooks } from "src/@core";
import { ItemModalFieldsModel, ItemStockTableModel, StockModalFieldsModel } from "src/@shared";

export const UseInventoryPageHooks = () => {
    const { itemCollection, saveItem, deleteItem, updateItem } = UseItemManagerHooks();
    const { saveStock, deleteStock, itemStockCollection, updateStock } = UseStockManagerHooks();

    const [openItem, setItemOpen] = useState(false);
    const [openStock, setStockOpen] = useState(false);
    const [openOpenStock, setOpenOpenStock] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<ItemModel>();
    const [selectedStocks, setSelectedStocks] = useState<StockModel[]>();

    const handleItemOpen = () => setItemOpen(true);
    const handleItemClose = () => setItemOpen(false);

    const handleStockOpen = () => setStockOpen(true);
    const handleStockClose = () => setStockOpen(false);

    const handleOpenStockOpen = () => setOpenOpenStock(true);
    const handleOpenStockClose = () => setOpenOpenStock(false);

    const handleOpenConfirmationOpen = () => setOpenConfirmationDialog(true);
    const handleOpenConfirmationClose = () => setOpenConfirmationDialog(false);

    const handleItmeSubmit = (data: ItemModalFieldsModel): boolean => {
        if (itemCollection?.find(i => i.itemName.trim().toLowerCase() === data.itemName.trim().toLowerCase())) {
            return false;
        }

        saveItem(data);
        handleItemClose();

        return true;
    }

    const handleOpenStockSubmit = (item: ItemModel, stocks: StockModel[]): boolean => {
        // if (itemCollection?.find(i => i.itemName.trim().toLowerCase() === item.itemName.trim().toLowerCase())) {
        //     return false;
        // }
        updateItem(item);
        updateStock(stocks);

        return true;
    }

    const handleStockSubmit = (data: StockModalFieldsModel) => {
        saveStock(data);
        handleStockClose();
    }

    const handleGetSelectedIds = (ids: string[]) => {
        setSelectedIds(ids);

        if (ids.length === 1) {
            setSelectedItem(itemCollection?.find(i => i.id === ids[0]));
            setSelectedStocks(itemStockCollection?.filter(i => i.itemId === ids[0]));
        } else {
            setSelectedItem(undefined);
        }
    }

    const handleDelete = () => {
        deleteItem(selectedIds);
        deleteStock(selectedIds);
    }

    return {
        openItem,
        openStock,
        openConfirmationDialog,
        selectedIds,
        openOpenStock,
        items: itemCollection?.map(i => ({
            ...i,
            stock: itemStockCollection
                ?.filter(is => is.itemId === i.id)
                .reduce((a, b) => a + +b.quantity, 0)
        } as ItemStockTableModel)),
        itemCollection,
        selectedItem,
        selectedStocks,
        handleItemOpen,
        handleItemClose,
        handleOpenConfirmationOpen,
        handleOpenConfirmationClose,
        handleItmeSubmit,
        handleStockSubmit,
        handleStockOpen,
        handleStockClose,
        handleOpenStockOpen,
        handleOpenStockClose,
        handleOpenStockSubmit,
        handleGetSelectedIds,
        handleDelete,
    };
}
