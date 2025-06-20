// src/components/ConnectionManager.tsx
import { useEffect, useState } from 'react';
import { getConnections, updateConnection } from '../api/connections';
import {
  Box,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  Input,
  Button,
  TableContainer,
  useToast,
} from '@chakra-ui/react';

export default function ConnectionManager() {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState<{ [id: number]: any }>({});
  const toast = useToast();

  useEffect(() => {
    getConnections()
      .then(setConnections)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (id: number, field: string, value: any) => {
    setEdited(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSave = async (id: number) => {
    const changes = edited[id];
    if (!changes) return;
    try {
      await updateConnection(id, changes);
      toast({ title: 'Connection updated', status: 'success', duration: 2000, isClosable: true });
      setEdited(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      const updated = await getConnections();
      setConnections(updated);
    } catch (err) {
      toast({ title: 'Failed to update connection', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box>
      <Heading size="md" mb={4}>LDAP Connections</Heading>
      <TableContainer border="1px solid" borderColor="gray.100" borderRadius="md">
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Hostname</Th>
              <Th>Port</Th>
              <Th>Bind DN</Th>
              <Th>SSL</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {connections.map(conn => {
              const edit = edited[conn.id] || {};
              return (
                <Tr key={conn.id}>
                  <Td>
                    <Input
                      size="sm"
                      value={edit.name ?? conn.name}
                      onChange={(e) => handleChange(conn.id, 'name', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={edit.hostname ?? conn.hostname}
                      onChange={(e) => handleChange(conn.id, 'hostname', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      type="number"
                      value={edit.port ?? conn.port}
                      onChange={(e) => handleChange(conn.id, 'port', parseInt(e.target.value))}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      value={edit.bind_dn ?? conn.bind_dn}
                      onChange={(e) => handleChange(conn.id, 'bind_dn', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Switch
                      isChecked={edit.use_ssl ?? conn.use_ssl}
                      onChange={(e) => handleChange(conn.id, 'use_ssl', e.target.checked)}
                    />
                  </Td>
                  <Td>
                    <Button size="sm" colorScheme="blue" onClick={() => handleSave(conn.id)}>
                      Save
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}



