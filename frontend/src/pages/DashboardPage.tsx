// src/pages/DashboardPage.tsx
import { Box, Container, Heading, Stack } from '@chakra-ui/react';
import { ldapSearch } from '../api/ldap';
import { useState } from 'react';
import ConnectionManager from '../components/ConnectionManager';
import LdapSearchPanel from '../components/LdapSearchPanel';
import LdapResultTable from '../components/LdapResultTable';

export default function DashboardPage() {
  const [connectionId, setConnectionId] = useState('');
  const [baseDn, setBaseDn] = useState('');
  const [filter, setFilter] = useState('');
  const [attributes, setAttributes] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!connectionId) return;

    try {
      const result = await ldapSearch({
        connectionId: parseInt(connectionId),
        baseDn,
        filter,
        attributes: attributes.split(',').map(attr => attr.trim()),
      });

      const flattened = result.map((entry: { dn: string; attributes: Record<string, any> }) => ({
        dn: entry.dn,
        ...entry.attributes,
      }));

      setResults(flattened);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Heading mb={6}>Welcome to the Dashboard</Heading>
      <Stack spacing={8}>
        <Box borderWidth={1} p={4} borderRadius="md">
          <ConnectionManager />
        </Box>
        <Box borderWidth={1} p={4} borderRadius="md">
          <LdapSearchPanel
            connectionId={connectionId}
            setConnectionId={setConnectionId}
            baseDn={baseDn}
            setBaseDn={setBaseDn}
            filter={filter}
            setFilter={setFilter}
            attributes={attributes}
            setAttributes={setAttributes}
            onSearch={handleSearch}
          />
        </Box>
        <Box
          borderWidth={1}
          p={4}
          borderRadius="md"
          maxHeight="500px"
          overflow="auto"
        >
          <LdapResultTable results={results} onRefresh={handleSearch} />
        </Box>
      </Stack>
    </Container>
  );
}
