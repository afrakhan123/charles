import { Alert, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, TextField, Typography } from "@mui/material";
import { CategoryListConstant, ItemModalFieldsModel, ItemPropsModel } from "src/@shared";

import { FC, useState } from "react";


export const ItemModal: FC<ItemPropsModel> = ({
    open,
    handleClose,
    handleSubmit
}) => {

    const [formFields, setFormField] = useState<ItemModalFieldsModel>({
        itemName: '',
        price: 0,
        cost: 0,
        category: '',
        // size: ''
    });

    const [res, setRes] = useState(true);

    const handleItemName = (event: any) => (setFormField({ ...formFields, itemName: event.target.value }));
    const handlePrice = (event: any) => (setFormField({ ...formFields, price: event.target.value }));
    const handleCost = (event: any) => (setFormField({ ...formFields, cost: event.target.value }));
    const handleCategorySelect = (event: any, value: any) => (setFormField({ ...formFields, category: value }));
    // const handleSizeSelect = (event: any, value: any) => (setFormField({ ...formFields, size: value }));

    const handleSubmitBtn = (event: any) => {
        event.preventDefault();
        setRes(handleSubmit(formFields));
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Add Item</DialogTitle>
            <form autoComplete="on" onSubmit={handleSubmitBtn}>
                <DialogContent>
                    <TextField label="Enter Item Name" style={{ width: '100%' }} onChange={handleItemName} focused required />
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
                    <TextField label="Enter Price" type={'number'} onChange={handlePrice} style={{ width: '47%' }} required />
                    <TextField label="Enter Cost" type={'number'} onChange={handleCost} style={{ marginLeft: '6%', width: '47%' }} required />
                    <br />
                    <br />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={CategoryListConstant}
                        onChange={handleCategorySelect}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField required {...params} label="Select Category" />}
                    />
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
