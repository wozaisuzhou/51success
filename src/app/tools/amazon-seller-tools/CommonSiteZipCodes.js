'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '16px',
  borderRadius: '8px',
}));

const StyledFormControl = styled(FormControl)({
  width: '100%',
  maxWidth: '250px',
  marginBottom: '16px',
});

export default function CommonSiteZipCodes() {
  const [selectedCountry, setSelectedCountry] = useState('All');

  const zipCodes = [
    // United States
    { country: 'United States', code: 'ABE2', zip: '18031', address: 'Breinigsville, PA' },
    { country: 'United States', code: 'ABE3', zip: '18031', address: 'Breinigsville, PA' },
    { country: 'United States', code: 'ATL2', zip: '30329', address: 'Atlanta, GA' },
    { country: 'United States', code: 'BNA2', zip: '37090', address: 'Lebanon, TN' },
    { country: 'United States', code: 'DFW6', zip: '76177', address: 'Fort Worth, TX' },
    { country: 'United States', code: 'LAX9', zip: '91744', address: 'City of Industry, CA' },
    { country: 'United States', code: 'PHX7', zip: '85043', address: 'Phoenix, AZ' },

    // Germany
    { country: 'Germany', code: 'FRA1', zip: '55411', address: 'Bingen' },
    { country: 'Germany', code: 'FRA3', zip: '53639', address: 'Königswinter' },
    { country: 'Germany', code: 'LEJ1', zip: '04347', address: 'Leipzig' },
    { country: 'Germany', code: 'MUC3', zip: '85570', address: 'Markt Schwaben' },

    // Poland
    { country: 'Poland', code: 'KTW1', zip: '41-208', address: 'Sosnowiec' },
    { country: 'Poland', code: 'KTW3', zip: '44-141', address: 'Gliwice' },
    { country: 'Poland', code: 'POZ1', zip: '62-080', address: 'Sady' },
    { country: 'Poland', code: 'SZZ1', zip: '72-001', address: 'Kołbaskowo' },

    // Czech Republic
    { country: 'Czech Republic', code: 'PRG2', zip: '252 61', address: 'Dobrovíz' },

    // United Kingdom
    { country: 'United Kingdom', code: 'BHX1', zip: 'WS15 1NZ', address: 'Rugeley, Staffordshire' },
    { country: 'United Kingdom', code: 'EDI4', zip: 'EH12 9DJ', address: 'Edinburgh' },
    { country: 'United Kingdom', code: 'LBA1', zip: 'DN4 5JS', address: 'Doncaster' },
    { country: 'United Kingdom', code: 'MAN1', zip: 'WA5 3XA', address: 'Warrington' },

    // Canada
    { country: 'Canada', code: 'YVR2', zip: 'V3M 5Y9', address: 'Delta, BC' },
    { country: 'Canada', code: 'YYZ1', zip: 'L6Y 0C9', address: 'Brampton, ON' },
    { country: 'Canada', code: 'YOW1', zip: 'K4B 0K8', address: 'Ottawa, ON' },

    // Japan
    { country: 'Japan', code: 'KIX1', zip: '590-0906', address: 'Sakai-shi, Osaka' },
    { country: 'Japan', code: 'NRT5', zip: '136-0082', address: 'Koto-ku, Tokyo' },
    { country: 'Japan', code: 'HND9', zip: '136-0075', address: 'Koto-ku, Tokyo' },

    // Spain
    { country: 'Spain', code: 'MAD4', zip: '28830', address: 'San Fernando de Henares, Madrid' },
    { country: 'Spain', code: 'BCN1', zip: '08820', address: 'El Prat de Llobregat, Barcelona' },

    // Italy
    { country: 'Italy', code: 'MXP5', zip: '29015', address: 'Castel San Giovanni' },
    { country: 'Italy', code: 'FCO1', zip: '02032', address: 'Passo Corese' },
    { country: 'Italy', code: 'TRN1', zip: '10037', address: 'Torrazza Piemonte' },

    // France
    { country: 'France', code: 'BVA1', zip: '80440', address: 'Boves' },
    { country: 'France', code: 'LIL1', zip: '59553', address: 'Lauwin-Planque' },
    { country: 'France', code: 'LYS1', zip: '71100', address: 'Saône-et-Loire' },
  ];

  const countries = ['All', ...new Set(zipCodes.map((entry) => entry.country))];

  const filteredZipCodes = selectedCountry === 'All'
    ? zipCodes
    : zipCodes.filter((entry) => entry.country === selectedCountry);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
          Common Site Zip Codes
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
          A list of postal codes for common Amazon FBA sites across multiple countries.
        </Typography>
      </Box>

      <StyledFormControl>
        <InputLabel>Select Country</InputLabel>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Select Country"
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Country</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>FBA Code</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Zip Code</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Location</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredZipCodes.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.country}</TableCell>
                <TableCell>{entry.code}</TableCell>
                <TableCell>{entry.zip}</TableCell>
                <TableCell>{entry.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}