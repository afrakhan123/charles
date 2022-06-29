import { FC } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { NormalTableProps } from 'src/@shared';

export const NormalTable: FC<NormalTableProps> = ({
  columns,
  rows,
  pageSize,
  rowsPerPageOptions,
  getSelectedIds
}) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[rowsPerPageOptions]}
        checkboxSelection
        onSelectionModelChange={itm => getSelectedIds(itm as string[])}
      />
    </Box>
  );
}
