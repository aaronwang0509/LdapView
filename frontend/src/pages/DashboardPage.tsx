// src/pages/DashboardPage.tsx
import { Box, Container, Heading } from '@chakra-ui/react';
import ConnectionManager from '../components/ConnectionManager';

export default function DashboardPage() {
  return (
    <Container maxW="container.lg" py={10}>
      <Heading mb={6}>Welcome to the Dashboard</Heading>
      <Box borderWidth={1} p={4} borderRadius="md">
        <ConnectionManager />
      </Box>
    </Container>
  );
}

