import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the BOATCO2 Dashboard
        </Typography>
        <Typography variant="body1">
          This is where you can view and manage data about boat CO2 emissions.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
