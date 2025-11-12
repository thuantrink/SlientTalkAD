import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import { config } from '@/config';
import { SignwordsTable } from '@/components/dashboard/signword/signwords-table';
import { SignwordsFilters } from '@/components/dashboard/signword/signwords-filters';
import type { SignWord } from '@/components/dashboard/signword/signwords-table';
export const metadata = { title: `Ngôn ngữ ký hiệu | Dashboard | ${config.site.name}` } satisfies Metadata;
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

const signwords: SignWord[] = [
  {
    signWordId: 'SW-001',
    word: 'Xin chào',
    definition: 'Lời chào hỏi thông thường.',
    wordType: 'Cụm từ nghi vấn',
    exampleSentence: 'Xin chào mọi người!',
    category: 'Câu hỏi',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isActive: true,
    createdAt: '2025-10-01 09:00',
    updatedAt: '2025-10-15 10:30',
  },
  {
    signWordId: 'SW-002',
    word: 'Gia đình',
    definition: 'Tập hợp các thành viên có quan hệ huyết thống.',
    wordType: 'Danh từ',
    exampleSentence: 'Gia đình là nơi yêu thương.',
    category: 'Gia đình',
    signWordUri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
    isActive: false,
    createdAt: '2025-09-20 08:00',
    updatedAt: '2025-10-10 11:00',
  },
  {
    signWordId: 'SW-003',
    word: 'Trường học',
    definition: 'Nơi diễn ra hoạt động giáo dục.',
    wordType: 'Danh từ',
    exampleSentence: 'Tôi đi học ở trường học gần nhà.',
    category: 'Trường học',
    signWordUri: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    isActive: true,
    createdAt: '2025-08-12 07:30',
    updatedAt: '2025-09-01 12:00',
  },
  {
    signWordId: 'SW-004',
    word: 'Cảm ơn',
    definition: 'Thể hiện sự biết ơn.',
    wordType: 'Cụm từ nghi vấn',
    exampleSentence: 'Cảm ơn bạn đã giúp đỡ.',
    category: 'Câu hỏi',
    signWordUri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isActive: true,
    createdAt: '2025-07-10 09:15',
    updatedAt: '2025-07-20 10:00',
  },
  {
    signWordId: 'SW-005',
    word: 'Chữ A',
    definition: 'Chữ cái đầu tiên trong bảng chữ cái.',
    wordType: 'Chữ cái',
    exampleSentence: 'A như chữ A.',
    category: 'Chữ cái',
    signWordUri: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    isActive: true,
    createdAt: '2025-06-05 08:00',
    updatedAt: '2025-06-06 09:00',
  },
  {
    signWordId: 'SW-006',
    word: 'Hỏi',
    definition: 'Hành động đặt câu hỏi.',
    wordType: 'Động từ',
    exampleSentence: 'Anh ấy muốn hỏi về bài tập.',
    category: 'Câu hỏi',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isActive: false,
    createdAt: '2025-05-21 14:00',
    updatedAt: '2025-06-01 09:30',
  },
  {
    signWordId: 'SW-007',
    word: 'Bạn bè',
    definition: 'Những người thân thiết, chơi chung.',
    wordType: 'Danh từ',
    exampleSentence: 'Tôi đi chơi với bạn bè.',
    category: 'Gia đình',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    isActive: true,
    createdAt: '2025-04-11 11:00',
    updatedAt: '2025-04-20 12:45',
  },
  {
    signWordId: 'SW-008',
    word: 'Động vật',
    definition: 'Sinh vật không phải thực vật.',
    wordType: 'Danh từ',
    exampleSentence: 'Công viên có nhiều động vật.',
    category: 'Trường học',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isActive: true,
    createdAt: '2025-03-08 10:00',
    updatedAt: '2025-03-18 15:00',
  },
  {
    signWordId: 'SW-009',
    word: 'Ăn',
    definition: 'Hành động nạp thức ăn vào cơ thể.',
    wordType: 'Động từ',
    exampleSentence: 'Chúng tôi ăn tối lúc 7 giờ.',
    category: 'Gia đình',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isActive: true,
    createdAt: '2025-02-02 18:00',
    updatedAt: '2025-02-10 19:00',
  },
  {
    signWordId: 'SW-010',
    word: 'Ngủ',
    definition: 'Trạng thái nghỉ ngơi tự nhiên.',
    wordType: 'Động từ',
    exampleSentence: 'Đứa trẻ ngủ trưa.',
    category: 'Trường học',
    signWordUri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isActive: false,
    createdAt: '2025-01-10 22:00',
    updatedAt: '2025-01-12 07:00',
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginated = signwords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">Ngôn ngữ ký hiệu</Typography>
      <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
  <SignwordsFilters />
  <SignwordsTable count={signwords.length} page={page} rows={paginated} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}
