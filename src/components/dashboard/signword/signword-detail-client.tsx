"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export const WORD_TYPES = ["Chữ cái", "Cụm từ nghi vấn", "Danh từ", "Động từ"] as const;
export const CATEGORIES = ["Câu hỏi", "Chữ cái", "Gia đình", "Trường học"] as const;

export interface SignWordItem {
  signWordId: string;
  word: string;
  definition: string;
  wordType: typeof WORD_TYPES[number];
  exampleSentence: string;
  category: typeof CATEGORIES[number];
  signWordUri: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  item: SignWordItem;
}

export default function SignwordDetailClient({ item }: Props) {
  const [editMode, setEditMode] = React.useState(false);
  // use a loose type for the editable form to allow dynamic indexing during edits
  const [form, setForm] = React.useState<any>(item ?? null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.word?.trim()) newErrors.word = "Bắt buộc nhập ký hiệu";
    if (!form.definition?.trim()) newErrors.definition = "Bắt buộc nhập định nghĩa";
    if (!form.wordType?.trim()) newErrors.wordType = "Bắt buộc chọn loại từ";
    if (!form.category?.trim()) newErrors.category = "Bắt buộc chọn chủ đề";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const isChanged = Object.keys(form).some((key) => (form as any)[key] !== (item as any)[key]);
    if (!isChanged) {
      setEditMode(false);
      return;
    }

    setEditMode(false);
    setShowSuccess(true);
  };

  const handleCancel = () => {
    setForm(item);
    setEditMode(false);
    setErrors({});
  };

  const isVideo = form.signWordUri && form.signWordUri.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Chi tiết ký hiệu
        </Typography>
        <Link href="/dashboard/signwords">
          <Button variant="outlined">Quay lại danh sách</Button>
        </Link>
      </Stack>

      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 2,
          backgroundColor: "#fff",
          maxWidth: 1150,
          mx: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Thông tin ký hiệu
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} alignItems="stretch">
          <Box sx={{ flex: '1 1 0' }}>
            <Stack spacing={2.8} sx={{ height: "100%" }}>
              <TextField
                label="Ký hiệu"
                value={form.word}
                error={!!errors.word}
                helperText={errors.word}
                InputProps={{ readOnly: !editMode }}
                onChange={(e) => handleChange("word", e.target.value)}
                fullWidth
              />
              <TextField
                label="Định nghĩa"
                value={form.definition}
                multiline
                rows={2}
                error={!!errors.definition}
                helperText={errors.definition}
                InputProps={{ readOnly: !editMode }}
                onChange={(e) => handleChange("definition", e.target.value)}
                fullWidth
              />

              <FormControl fullWidth error={!!errors.wordType}>
                <InputLabel>Loại từ</InputLabel>
                <Select
                  value={form.wordType}
                  label="Loại từ"
                  disabled={!editMode}
                  onChange={(e) => handleChange("wordType", e.target.value)}
                >
                  {WORD_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.wordType && (
                  <Typography color="error" variant="caption">
                    {errors.wordType}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Chủ đề</InputLabel>
                <Select
                  value={form.category}
                  label="Chủ đề"
                  disabled={!editMode}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography color="error" variant="caption">
                    {errors.category}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Câu ví dụ"
                value={form.exampleSentence}
                multiline
                rows={2}
                InputProps={{ readOnly: !editMode }}
                onChange={(e) => handleChange("exampleSentence", e.target.value)}
                fullWidth
              />
              <FormControlLabel
                sx={{ ml: 0.7, mt: -0.85 }}
                control={
                  <Switch
                    checked={form.isActive}
                    disabled={!editMode}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                  />
                }
                label="Trạng thái hoạt động"
              />
            </Stack>
          </Box>

          <Box sx={{ flex: '1 1 0' }}>
            <Stack spacing={2.8} sx={{ height: "100%" }}>
              <TextField
                label="Đường dẫn Video/Ảnh"
                value={form.signWordUri}
                InputProps={{ readOnly: !editMode }}
                onChange={(e) => handleChange("signWordUri", e.target.value)}
                fullWidth
              />

              {isVideo && (
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    bgcolor: "#fafafa",
                    p: 1,
                  }}
                >
                  <video src={form.signWordUri} controls width="100%" style={{ borderRadius: 12 }} />
                </Box>
              )}

              <Divider sx={{ mt: 1, mb: 0.75 }} />

              <Stack direction="row" spacing={2}>
                <TextField label="Ngày tạo" value={form.createdAt} InputProps={{ readOnly: true }} fullWidth />
                <TextField label="Ngày cập nhật" value={form.updatedAt} InputProps={{ readOnly: true }} fullWidth />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Card>

      <Stack direction="row" justifyContent="center" spacing={2}>
        {!editMode ? (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Sửa
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleSave}>
              Lưu lại
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Hủy
            </Button>
          </>
        )}
      </Stack>

      <Snackbar open={showSuccess} autoHideDuration={2500} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Lưu thành công!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
