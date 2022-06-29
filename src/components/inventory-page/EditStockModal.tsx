import { Dialog, DialogTitle, DialogContent, TextField, Alert, Autocomplete, DialogActions, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CategoryListConstant, EditModalPropsModel } from "src/@shared";

export const EditStockModal: FC<EditModalPropsModel> = ({
    item,
    stocks,
    open,
    handleClose,
    handleSubmit
}) => {
    const [currItem, setCurrItem] = useState(item);
    const [currStocks, setCurrStocks] = useState(stocks);
    const [res, setRes] = useState(true);

    useEffect(() => {
        setCurrItem(item);
        setCurrStocks(stocks);
    }, [item, stocks]);


    const handleItemName = (event: any) => (setCurrItem({ ...currItem, itemName: event.target.value }));
    const handleItemPrice = (event: any) => (setCurrItem({ ...currItem, price: event.target.value }));
    const handleItemCost = (event: any) => (setCurrItem({ ...currItem, cost: event.target.value }));

    const handleStockCost = (event: any, index: number) => {

        stocks[index].quantity = event.target.value;

        setCurrStocks([
            ...stocks
        ]);
    };

    const handleCategorySelect = (event: any, value: any) => (setCurrItem({ ...currItem, category: value }));

    const handleSubmitBtn = (event: any) => {
        event.preventDefault();
        setRes(handleSubmit(currItem, currStocks));

        handleClose();

    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Item Stock Details</DialogTitle>
            <form autoComplete="on" onSubmit={handleSubmitBtn}>
                <DialogContent>
                    <TextField label="Enter Item Name" value={currItem.itemName} style={{ width: '100%' }} onChange={handleItemName} focused required />
                    <br />
                    <br />
                    {
                        !res ?
                            <>
                                <Alert severity="error">Name already exist!</Alert>
                                <br />
                            </>
                            : <>
                            </>
                    }
                    <TextField label="Enter Price" value={currItem.price} type={'number'} onChange={handleItemPrice} style={{ width: '47%' }} required />
                    <TextField label="Enter Cost" value={currItem.cost} type={'number'} onChange={handleItemCost} style={{ marginLeft: '6%', width: '47%' }} required />
                    <br />
                    <br />
                    <Autocomplete
                        value={currItem.category}
                        disablePortal
                        id="combo-box-demo"
                        options={CategoryListConstant}
                        onChange={handleCategorySelect}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField required {...params} label="Select Category" />}
                    />
                    <br />
                    {stocks.length > 0 ? <h4>Inventory</h4> : <></>}
                    {stocks.map((i, index) => (<div key={index}>
                        <TextField label="Size" style={{ width: '48%' }} value={i.size} disabled aria-readonly />
                        <TextField label="Enter Quantity" type={'number'} value={i.quantity} onChange={(event) => handleStockCost(event, index)} style={{ marginLeft: '4%', width: '48%' }} required />
                        <br />
                        <br />
                    </div>))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
