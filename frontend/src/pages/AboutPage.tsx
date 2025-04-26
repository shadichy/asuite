import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Typography } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>About Us</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis.
        </Typography>
        <Typography variant="body2">
          Contact us at: info@myblog.com
        </Typography>
      </Box>
      <Footer />
    </>
  );
};

export default AboutPage;
