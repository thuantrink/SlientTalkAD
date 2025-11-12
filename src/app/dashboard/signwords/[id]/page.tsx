import SignwordDetailClient, { SignWordItem as _SignWordItem } from '@/components/dashboard/signword/signword-detail-client';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Reuse the type exported from the client component for consistency
type SignWordItem = _SignWordItem;

const signwords: SignWordItem[] = [
  {
    signWordId: 'SW-001',
    word: 'Xin chào',
    definition: 'Lời chào hỏi thông thường.',
    wordType: 'Cụm từ nghi vấn',
    exampleSentence: 'Xin chào mọi người!',
    category: 'Câu hỏi',
    signWordUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isActive: true,
    createdAt: '2025-10-01 09:00',
    updatedAt: '2025-10-15 10:30',
  },
];

interface Props {
  params: any;
}

export default function Page({ params }: Props) {
  const { id } = params;
  const item = signwords.find((i) => i.signWordId === id);

  if (!item) {
    return (
      <Stack spacing={3}>
        <Typography variant="h5">Không tìm thấy ký hiệu</Typography>
        <Button variant="outlined" href="/dashboard/signwords">
          Quay lại danh sách
        </Button>
      </Stack>
    );
  }

  // Render the interactive client component and pass the item as prop
  return <SignwordDetailClient item={item} />;
}
