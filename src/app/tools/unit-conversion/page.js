'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

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

export default function UnitConversion() {
  const [selectedWidget, setSelectedWidget] = useState('length'); // Default to length conversion
  const [isMounted, setIsMounted] = useState(false);

  // State for input values and errors
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  // Ensure rendering only happens after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Unit options for each widget
  const unitOptions = {
    length: ['meter', 'foot', 'inch', 'centimeter', 'kilometer', 'mile'],
    weight: ['kilogram', 'pound', 'ounce', 'gram', 'ton'],
    area: ['squareMeter', 'squareFoot', 'hectare', 'acre'],
    volume: ['liter', 'gallon', 'cubicMeter', 'milliliter'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    pressure: ['pascal', 'bar', 'atmosphere', 'psi'],
    power: ['watt', 'kilowatt', 'horsepower'],
    time: ['second', 'minute', 'hour', 'day'],
    angle: ['degree', 'radian', 'gradian'],
    capacitance: ['farad', 'microfarad', 'nanofarad'],
    speed: ['meterPerSecond', 'kilometerPerHour', 'milePerHour'],
  };

  // Conversion functions
  const conversionFunctions = {
    length: (value, from, to) => {
      const units = {
        meter: 1,
        foot: 3.28084,
        inch: 39.3701,
        centimeter: 100,
        kilometer: 0.001,
        mile: 0.000621371,
      };
      return (value * units[to]) / units[from];
    },
    weight: (value, from, to) => {
      const units = {
        kilogram: 1,
        pound: 2.20462,
        ounce: 35.274,
        gram: 1000,
        ton: 0.001,
      };
      return (value * units[to]) / units[from];
    },
    area: (value, from, to) => {
      const units = {
        squareMeter: 1,
        squareFoot: 10.7639,
        hectare: 0.0001,
        acre: 0.000247105,
      };
      return (value * units[to]) / units[from];
    },
    volume: (value, from, to) => {
      const units = {
        liter: 1,
        gallon: 0.264172,
        cubicMeter: 0.001,
        milliliter: 1000,
      };
      return (value * units[to]) / units[from];
    },
    temperature: (value, from, to) => {
      if (from === 'celsius' && to === 'fahrenheit') {
        return (value * 9) / 5 + 32;
      } else if (from === 'fahrenheit' && to === 'celsius') {
        return ((value - 32) * 5) / 9;
      } else if (from === 'celsius' && to === 'kelvin') {
        return value + 273.15;
      } else if (from === 'kelvin' && to === 'celsius') {
        return value - 273.15;
      } else if (from === 'fahrenheit' && to === 'kelvin') {
        return ((value - 32) * 5) / 9 + 273.15;
      } else if (from === 'kelvin' && to === 'fahrenheit') {
        return ((value - 273.15) * 9) / 5 + 32;
      }
      return value; // If same unit
    },
    pressure: (value, from, to) => {
      const units = {
        pascal: 1,
        bar: 1e-5,
        atmosphere: 9.86923e-6,
        psi: 0.000145038,
      };
      return (value * units[to]) / units[from];
    },
    power: (value, from, to) => {
      const units = {
        watt: 1,
        kilowatt: 0.001,
        horsepower: 0.00134102,
      };
      return (value * units[to]) / units[from];
    },
    time: (value, from, to) => {
      const units = {
        second: 1,
        minute: 1 / 60,
        hour: 1 / 3600,
        day: 1 / 86400,
      };
      return (value * units[to]) / units[from];
    },
    angle: (value, from, to) => {
      const units = {
        degree: 1,
        radian: 180 / Math.PI,
        gradian: 0.9,
      };
      return (value * units[to]) / units[from];
    },
    capacitance: (value, from, to) => {
      const units = {
        farad: 1,
        microfarad: 1e6,
        nanofarad: 1e9,
      };
      return (value * units[to]) / units[from];
    },
    speed: (value, from, to) => {
      const units = {
        meterPerSecond: 1,
        kilometerPerHour: 3.6,
        milePerHour: 2.23694,
      };
      return (value * units[to]) / units[from];
    },
  };

  // Handle input change
  const handleInputChange = (unit, value) => {
    // Allow empty input for deletion
    if (value === '') {
      setInputValues((prev) => ({ ...prev, [unit]: '' }));
      setInputErrors((prev) => ({ ...prev, [unit]: '' }));
      return;
    }

    // Validate input
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      setInputErrors((prev) => ({ ...prev, [unit]: 'Invalid number' }));
      return;
    } else {
      setInputErrors((prev) => ({ ...prev, [unit]: '' }));
    }

    // Update input values
    const newInputValues = { ...inputValues, [unit]: parsedValue };
    setInputValues(newInputValues);

    // Convert all other units
    const units = unitOptions[selectedWidget];
    const convertedValues = {};
    units.forEach((u) => {
      if (u !== unit) {
        convertedValues[u] = conversionFunctions[selectedWidget](parsedValue, unit, u);
      }
    });

    // Merge and set values
    setInputValues((prev) => ({ ...prev, ...convertedValues }));
  };

  // Clear input values when widget changes
  useEffect(() => {
    setInputValues({});
    setInputErrors({});
  }, [selectedWidget]);

  // Widget list (extensible)
  const widgets = [
    { id: 'length', label: 'Length' },
    { id: 'weight', label: 'Weight' },
    { id: 'area', label: 'Area' },
    { id: 'volume', label: 'Volume' },
    { id: 'temperature', label: 'Temperature' },
    { id: 'pressure', label: 'Pressure' },
    { id: 'power', label: 'Power' },
    { id: 'time', label: 'Time' },
    { id: 'angle', label: 'Angle' },
    { id: 'capacitance', label: 'Capacitance' },
    { id: 'speed', label: 'Speed' },
  ];

  // Render a loading state until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <StyledContainer>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
            Unit Conversion
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
            Loading...
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {/* Sidebar/Widget Bar */}
      <Sidebar>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)', p: 1 }}
        >
          Tools
        </Typography>
        <List>
          {widgets.map((widget) => (
            <ListItem key={widget.id} disablePadding>
              <ListItemButton
                selected={selectedWidget === widget.id}
                onClick={() => setSelectedWidget(widget.id)} // Only set selection, no processing
                sx={{
                  borderRadius: '4px',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                  '&:hover': {
                    backgroundColor: 'grey.200',
                  },
                }}
              >
                <ListItemText primary={widget.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sidebar>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}
          >
            Unit Conversion
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}
          >
            A versatile tool for unit conversion. Select a tool and enter a value to convert.
          </Typography>
        </Box>

        {/* Input Fields for Selected Widget */}
        {unitOptions[selectedWidget].map((unit) => (
          <StyledTextField
            key={unit}
            label={unit}
            value={inputValues[unit] || ''}
            onChange={(e) => handleInputChange(unit, e.target.value)}
            placeholder={`Enter value in ${unit}`}
            variant="outlined"
            fullWidth
            error={!!inputErrors[unit]}
            helperText={inputErrors[unit]}
          />
        ))}
      </Box>
    </StyledContainer>
  );
}