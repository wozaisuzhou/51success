'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import FilterLines from './FilterLines';
import ExtractText from './ExtractText';
import WordFrequencyTool from './WordFrequencyTool';
import Footer from '../../components/Footer'; // Adjust the import path as needed

const StyledContainer = styled(Container)({
  paddingTop: '32px',
  paddingBottom: '32px',
  maxWidth: '1000px',
  margin: '0 auto',
  display: 'flex',
  gap: '24px',
});

const Sidebar = styled(Box)(({ theme }) => ({
  width: '200px',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '8px',
  padding: '8px',
}));

export default function KeywordOptimizationPage() {
  const [selectedWidget, setSelectedWidget] = useState('filter-lines');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const widgets = [
    { id: 'filter-lines', label: 'Filter Lines Containing Keywords' },
    { id: 'extract-text', label: 'Extract Text Containing Keywords' },
    { id: 'word-frequency', label: 'Word Frequency Tool' },
  ];

  if (!isMounted) {
    return (
      <StyledContainer>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
            Loading...
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <>
      <StyledContainer>
        <Sidebar>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', p: 1 }}
          >
            Keyword Optimization Tools
          </Typography>
          <List>
            {widgets.map((widget) => (
              <ListItem key={widget.id} disablePadding>
                <ListItemButton
                  selected={selectedWidget === widget.id}
                  onClick={() => setSelectedWidget(widget.id)}
                  sx={{
                    borderRadius: '4px',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                    },
                    '&:hover': { backgroundColor: 'grey.200' },
                  }}
                >
                  <ListItemText primary={widget.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Sidebar>

        <Box sx={{ flex: 1 }}>
          {selectedWidget === 'filter-lines' && <FilterLines />}
          {selectedWidget === 'extract-text' && <ExtractText />}
          {selectedWidget === 'word-frequency' && <WordFrequencyTool />}
        </Box>
      </StyledContainer>
      <Footer />
    </>
  );
}