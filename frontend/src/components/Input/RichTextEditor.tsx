import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, FormHelperText, InputLabel, Stack } from '@mui/material';

export interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  minHeight?: number | string;
  maxWords?: number;
  showWordCount?: boolean;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};

const formats = ['bold', 'italic', 'underline', 'list', 'link'];

export function countWords(text: string): number {
  if (!text) return 0;
  const plainText = text.replace(/<[^>]*>/g, ' ').trim();
  if (!plainText) return 0;
  return plainText.split(/\s+/).filter(Boolean).length;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = 'Write description here...',
  error = false,
  helperText,
  minHeight = 120,
  maxWords,
  showWordCount = true,
}: RichTextEditorProps) {
  const wordCount = countWords(value);
  const isOverWordLimit = Boolean(maxWords && wordCount > maxWords);
  const isError = error || isOverWordLimit;

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <InputLabel
          sx={{
            fontWeight: 600,
            fontSize: 13,
            mb: 0.75,
            color: isError ? 'error.main' : 'text.primary',
          }}
        >
          {label}
        </InputLabel>
      )}

      <Box
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: isError ? 'error.main' : 'divider',
          overflow: 'hidden',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus-within': {
            borderColor: isError ? 'error.main' : 'primary.main',
            boxShadow: (theme) => `0 0 0 2px ${isError ? theme.palette.error.main : theme.palette.primary.main}25`,
          },
          '& .ql-toolbar.ql-snow': {
            bgcolor: 'action.hover',
            borderColor: 'divider',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            fontFamily: 'inherit',
            py: 0.75,
            px: 1,
          },
          '& .ql-container.ql-snow': {
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
          },
          '& .ql-editor': {
            minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'text.primary',
            '&.ql-blank::before': {
              color: 'text.disabled',
              fontStyle: 'normal',
            },
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      </Box>

      {(helperText || showWordCount || maxWords) && (
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 0.5, px: 0.5 }}>
          <Box sx={{ flex: 1 }}>
            {helperText && (
              <FormHelperText error={isError} sx={{ mx: 0, my: 0 }}>
                {helperText}
              </FormHelperText>
            )}
          </Box>
          {(showWordCount || maxWords) && (
            <FormHelperText
              error={isOverWordLimit}
              sx={{
                mx: 0,
                my: 0,
                ml: 'auto',
                fontWeight: 600,
                color: isOverWordLimit ? 'error.main' : 'text.secondary',
              }}
            >
              Word count: {wordCount} {maxWords ? `/ ${maxWords}` : ''} words
            </FormHelperText>
          )}
        </Stack>
      )}
    </Box>
  );
}
