"use client";

import '@google/model-viewer';
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
//import "@google/model-viewer";

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
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_ROOT;
  const [fileType, setFileType] = React.useState<'video' | 'glb' | null>(null);
 
  React.useEffect(() => {
    if (!form?.signWordUri) {
      setFileType(null);
    } else if (form.signWordUri.match(/\.(mp4|webm|ogg)$/i)) {
      setFileType('video');
    } else if (form.signWordUri.match(/\.glb$/i)) {
      setFileType('glb');
    } else {
      setFileType(null);
    }
  }, [form.signWordUri]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      handleChange("signWordUri", url);
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!(form.word ?? item.data.word)?.trim()) newErrors.word = "Bắt buộc nhập ký hiệu";
    if (!(form.definition ?? item.data.definition)?.trim()) newErrors.definition = "Bắt buộc nhập định nghĩa";
    if (!(form.wordType ?? item.data.wordType)?.trim()) newErrors.wordType = "Bắt buộc chọn loại từ";
    if (!(form.category ?? item.data.category)?.trim()) newErrors.category = "Bắt buộc chọn chủ đề";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSave = () => {
  //   if (!validateForm()) return;

  //   const isChanged = Object.keys(form).some((key) => (form as any)[key] !== (item as any)[key]);
  //   if (!isChanged) {
  //     setEditMode(false);
  //     return;
  //   }

  //   setEditMode(false);
  //   setShowSuccess(true);
  // };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = {
      word: form.word ?? item.data.word,
      definition: form.definition ?? item.data.definition,
      wordType: form.wordType ?? item.data.wordType,
      category: form.category ?? item.data.category,
      exampleSentence: form.exampleSentence ?? item.data.exampleSentence,
      isActive: form.isActive ?? item.data.isActive,
    };

    const isChanged = Object.keys(payload).some(
      (key) => (payload as any)[key] !== (item as any)[key]
    );

    try {
      if (isChanged) {
        const res = await fetch(`${baseUrl}/api/admin/signwords/${item.data.signWordId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.text();
          console.error("Update failed:", err);
          alert("Lỗi khi cập nhật ký hiệu!");
          return;
        }
      }

      if (selectedFile) {
        const videoForm = new FormData();
        videoForm.append("file", selectedFile);

        const videoRes = await fetch(`${baseUrl}/api/admin/upload-video/${item.data.signWordId}`, {
          method: "POST",
          body: videoForm,
        });

        if (!videoRes.ok) {
          const err = await videoRes.text();
          console.error("Upload video failed:", err);
          alert("Lỗi khi upload video!");
          return;
        }
      }

      setEditMode(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Save error:", error);
      alert("Có lỗi xảy ra khi lưu!");
    }
  };

  const handleCancel = () => {
    setForm(item);
    setEditMode(false);
    setErrors({});
  };

  const isVideo = form.signWordUri && form.signWordUri.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Stack spacing={3} sx={{
      mt: 3,
      alignItems: 'flex-start',
      width: '100%',
      //display: 'flex',
      //justifyContent: 'flex-start'
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start"
        sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Chi tiết ký hiệu
        </Typography>
        <Stack direction="row" spacing={2}>
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
          <Link href="/dashboard/signwords">
            <Button variant="outlined">Quay lại danh sách</Button>
          </Link>
        </Stack>
      </Stack>

      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 2,
          backgroundColor: "#fff",
          // maxWidth: 1150,
          width: '100%',
          maxWidth: "100%",
          //mx: "auto",
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
                disabled={!editMode}
                value={form.word ?? item.data.word}
                error={!!errors.word}
                helperText={errors.word}
                InputProps={{ readOnly: !editMode }}
                sx={{ height: "80%" }}
                onChange={(e) => handleChange("word", e.target.value)}
                fullWidth
              />
              <TextField
                label="Định nghĩa"
                sx={{ height: "80%" }}
                disabled={!editMode}
                value={form.definition ?? item.data.definition}
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
                  value={form.wordType ?? item.data.wordType}
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
                  value={form.category ?? item.data.category}
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
                disabled={!editMode}
                value={form.exampleSentence ?? item.data.exampleSentence}
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
                    checked={form.isActive ?? item.data.isActive}
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

              {editMode && (
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 1 }}
                >
                  Chọn file
                  <input
                    type="file"
                    hidden
                    accept="video/*,.glb"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                </Button>
              )}

              {!(form.signWordUri?.endsWith(".glb") ?? item.data.signWordUri.endsWith(".glb")) &&
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    bgcolor: "#fafafa",
                    p: 1,
                    mt: 2,
                  }}
                >
                  <Typography sx={{ mb: 1, fontWeight: 600 }}>Video ký hiệu</Typography>
                  <video
                    src={form.signWordUri ?? (baseUrl + item.data.signWordUri)}
                    controls
                    width="100%"
                    style={{ borderRadius: 12 }}
                  />
                </Box>
              }


              {(form.signWordUri?.endsWith(".glb") ?? item.data.signWordUri.endsWith(".glb")) && (
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    bgcolor: "#fafafa",
                    p: 1,
                    mt: 2,
                  }}
                >
                  <Typography sx={{ mb: 1, fontWeight: 600 }}>Mô hình 3D</Typography>
                  <model-viewer
                    src={form.signWordUri ?? (baseUrl + item.data.signWordUri)}
                    camera-target="0m 1m 0m"
                    min-camera-orbit="auto auto 1.5m"
                    max-camera-orbit="auto auto 5m"
                    autoplay
                    style={{ width: "100%", height: 300 }}
                  />
                </Box>
              )}
              <Divider sx={{ mt: 1, mb: 0.75 }} />

              {/* <Stack direction="row" spacing={2}>
                <TextField label="Ngày tạo" value={form.createdAt} InputProps={{ readOnly: true }} fullWidth />
                <TextField label="Ngày cập nhật" value={form.updatedAt} InputProps={{ readOnly: true }} fullWidth />
              </Stack> */}
            </Stack>
          </Box>
        </Stack>
      </Card>


      <Snackbar open={showSuccess} autoHideDuration={2500} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Lưu thành công!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
