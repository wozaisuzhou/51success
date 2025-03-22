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
import FBAAddressDirectory from './FBAAddressDirectory';
import CommonSiteZipCodes from './CommonSiteZipCodes';
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

export default function AmazonSellerToolsPage() {
  const [selectedWidget, setSelectedWidget] = useState('fba-address');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const widgets = [
    { id: 'fba-address', label: 'FBA Address Directory' },
    { id: 'zip-codes', label: 'Common Site Zip Codes' },
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
            Amazon Seller Tools
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
          {selectedWidget === 'fba-address' && <FBAAddressDirectory />}
          {selectedWidget === 'zip-codes' && <CommonSiteZipCodes />}
        </Box>
      </StyledContainer>
      <Footer />
    </>
  );
}