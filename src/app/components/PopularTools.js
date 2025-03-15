import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/system';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';

const toolsData = [
  {
    useIcon: true,
    icon: 'SwapHorizIcon',
    title: 'Unit Conversion Tool',
    description: 'A simple, all-in-one tool for converting weight, length, area, temperature, and more—fast, accurate, and user-friendly!',
    link: '/tools/unit-conversion',
  },
  {
    useIcon: true,
    icon: 'TextFieldsIcon',
    title: 'Text Tool',
    description: 'A versatile text tool featuring duplicate text removal, character deduplication, and newline filtering for streamlined text processing.',
    link: '/tools/text-tool',
  },
  {
    useIcon: true,
    icon: 'MonetizationOnIcon',
    title: 'Cost-Profit Calculation Tool',
    description: 'A simple tool to calculate profits based on product cost, selling price, shipping costs, and profit margin.',
    link: '/tools/cost-profit',
  },
  {
    useIcon: true,
    icon: 'StorefrontIcon',
    title: 'Amazon Seller Tools',
    description: 'Amazon Seller Tools help sellers optimize their business with features like product research, keyword optimization, inventory management, and profit calculation.',
    link: '/tools/amazon-seller-tools',
  },
  {
    useIcon: true,
    icon: 'SearchIcon',
    title: 'Keyword Optimization Tool',
    description: 'A powerful Keyword Optimization Tool offering keyword discovery, frequency analysis, keyword filtering, and text screening based on keywords.',
    link: '/tools/keyword-optimization',
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 80,
  width: 80,
  margin: '16px auto 8px',
  objectFit: 'contain',
});

const StyledIcon = styled('div')({
  height: 80,
  width: 80,
  margin: '16px auto 8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledTypography = styled(Typography)({
  color: 'rgb(68, 68, 68)',
  fontWeight: 'bold',
  textAlign: 'center',
});

const StyledDescription = styled(Typography)({
  color: 'rgb(100, 100, 100)',
  textAlign: 'center',
  flexGrow: 1,
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardActions = styled(CardActions)({
  justifyContent: 'center',
  paddingBottom: '16px',
});

const iconMap = {
  SwapHorizIcon: SwapHorizIcon,
  TextFieldsIcon: TextFieldsIcon,
  MonetizationOnIcon: MonetizationOnIcon,
  StorefrontIcon: StorefrontIcon,
  SearchIcon: SearchIcon,
};

export default function ToolsCollection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 4, maxWidth: '90vw', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'rgb(60, 60, 60)' }}
        >
          Popular Tools
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {toolsData.map((tool, index) => {
          const IconComponent = tool.useIcon && tool.icon ? iconMap[tool.icon] : null;
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <StyledCard>
                {tool.useIcon && IconComponent ? (
                  <StyledIcon>
                    <IconComponent sx={{ fontSize: 80 }} />
                  </StyledIcon>
                ) : (
                  <StyledCardMedia
                    component="img"
                    image={tool.logo}
                    alt={`${tool.title} logo`}
                  />
                )}
                <StyledCardContent>
                  <StyledTypography variant="body1">
                    {tool.title}
                  </StyledTypography>
                  <StyledDescription variant="body2" title={tool.description}>
                    {tool.description}
                  </StyledDescription>
                </StyledCardContent>
                <StyledCardActions>
                  <Tooltip title="Opens in a new tab" arrow>
                    <Button
                      component={Link}
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{ color: 'rgb(29, 150, 219)', borderColor: 'rgb(29, 150, 219)' }}
                    >
                      Use it
                    </Button>
                  </Tooltip>
                </StyledCardActions>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}