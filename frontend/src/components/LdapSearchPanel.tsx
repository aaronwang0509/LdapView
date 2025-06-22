// src/components/LdapSearchPanel.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function LdapSearchPanel({
  connectionId,
  setConnectionId,
  baseDn,
  setBaseDn,
  filter,
  setFilter,
  attributes,
  setAttributes,
  onSearch,
}: {
  connectionId: string;
  setConnectionId: (val: string) => void;
  baseDn: string;
  setBaseDn: (val: string) => void;
  filter: string;
  setFilter: (val: string) => void;
  attributes: string;
  setAttributes: (val: string) => void;
  onSearch: () => void;
}) {
  const [availableIds, setAvailableIds] = useState<number[]>([]);

  useEffect(() => {
    // Poll for window.connectionIds to become available
    const interval = setInterval(() => {
      const ids = (window as any).connectionIds;
      if (Array.isArray(ids)) {
        setAvailableIds(ids);
        clearInterval(interval);
      }
    }, 200);

    const timeout = setTimeout(() => clearInterval(interval), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box>
      <Box fontWeight="semibold" mb={4}>LDAP Search</Box>
      <VStack align="start" spacing={4}>
        <HStack spacing={4} w="100%">
          <FormControl>
            <FormLabel>Connection</FormLabel>
            <Select
              placeholder="Select connection"
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
            >
              {availableIds.map((id: number) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Base DN</FormLabel>
            <Input value={baseDn} onChange={(e) => setBaseDn(e.target.value)} />
          </FormControl>
        </HStack>
        <HStack spacing={4} w="100%">
          <FormControl>
            <FormLabel>Filter</FormLabel>
            <Input value={filter} onChange={(e) => setFilter(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Attributes (comma separated)</FormLabel>
            <Input value={attributes} onChange={(e) => setAttributes(e.target.value)} />
          </FormControl>
        </HStack>
        <Button colorScheme="blue" onClick={onSearch}>
          Search
        </Button>
      </VStack>
    </Box>
  );
}