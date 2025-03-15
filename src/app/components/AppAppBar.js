import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Stack title and intro vertically
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '12px 16px', // Increased padding for more space
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  letterSpacing: '1px',
  background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.success.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  padding: '4px 12px',
  borderRadius: '8px',
  // Hover effect and transition removed to prevent "floating"
}));

const IntroTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem', // Smaller text for the intro
  color: theme.palette.text.secondary, // Subtle color for contrast
  textAlign: 'center',
  maxWidth: '600px', // Limit width for readability
  marginTop: '8px', // Space between title and intro
}));

export default function AppAppBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
 
    </AppBar>
  );
}