'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface Payment {
  id: string;
  email: string;
  name: string;
  phone: string;
  paymentId: string;
  userPlanId: string;
  amount: number;
  currency: string;
  paymentDate: string;
  status: boolean;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentsTableProps {
  count?: number;
  page?: number;
  rows?: Payment[];
  rowsPerPage?: number;
}

export function PaymentsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: PaymentsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((payment) => payment.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
             
              <TableCell>Email</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày thanh toán</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                 
                  <TableCell>
                    <Link href={`/dashboard/payments/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="subtitle2">{row.email}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                  <TableCell>{row.status}</TableCell>                  
                  <TableCell align="right">
                    <Link href={`/dashboard/customers/${row.id}`}>
                      <Button variant="outlined" size="small">Chi tiết</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
