'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input': { padding: '8px 12px' },
  width: '100%',
  maxWidth: '500px',
}));

const StyledOutputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.grey[100],
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    color: theme.palette.text.primary,
  },
  width: '100%',
  maxWidth: '500px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: '4px 12px', // Reduced padding for a smaller size
  fontSize: '14px',   // Smaller font size
}));

export default function FilterLines() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [filteredLines, setFilteredLines] = useState('');

  const handleFilter = () => {
    if (!text || !keywords) {
      setFilteredLines('');
      return;
    }
    const keywordArray = keywords.split(/[\s,]+/).filter(Boolean);
    const lines = text.split('\n');
    const result = lines
      .filter((line) =>
        !keywordArray.some((keyword) => line.toLowerCase().includes(keyword.toLowerCase()))
      )
      .join('\n');
    setFilteredLines(result);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
        Filter Lines Containing Keywords
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)' }}>
        Remove lines of text that contain specific keywords.
      </Typography>

      <StyledTextField
        label="Input Text"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text (one line per entry)"
      />
      <StyledTextField
        label="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords (comma or space separated)"
      />

      <StyledButton variant="contained" onClick={handleFilter}>
        Process
      </StyledButton>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', mt: 2 }}>
        Filtered Lines
      </Typography>
      <StyledOutputField
        label="Output"
        multiline
        rows={4}
        value={filteredLines}
        InputProps={{ readOnly: true }}
        placeholder="Filtered lines will appear here"
      />
    </Box>
  );
}