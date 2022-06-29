export interface ConfirmationDialogPropsModel {
    open: boolean;
    title: string;
    content: string;
    handleClose: () => void;
    handleSubmit: () => void;
}