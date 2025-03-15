'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input': { padding: '8px 12px' },
  width: '100%',
  maxWidth: '900px', // Increased from 700px to 900px for wider input
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: '4px 12px',
  fontSize: '14px',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '16px',
  borderRadius: '8px',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: '12px',
  borderRadius: '8px',
  marginTop: '16px',
}));

const PaginationBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

const ButtonBox = styled(Box)({
  display: 'flex',
  gap: '8px', // Space between buttons
});

export default function WordFrequencyTool() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ chars: 0, words: 0, sentences: 0 });
  const [wordFreq, setWordFreq] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleAnalyze = () => {
    if (!text) {
      setStats({ chars: 0, words: 0, sentences: 0 });
      setWordFreq([]);
      setPage(1);
      return;
    }

    const charCount = text.replace(/\n/g, '').length;
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+(?=\s|$)/).filter(Boolean);
    const sentenceCount = sentences.length;

    const freqMap = {};
    words.forEach((word) => {
      freqMap[word] = (freqMap[word] || 0) + 1;
    });
    const sortedFreq = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / wordCount) * 100).toFixed(2),
      }));

    setStats({ chars: charCount, words: wordCount, sentences: sentenceCount });
    setWordFreq(sortedFreq);
    setPage(1);
  };

  const handleClear = () => {
    setText('');
    setStats({ chars: 0, words: 0, sentences: 0 });
    setWordFreq([]);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedWordFreq = wordFreq.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(wordFreq.length / itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
        Word Frequency Tool
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)' }}>
        Analyze character, word, and sentence counts, along with word frequency and percentages.
      </Typography>

      <StyledTextField
        label="Input Text"
        multiline
        rows={12} // Increased from 8 to 12 for taller input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze"
      />

      <ButtonBox>
        <StyledButton variant="contained" onClick={handleAnalyze}>
          Process
        </StyledButton>
        <StyledButton variant="outlined" onClick={handleClear}>
          Clear
        </StyledButton>
      </ButtonBox>

      {stats.chars > 0 && (
        <StatsBox>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Statistics
          </Typography>
          <Typography variant="body2">Characters: {stats.chars}</Typography>
          <Typography variant="body2">Words: {stats.words}</Typography>
          <Typography variant="body2">Sentences: {stats.sentences}</Typography>
        </StatsBox>
      )}

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', mt: 2 }}>
        Word Frequency
      </Typography>
      {wordFreq.length > 0 ? (
        <>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Word</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Count</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Percentage</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedWordFreq.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.word}</TableCell>
                    <TableCell>{entry.count}</TableCell>
                    <TableCell>{entry.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          {totalPages > 1 && (
            <PaginationBox>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </PaginationBox>
          )}
        </>
      ) : (
        <Typography variant="body1">Enter text and click "Process" to see statistics and word frequency.</Typography>
      )}
    </Box>
  );
}