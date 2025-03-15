'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px', // Adjust padding for better fit
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(12px, 8px) scale(1)', // Adjust label position when not shrunk
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(12px, -6px) scale(0.75)', // Position when shrunk
  },
  width: '100%',
  maxWidth: '250px', // Slightly larger to fit placeholders
}));

export default function ProfitCalculator() {
  const [productPrice, setProductPrice] = useState('');
  const [shippingFee, setShippingFee] = useState('');
  const [platformFee, setPlatformFee] = useState('');
  const [productCost, setProductCost] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [storageCost, setStorageCost] = useState('');
  const [adCost, setAdCost] = useState('');
  const [otherCost, setOtherCost] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [netProfit, setNetProfit] = useState(0);
  const [netProfitUSD, setNetProfitUSD] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [profitRate, setProfitRate] = useState(0);

  const calculateProfit = () => {
    const price = parseFloat(productPrice) || 0;
    const shipping = parseFloat(shippingFee) || 0;
    const platform = parseFloat(platformFee) || 0;
    const cost = parseFloat(productCost) || 0;
    const shippingC = parseFloat(shippingCost) || 0;
    const storage = parseFloat(storageCost) || 0;
    const ad = parseFloat(adCost) || 0;
    const other = parseFloat(otherCost) || 0;
    const rate = parseFloat(exchangeRate) || 1;

    const revenue = price + shipping;
    const costTotal = platform + cost + shippingC + storage + ad + other;
    const profit = revenue - costTotal;
    const profitUSD = profit * rate;
    const calculatedProfitRate = revenue > 0 ? (profit / revenue) * 100 : 0;

    setTotalRevenue(revenue);
    setTotalCost(costTotal);
    setNetProfit(profit);
    setNetProfitUSD(profitUSD);
    setProfitRate(calculatedProfitRate);
  };

  useEffect(() => {
    calculateProfit();
  }, [productPrice, shippingFee, platformFee, productCost, shippingCost, storageCost, adCost, otherCost, exchangeRate]);

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
          Profit Calculator
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
          Calculate your profit based on revenue and costs.
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
        Product Revenue
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <StyledTextField
          label="Product Price (Local Currency)"
          value={productPrice}
          onChange={handleInputChange(setProductPrice)}
          placeholder="Enter product price"
          type="number"
        />
        <StyledTextField
          label="Shipping Fee (Local Currency)"
          value={shippingFee}
          onChange={handleInputChange(setShippingFee)}
          placeholder="Enter shipping fee"
          type="number"
        />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', mt: 2 }}>
        Product Cost
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <StyledTextField
          label="Platform Fee"
          value={platformFee}
          onChange={handleInputChange(setPlatformFee)}
          placeholder="Enter platform fee"
          type="number"
        />
        <StyledTextField
          label="Product Cost"
          value={productCost}
          onChange={handleInputChange(setProductCost)}
          placeholder="Enter product cost"
          type="number"
        />
        <StyledTextField
          label="Shipping Cost"
          value={shippingCost}
          onChange={handleInputChange(setShippingCost)}
          placeholder="Enter shipping cost"
          type="number"
        />
        <StyledTextField
          label="Storage Cost"
          value={storageCost}
          onChange={handleInputChange(setStorageCost)}
          placeholder="Enter storage cost"
          type="number"
        />
        <StyledTextField
          label="Ad Cost"
          value={adCost}
          onChange={handleInputChange(setAdCost)}
          placeholder="Enter ad cost"
          type="number"
        />
        <StyledTextField
          label="Other Cost"
          value={otherCost}
          onChange={handleInputChange(setOtherCost)}
          placeholder="Enter other cost"
          type="number"
        />
        <StyledTextField
          label="Exchange Rate (1 Local = X USD)"
          value={exchangeRate}
          onChange={handleInputChange(setExchangeRate)}
          placeholder="Enter exchange rate"
          type="number"
        />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', mt: 2 }}>
        Calculation Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Total Revenue (Local Currency)</TableCell>
              <TableCell>{totalRevenue.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Cost (Local Currency)</TableCell>
              <TableCell>{totalCost.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Profit (Local Currency)</TableCell>
              <TableCell>{netProfit.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Profit (USD)</TableCell>
              <TableCell>{netProfitUSD.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profit Rate (%)</TableCell>
              <TableCell>{profitRate.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}