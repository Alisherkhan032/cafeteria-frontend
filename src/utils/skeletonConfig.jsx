// CounterSkeleton.jsx
import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material'; // Ensure you have these imports if not already

export const CounterSkeleton = () => (
  <Box sx={{ width: "100%", marginBottom: 2, padding: 4 }}>
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
      <Skeleton variant="rectangular" width="100%" height={120} />
    </Stack>
  </Box>
);
