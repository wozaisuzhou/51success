'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function EcommerceTools() {
  return (
    <Box sx={{ py: 6, maxWidth: '90vw', mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
        Ecommerce Tools
      </Typography>

      <Box sx={{ textAlign: 'center', maxWidth: '700px' }}>
        <Typography variant="h5" sx={{ color: 'rgb(68, 68, 68)', mb: 1 }}>
          More Ecommerce Tools Will Come
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mb: 2 }}>
          Stay tuned as we expand our suite of tools to empower your ecommerce success!
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(68, 68, 68)' }}>
          Contact us at:{' '}
          <Link
            href="mailto:wozaisuzhou@hotmail.com"
            sx={{ color: 'rgb(29, 150, 219)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            wozaisuzhou@hotmail.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}