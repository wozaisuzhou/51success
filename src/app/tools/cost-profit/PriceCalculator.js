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
    padding: '8px 12px',
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(12px, 8px) scale(1)',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(12px, -6px) scale(0.75)',
  },
  width: '100%',
  maxWidth: '250px',
}));

export default function PriceCalculator() {
  const [profitMargin, setProfitMargin] = useState('');
  const [buyerShippingFee, setBuyerShippingFee] = useState('');
  const [priceExchangeRate, setPriceExchangeRate] = useState('');
  const [platformFee, setPlatformFee] = useState('');
  const [productCost, setProductCost] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [storageCost, setStorageCost] = useState('');
  const [adCost, setAdCost] = useState('');
  const [otherCost, setOtherCost] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [calculatedNetProfit, setCalculatedNetProfit] = useState(0);
  const [calculatedTotalRevenue, setCalculatedTotalRevenue] = useState(0);
  const [calculatedTotalCost, setCalculatedTotalCost] = useState(0);

  const calculatePrice = () => {
    const margin = parseFloat(profitMargin) || 0;
    const shippingFee = parseFloat(buyerShippingFee) || 0;
    const rate = parseFloat(priceExchangeRate) || 1;
    const platform = parseFloat(platformFee) || 0;
    const cost = parseFloat(productCost) || 0;
    const shippingC = parseFloat(shippingCost) || 0;
    const storage = parseFloat(storageCost) || 0;
    const ad = parseFloat(adCost) || 0;
    const other = parseFloat(otherCost) || 0;

    const totalCost = platform + cost + shippingC + storage + ad + other;

    // Calculate Product Price based on desired Profit Margin
    let price;
    if (margin >= 100) {
      price = Infinity; // Unrealistic margin, set to infinity to indicate error
    } else if (margin === 0) {
      price = totalCost - shippingFee; // No profit, price covers costs minus shipping
    } else {
      const marginDecimal = margin / 100;
      price = (totalCost - shippingFee * (1 + marginDecimal)) / (1 - marginDecimal);
    }

    // Ensure price is non-negative
    price = price >= 0 ? price : 0;

    // Calculate other values
    const revenue = price + shippingFee;
    const profit = revenue - totalCost;

    setCalculatedPrice(price);
    setCalculatedTotalRevenue(revenue >= 0 ? revenue : 0);
    setCalculatedTotalCost(totalCost);
    setCalculatedNetProfit(profit >= 0 ? profit : 0);
  };

  useEffect(() => {
    calculatePrice();
  }, [profitMargin, buyerShippingFee, priceExchangeRate, platformFee, productCost, shippingCost, storageCost, adCost, otherCost]);

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
          Price Calculator
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
          Calculate the optimal price for your product based on desired profit margin.
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
        Profit Margin / Shipping Fee
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <StyledTextField
          label="Profit Margin (%)"
          value={profitMargin}
          onChange={handleInputChange(setProfitMargin)}
          placeholder="Enter profit margin"
          type="number"
        />
        <StyledTextField
          label="Buyer Shipping Fee"
          value={buyerShippingFee}
          onChange={handleInputChange(setBuyerShippingFee)}
          placeholder="Enter shipping fee"
          type="number"
        />
        <StyledTextField
          label="Exchange Rate (1 Local = X USD)"
          value={priceExchangeRate}
          onChange={handleInputChange(setPriceExchangeRate)}
          placeholder="Enter exchange rate"
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
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', mt: 2 }}>
        Calculation Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Product Price (Local Currency)</TableCell>
              <TableCell>{calculatedPrice === Infinity ? 'Invalid' : calculatedPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Revenue (Local Currency)</TableCell>
              <TableCell>{calculatedTotalRevenue.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Cost (Local Currency)</TableCell>
              <TableCell>{calculatedTotalCost.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Profit (Local Currency)</TableCell>
              <TableCell>{calculatedNetProfit.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}