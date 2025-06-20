// src/pages/LoginPage.tsx
import { Container, Heading } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <Container centerContent mt={20}>
      <Heading mb={6}>Login</Heading>
      <LoginForm />
    </Container>
  );
}
