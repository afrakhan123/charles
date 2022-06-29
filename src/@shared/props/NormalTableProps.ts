import { GridColDef } from "@mui/x-data-grid";

export interface NormalTableProps {
    columns: GridColDef[];
    rows: any;
    pageSize: number;
    rowsPerPageOptions: number;
    getSelectedIds: (ids: string[]) => void;
}
