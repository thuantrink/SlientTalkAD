
import * as React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

// Dữ liệu mẫu, thực tế nên fetch từ API hoặc truyền qua props
const users = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
  },
  {
    id: 'USR-009',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-9.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
  },
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    email: 'jie.yan.song@devias.io',
    phone: '770-635-2682',
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/avatar-7.png',
    email: 'nasimiyu.danai@devias.io',
    phone: '801-301-7894',
  },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/avatar-6.png',
    email: 'iulia.albu@devias.io',
    phone: '313-812-8947',
  },
];

interface Props {
  params: any;
}

export default function Page({ params }: Props): React.JSX.Element {
  const { id } = params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4">Không tìm thấy người dùng</Typography>
        <Link href="/dashboard/customers">
          <Button variant="outlined">Quay lại danh sách</Button>
        </Link>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Người dùng</Typography>
        <Box sx={{ flex: 1 }} />
        <Link href="/dashboard/customers">
          <Button variant="outlined" sx={{ borderRadius: 2, px: 3, py: 1 }}>Trở về</Button>
        </Link>
      </Stack>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center', alignItems: 'flex-start', width: '100%'  }}>
        <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', mx: 3, alignItems: 'center', p: 6.3 }}>
          <Avatar src={user.avatar} sx={{ width: 100, height: 100, mb: 5.65 }} />
          <Typography variant="h5">{user.name}</Typography>
        </Card>
        <Card sx={{ width: 400, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ mb: 0 }}>Hồ sơ</Typography>
          <Divider sx={{ mt: -0.5, mb: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Tên người dùng"
            value={user.name}
            InputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Số điện thoại"
            value={user.phone}
            InputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />
          </Box>
          <TextField
            label="Email"
            value={user.email}
            InputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />
        </Card>
      </Box>
    </Stack>
  );
}
