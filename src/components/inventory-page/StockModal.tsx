import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import { StockPropsModel, StockModalFieldsModel, SizeListConstant } from "src/@shared";

export const StockModal: FC<StockPropsModel> = ({
    open,
    handleClose,
    handleSubmit,
    items
}) => {

    const [formFields, setFormField] = useState<StockModalFieldsModel>({
        id: '',
        quantity: 0,
        size: ''
    });

    const handleQuantity = (event: any) => (setFormField({ ...formFields, quantity: event.target.value }));
    const handleSizeSelect = (event: any, value: any) => (setFormField({ ...formFields, size: value }));
    const handleItemSelect = (event: any, value: any) => (setFormField({ ...formFields, id: value.id }));

    const handleSubmitBtn = (event: any) => {
        event.preventDefault();
        handleSubmit(formFields);
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Add Stock</DialogTitle>
            <form autoComplete="on" onSubmit={handleSubmitBtn}>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        onChange={handleItemSelect}
                        id="combo-box-demo"
                        options={items.map(i => ({ label: i.itemName, id: i.id }))}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField required {...params} label="Select Item" />}
                    />

                    <br />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={SizeListConstant}
                        onChange={handleSizeSelect}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField required {...params} label="Select Size" />}
                    />

                    <br />
                    <TextField label="Enter Qauntity" type={'number'} onChange={handleQuantity} style={{ width: '47%' }} required />

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
