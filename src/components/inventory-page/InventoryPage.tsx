import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { UseInventoryPageHooks } from "src/@core";
import { ConfimationDialog, NormalTable } from "src/@shared/";
import { ItemModal } from "./ItemModal";
import { EditStockModal } from "./EditStockModal";
import { StockModal } from "./StockModal";

const InventoryPage: FC = () => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            sortable: false,
            hide: true,
        },
        {
            field: 'itemName',
            headerName: 'Item Name',
            minWidth: 360,
            sortable: true,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 100,
            sortable: true,
            editable: false,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            type: 'number',
            minWidth: 300,
            sortable: true,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'Price',
            sortable: true,
            minWidth: 300,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            sortable: true,
            minWidth: 300,
        },
    ];


    const {
        selectedIds,
        openItem,
        openStock,
        items,
        openConfirmationDialog,
        openOpenStock,
        selectedItem,
        selectedStocks,
        handleOpenStockOpen,
        handleOpenStockClose,
        handleItemOpen,
        handleStockOpen,
        handleOpenConfirmationOpen,
        handleItemClose,
        handleItmeSubmit,
        handleStockClose,
        handleStockSubmit,
        handleGetSelectedIds,
        handleOpenStockSubmit,
        handleDelete,
        handleOpenConfirmationClose
    } = UseInventoryPageHooks();


    return (
        <>
            <div className="container">
                <Button variant="outlined" size="medium" onClick={handleItemOpen}>
                    Add Item
                </Button>
                <Button style={{ marginLeft: '10px' }} variant="outlined" color="secondary" size="medium" onClick={handleStockOpen}>
                    Add Stock
                </Button>
                <Button disabled={selectedIds.length !== 1} style={{ marginLeft: '10px' }} variant="outlined" color="success" size="medium" onClick={handleOpenStockOpen}>
                    Open Stock
                </Button>
                <Button disabled={selectedIds.length < 1} style={{ marginLeft: '10px' }} variant="outlined" color="error" size="medium" onClick={handleOpenConfirmationOpen}>
                    Delete Stock
                </Button>
                <ItemModal
                    open={openItem}
                    handleClose={handleItemClose}
                    handleSubmit={handleItmeSubmit}
                />
                <StockModal
                    open={openStock}
                    handleClose={handleStockClose}
                    handleSubmit={handleStockSubmit}
                    items={(items || [])}
                />
                <EditStockModal
                    open={openOpenStock}
                    handleClose={handleOpenStockClose}
                    handleSubmit={handleOpenStockSubmit}
                    item={selectedItem || ({
                        category: '',
                        cost: 0,
                        id: '',
                        itemName: 'xzzzzzzzz',
                        price: 0
                    })}
                    stocks={selectedStocks || []}
                />

                <ConfimationDialog
                    open={openConfirmationDialog}
                    handleClose={handleOpenConfirmationClose}
                    handleSubmit={handleDelete}
                    content={"Are you sure you want to delete the selected Item?"}
                    title={"Confirmation"}
                />
            </div>
            <div style={{ height: '350px', marginTop: '20px' }}>
                {
                    items ?
                        <NormalTable
                            columns={columns}
                            rows={items}
                            pageSize={5}
                            rowsPerPageOptions={5}
                            getSelectedIds={handleGetSelectedIds}
                        />
                        :
                        <><div className="container" style={{ textAlign: 'center' }}><h2>Loading...</h2></div></>
                }
            </div>
        </>
    );
}

export default InventoryPage;
