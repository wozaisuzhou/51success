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

export default function FBAAddressDirectory() {
  const [selectedCountry, setSelectedCountry] = useState('All');

  const fbaAddresses = [
    // United States
    { country: 'United States', code: 'ABE2', address: '705 Boulder Dr, Breinigsville, PA 18031', type: 'Fulfillment Center' },
    { country: 'United States', code: 'ABE3', address: '650 Boulder Dr, Breinigsville, PA 18031', type: 'Fulfillment Center' },
    { country: 'United States', code: 'ATL2', address: '2250 N Druid Hills Rd NE, Atlanta, GA 30329', type: 'Fulfillment Center' },
    { country: 'United States', code: 'BNA2', address: '500 Duke Dr, Lebanon, TN 37090', type: 'Fulfillment Center' },
    { country: 'United States', code: 'DFW6', address: '15201 Heritage Pkwy, Fort Worth, TX 76177', type: 'Fulfillment Center' },
    { country: 'United States', code: 'LAX9', address: '15930 Valley Blvd, City of Industry, CA 91744', type: 'Fulfillment Center' },
    { country: 'United States', code: 'PHX7', address: '800 N 75th Ave, Phoenix, AZ 85043', type: 'Fulfillment Center' },

    // Germany
    { country: 'Germany', code: 'FRA1', address: 'Amazon Logistik GmbH, Am Schloßberg 20, 55411 Bingen', type: 'Fulfillment Center' },
    { country: 'Germany', code: 'FRA3', address: 'Amazon Logistik GmbH, Industriestraße 25, 53639 Königswinter', type: 'Fulfillment Center' },
    { country: 'Germany', code: 'LEJ1', address: 'Amazon Logistik GmbH, Amazonstraße 1, 04347 Leipzig', type: 'Fulfillment Center' },
    { country: 'Germany', code: 'MUC3', address: 'Amazon Logistik GmbH, Zeppelinstraße 9, 85570 Markt Schwaben', type: 'Fulfillment Center' },

    // Poland
    { country: 'Poland', code: 'KTW1', address: 'Amazon Fulfillment sp. z o.o., Inwestycyjna 19, 41-208 Sosnowiec', type: 'Fulfillment Center' },
    { country: 'Poland', code: 'KTW3', address: 'Amazon Fulfillment, ul. Bojkowska 80, 44-141 Gliwice', type: 'Fulfillment Center' },
    { country: 'Poland', code: 'POZ1', address: 'Amazon Fulfillment, Poznańska 1d, 62-080 Sady', type: 'Fulfillment Center' },
    { country: 'Poland', code: 'SZZ1', address: 'Amazon Fulfillment sp. z o.o., Kołbaskowo 156, 72-001 Kołbaskowo', type: 'Fulfillment Center' },

    // Czech Republic
    { country: 'Czech Republic', code: 'PRG2', address: 'Amazon Logistic Prague s.r.o., K Amazonu 235, 252 61 Dobrovíz', type: 'Fulfillment Center' },

    // United Kingdom
    { country: 'United Kingdom', code: 'BHX1', address: 'Amazon UK Services Ltd., Towers Business Park, Rugeley, Staffordshire, WS15 1NZ', type: 'Fulfillment Center' },
    { country: 'United Kingdom', code: 'EDI4', address: 'Amazon UK Services Ltd., 2 Lochside Ave, Edinburgh, EH12 9DJ', type: 'Fulfillment Center' },
    { country: 'United Kingdom', code: 'LBA1', address: 'Amazon UK Services Ltd., Balby Carr Bank, Doncaster, DN4 5JS', type: 'Fulfillment Center' },
    { country: 'United Kingdom', code: 'MAN1', address: 'Amazon UK Services Ltd., Omega Plot 7c, Orion Boulevard, Warrington, WA5 3XA', type: 'Fulfillment Center' },

    // Canada
    { country: 'Canada', code: 'YVR2', address: 'Amazon Canada Fulfillment Services, 450 Derwent Pl, Delta, BC V3M 5Y9', type: 'Fulfillment Center' },
    { country: 'Canada', code: 'YYZ1', address: 'Amazon Canada Fulfillment Services, 8050 Heritage Rd, Brampton, ON L6Y 0C9', type: 'Fulfillment Center' },
    { country: 'Canada', code: 'YOW1', address: 'Amazon Canada Fulfillment Services, 5225 Boundary Rd, Ottawa, ON K4B 0K8', type: 'Fulfillment Center' },

    // Japan
    { country: 'Japan', code: 'KIX1', address: 'Amazon Japan G.K., 1-2-2 Kinjocho, Sakai-ku, Sakai-shi, Osaka 590-0906', type: 'Fulfillment Center' },
    { country: 'Japan', code: 'NRT5', address: 'Amazon Japan G.K., 1-1-1 Shinkiba, Koto-ku, Tokyo 136-0082', type: 'Fulfillment Center' },
    { country: 'Japan', code: 'HND9', address: 'Amazon Japan G.K., 2-13-1 Shinsuna, Koto-ku, Tokyo 136-0075', type: 'Fulfillment Center' },

    // Spain
    { country: 'Spain', code: 'MAD4', address: 'Amazon Spain Fulfillment S.L., Avenida de la Astronomía 24, 28830 San Fernando de Henares, Madrid', type: 'Fulfillment Center' },
    { country: 'Spain', code: 'BCN1', address: 'Amazon Spain Fulfillment S.L., Polígono Industrial El Prat, Carrer del Gironès, 08820 El Prat de Llobregat, Barcelona', type: 'Fulfillment Center' },

    // Italy
    { country: 'Italy', code: 'MXP5', address: 'Amazon EU Sarl c/o Amazon Italia Logistica Srl, Strada Dogana Po 2U, 29015 Castel San Giovanni', type: 'Fulfillment Center' },
    { country: 'Italy', code: 'FCO1', address: 'Amazon Italia Logistica S.R.L., Via della Meccanica 4, 02032 Passo Corese', type: 'Fulfillment Center' },
    { country: 'Italy', code: 'TRN1', address: 'Amazon Italia Logistica S.R.L., Strada Provinciale per Rondissone 90, 10037 Torrazza Piemonte', type: 'Fulfillment Center' },

    // France
    { country: 'France', code: 'BVA1', address: 'Amazon France Logistique SAS, 7 Rue des Indes Noirs, 80440 Boves', type: 'Fulfillment Center' },
    { country: 'France', code: 'LIL1', address: 'Amazon France Logistique SAS, Parc logistique de Lauwin-Planque 1, Rue Amazon Douai, 59553 Lauwin-Planque', type: 'Fulfillment Center' },
    { country: 'France', code: 'LYS1', address: 'Amazon France Logistique SAS, Distripôle Chalon, ZAC du Parc d’Activité du Val de Bourgogne, 71100 Saône-et-Loire', type: 'Fulfillment Center' },
  ];

  const countries = ['All', ...new Set(fbaAddresses.map((entry) => entry.country))];

  const filteredAddresses = selectedCountry === 'All'
    ? fbaAddresses
    : fbaAddresses.filter((entry) => entry.country === selectedCountry);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
          FBA Address Directory
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
          A comprehensive list of Amazon FBA warehouse addresses across multiple countries.
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
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Address</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Type</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAddresses.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.country}</TableCell>
                <TableCell>{entry.code}</TableCell>
                <TableCell>{entry.address}</TableCell>
                <TableCell>{entry.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}