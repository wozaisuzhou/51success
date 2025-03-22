'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Footer from '../../components/Footer'; // Adjust the import path as needed

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  padding: '8px 16px',
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

export default function TextTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedWidget, setSelectedWidget] = useState('removeDuplicateText'); // Default to a valid widget
  const [isMounted, setIsMounted] = useState(false);
  const [findString, setFindString] = useState(''); // String to find
  const [replaceString, setReplaceString] = useState(''); // String to replace with
  const [caseConversionType, setCaseConversionType] = useState('uppercase'); // Default to uppercase

  // Ensure rendering only happens after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle text input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle find string input change
  const handleFindStringChange = (event) => {
    setFindString(event.target.value);
  };

  // Handle replace string input change
  const handleReplaceStringChange = (event) => {
    setReplaceString(event.target.value);
  };

  // Handle case conversion type change
  const handleCaseConversionTypeChange = (event) => {
    setCaseConversionType(event.target.value);
  };

  // Widget: Remove Duplicate Text (Lines)
  const removeDuplicateText = () => {
    const lines = inputText.split('\n');
    const uniqueLines = [...new Set(lines)];
    setOutputText(uniqueLines.join('\n'));
  };

  // Widget: Remove Empty Lines
  const removeEmptyLines = () => {
    const lines = inputText.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim() !== '');
    setOutputText(nonEmptyLines.join('\n'));
  };

  // Widget: Remove Line Breaks and Make Text One Line
  const removeLineBreaks = () => {
    const textWithoutLineBreaks = inputText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    setOutputText(textWithoutLineBreaks);
  };

  // Widget: Remove All Spaces and Line Breaks
  const removeSpacesAndLineBreaks = () => {
    const textWithoutSpacesAndBreaks = inputText.replace(/\s+/g, ''); // Remove all spaces and line breaks
    setOutputText(textWithoutSpacesAndBreaks);
  };

  // Widget: Replace String
  const replaceStringFunction = () => {
    const regex = new RegExp(findString, 'g'); // Create a regex to find all occurrences
    const replacedText = inputText.replace(regex, replaceString); // Use the replaceString state variable
    setOutputText(replacedText);
  };

  // Widget: Convert Number to Words
  const convertNumberToWords = () => {
    const number = parseInt(inputText.trim(), 10);
    if (isNaN(number)) {
      setOutputText('Invalid number'); // 如果输入不是数字，提示无效
      return;
    }

    // 定义最大支持的数字范围
    const MAX_NUMBER = 999999999999999; // 支持到 quadrillion（千万亿）
    if (number < 0 || number > MAX_NUMBER) {
      setOutputText(`Number out of range (0 - ${MAX_NUMBER.toLocaleString()})`); // 提示超出范围
      return;
    }

    setOutputText(numberToWords(number)); // 调用转换函数
  };

  // Helper function to convert number to words
  const numberToWords = (num) => {
    const units = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    const teens = [
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const tens = [
      '',
      'ten',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];

    if (num === 0) return 'zero';

    let words = '';

    // Split the number into chunks of 3 digits (starting from the right)
    let chunkIndex = 0;
    while (num > 0) {
      let chunk = num % 1000; // Use `let` instead of `const` to allow reassignment
      if (chunk !== 0) {
        let chunkWords = '';
        if (Math.floor(chunk / 100) > 0) {
          chunkWords += units[Math.floor(chunk / 100)] + ' hundred ';
          chunk %= 100; // Now this works because `chunk` is declared with `let`
        }
        if (chunk > 0) {
          if (chunk < 10) {
            chunkWords += units[chunk];
          } else if (chunk >= 10 && chunk < 20) {
            chunkWords += teens[chunk - 10];
          } else {
            chunkWords += tens[Math.floor(chunk / 10)];
            if (chunk % 10 > 0) {
              chunkWords += '-' + units[chunk % 10];
            }
          }
        }
        words = chunkWords.trim() + ' ' + scales[chunkIndex] + ' ' + words;
      }
      num = Math.floor(num / 1000); // Move to the next 3-digit chunk
      chunkIndex++;
    }

    return words.trim();
  };

  // Widget: Convert Case
  const convertCase = () => {
    let convertedText = inputText;

    switch (caseConversionType) {
      case 'uppercase':
        convertedText = inputText.toUpperCase();
        break;
      case 'lowercase':
        convertedText = inputText.toLowerCase();
        break;
      case 'capitalizeWords':
        convertedText = inputText
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'capitalizeSentences':
        // Split sentences by punctuation marks (., !, ?) and preserve them
        convertedText = inputText
          .split(/([.!?]\s*)/) // Split by punctuation marks and keep them
          .map((sentence, index) => {
            if (index % 2 === 0) {
              // Even indices are sentences
              return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
            } else {
              // Odd indices are punctuation marks and spaces
              return sentence;
            }
          })
          .join(''); // Join sentences and punctuation marks
        break;
      default:
        break;
    }

    setOutputText(convertedText);
  };

  // Process the selected widget when the button is clicked
  const handleProcessClick = () => {
    switch (selectedWidget) {
      case 'removeDuplicateText':
        removeDuplicateText();
        break;
      case 'removeEmptyLines':
        removeEmptyLines();
        break;
      case 'removeLineBreaks':
        removeLineBreaks();
        break;
      case 'removeSpacesAndLineBreaks':
        removeSpacesAndLineBreaks();
        break;
      case 'replaceString':
        replaceStringFunction();
        break;
      case 'convertNumberToWords':
        convertNumberToWords();
        break;
      case 'convertCase':
        convertCase();
        break;
      default:
        console.warn('Unknown widget selected');
        break;
    }
  };

  // Clear output when widget changes
  useEffect(() => {
    setOutputText(''); // Clear output text when selectedWidget changes
  }, [selectedWidget]);

  // Widget list (extensible)
  const widgets = [
    { id: 'removeDuplicateText', label: 'Remove Duplicate Text' },
    { id: 'removeEmptyLines', label: 'Remove Empty Lines' },
    { id: 'removeLineBreaks', label: 'Remove Line Breaks' },
    { id: 'removeSpacesAndLineBreaks', label: 'Remove Spaces and Line Breaks' },
    { id: 'replaceString', label: 'Replace String' },
    { id: 'convertNumberToWords', label: 'Convert Number to Words' },
    { id: 'convertCase', label: 'Convert Case' }, // New widget
  ];

  // Render a loading state until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <StyledContainer>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}>
            Text Tool
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}>
            Loading...
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <>
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
              Text Tool
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgb(100, 100, 100)', mt: 1 }}
            >
              A versatile tool for text processing. Select a tool and click "Process" to apply.
            </Typography>
          </Box>

          {/* Input Text Area */}
          <StyledTextField
            label="Input Text"
            multiline
            rows={6}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your text here..."
            variant="outlined"
            fullWidth
          />

          {/* Additional Inputs for Replace String Widget */}
          {selectedWidget === 'replaceString' && (
            <>
              <StyledTextField
                label="Find String"
                value={findString}
                onChange={handleFindStringChange}
                placeholder="Enter the string to find..."
                variant="outlined"
                fullWidth
              />
              <StyledTextField
                label="Replace With"
                value={replaceString}
                onChange={handleReplaceStringChange}
                placeholder="Enter the replacement string..."
                variant="outlined"
                fullWidth
              />
            </>
          )}

          {/* Additional Inputs for Convert Case Widget */}
          {selectedWidget === 'convertCase' && (
            <RadioGroup
              value={caseConversionType}
              onChange={handleCaseConversionTypeChange}
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="uppercase"
                control={<Radio />}
                label="Convert to UPPERCASE"
              />
              <FormControlLabel
                value="lowercase"
                control={<Radio />}
                label="Convert to lowercase"
              />
              <FormControlLabel
                value="capitalizeWords"
                control={<Radio />}
                label="Capitalize Each Word"
              />
              <FormControlLabel
                value="capitalizeSentences"
                control={<Radio />}
                label="Capitalize Each Sentence"
              />
            </RadioGroup>
          )}

          {/* Process Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton variant="contained" color="primary" onClick={handleProcessClick}>
              Process
            </StyledButton>
          </Box>

          {/* Output Text Area */}
          <StyledTextField
            label="Output Text"
            multiline
            rows={6}
            value={outputText}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            placeholder="Processed text will appear here..."
          />
        </Box>
      </StyledContainer>
      <Footer />
    </>
  );
}