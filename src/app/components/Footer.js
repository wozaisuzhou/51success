import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {'Copyright © '}
      <Link
        color="inherit"
        href="http://www.51success.ca/"
        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
      >
        51Success
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

export default function Footer() {
  return (
    <Container
      component="footer"
      sx={{
        mt: { xs: 6, sm: 8 },
        py: { xs: 4, sm: 6 },
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
   
        <Copyright />
      </Box>
    </Container>
  );
}