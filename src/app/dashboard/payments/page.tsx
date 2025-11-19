"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/service/adminPaymentService";
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { PaymentsFilters } from '@/components/dashboard/payment/payments-filters';
import { PaymentsTable, type Payment } from '@/components/dashboard/payment/payments-table';

//export const metadata = { title: `Quản lý thanh toán | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await getPayments({
        keyword: keyword,
        currentPage: currentPage,
        pageSize: pageSize,
      });

      console.log("API returns: ", res.data);
      setPayments(res.data.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, pageSize]);
  return (
    <div>
      <h1>Quản lý thanh toán</h1>
      <pre>{JSON.stringify(payments, null, 2)}</pre>
    </div>
  );
}  


// export default function Page(): React.JSX.Element {
//   const page = 0;
//   const rowsPerPage = 5;

//   const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

//   return (
//     <Stack spacing={3}>
//       <Stack direction="row" spacing={3}>
//         <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//           <Typography variant="h4">Quản lý thanh toán</Typography>
//           {/*
//           <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//             <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
//               Import
//             </Button>
//             <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
//               Export
//             </Button>
//           </Stack>
//           */}
//         </Stack>
        
//         <div>
//           <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
//             Add
//           </Button>
//         </div>
        
//       </Stack>
//       <PaymentsFilters/>
//       <PaymentsTable
//         count={paginatedCustomers.length}
//         page={page}
//         rows={paginatedCustomers}
//         rowsPerPage={rowsPerPage}
//       />
//     </Stack>
//   );
// }

// function applyPagination(rows: Payment[], page: number, rowsPerPage: number): Payment[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
