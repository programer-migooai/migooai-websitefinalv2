import React, { useState } from 'react';
import {
  Box, Button, Typography, Stepper, Step, StepLabel,
  Snackbar, Alert, Container, Stack, Card, CardContent,
  Tooltip, Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import { Grid as Grid2 } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

/* ---------------- Styled components ---------------- */
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  transform: isActive ? 'scale(1.02)' : 'scale(1)',
  border: isActive ? '2px solid #2196f3' : 'none',
  boxShadow: isActive
    ? '0 8px 16px rgba(33, 150, 243, 0.2)'
    : '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const PricingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive }) => ({
  width: '100%',
  marginTop: 16,
  backgroundColor: isActive ? '#2196f3' : '#e0e0e0',
  color: isActive ? '#fff' : '#424242',
  '&:hover': {
    backgroundColor: isActive ? '#1976d2' : '#bdbdbd',
  },
}));

const FeatureItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
  gap: 8,
});

/* ---------------- Component ---------------- */
const UpgradeFlow = ({ onClose }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();

  const steps = t('upgrade.steps', { returnObjects: true });

  const plans = [
    {
      id: 'basic',
      ...t('upgrade.basicPlan', { returnObjects: true })
    },
    {
      id: 'premium',
      ...t('upgrade.premiumPlan', { returnObjects: true })
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (msg, severity = 'success') =>
    setSnackbar({ open: true, message: msg, severity });

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    handleNext();
  };

  const handleUpgrade = () => {
    setTimeout(() => {
      showSnackbar(t('upgrade.upgradeSuccessSnackbar'));
      handleNext();
    }, 1000);
  };

  return (
    <Box p={3}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0: Choose Plan */}
      {activeStep === 0 && (
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" gutterBottom>
            {t('upgrade.choosePlanTitle')}
          </Typography>

          <Grid2 container spacing={4} justifyContent="center" mt={2}>
            {plans.map((plan) => {
              const isActive = selectedPlan?.id === plan.id;
              return (
                <Grid2 key={plan.id} xs={12} sm={6} md={5}>
                  <Tooltip title={plan.tooltip} arrow>
                    <StyledCard isActive={isActive} onClick={() => handlePlanSelect(plan)}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" fontWeight="bold">
                              {plan.name}
                            </Typography>
                            <InfoIcon fontSize="small" color="action" />
                          </Box>

                          <Typography variant="h5">
                            {plan.monthlyPrice}
                          </Typography>

                          <Divider />

                          {plan.features.map((f, idx) => (
                            <FeatureItem key={idx}>
                              <CheckIcon fontSize="small" color="primary" />
                              <Typography variant="body2">{f}</Typography>
                            </FeatureItem>
                          ))}

                          <PricingButton isActive={isActive}>
                            {isActive ? t('upgrade.selected') : t('upgrade.selectPlan')}
                          </PricingButton>
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Tooltip>
                </Grid2>
              );
            })}
          </Grid2>
        </Container>
      )}

      {/* Step 1: Confirm */}
      {activeStep === 1 && selectedPlan && (
        <Box>
          <Typography variant="h5" gutterBottom>
            {t('upgrade.upgradeTitle', { planName: selectedPlan.name })}
          </Typography>

          <Box my={2}>
            <Typography><strong>{t('upgrade.planLabel')}:</strong> {selectedPlan.name}</Typography>
            <Typography><strong>{t('upgrade.billingLabel')}:</strong> {selectedPlan.monthlyPrice}</Typography>
            <Typography><strong>{t('upgrade.startLabel')}:</strong> {t('upgrade.startLabel')}</Typography>
            <Typography><strong>{t('upgrade.renewalLabel')}:</strong> {t('upgrade.renewalLabel')}</Typography>
          </Box>

          <Box mt={3}>
            <Button variant="contained" onClick={handleUpgrade}>
              {t('upgrade.confirmUpgrade')}
            </Button>
            <Button onClick={handleBack} sx={{ ml: 2 }}>
              {t('upgrade.goBack')}
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Success */}
      {activeStep === 2 && selectedPlan && (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            {t('upgrade.successTitle')}
          </Typography>
          <Typography>
            {t('upgrade.successMessage', { planName: selectedPlan.name })}
          </Typography>
          <Typography>
            {t('upgrade.successBilling', { date: '01/06/2025' })} {/* Replace dynamically */}
          </Typography>

          <Box mt={3}>
            <Button variant="contained" onClick={onClose}>
              {t('upgrade.startLearning')}
            </Button>
          </Box>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpgradeFlow;
