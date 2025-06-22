// src/api/connections.ts
import axios from 'axios';

const API = 'http://localhost:8000/api/connections';

export async function getConnections() {
  const token = localStorage.getItem('token');
  const response = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createConnection(conn: {
  name: string;
  hostname: string;
  port: number;
  bind_dn: string;
  password: string;
  use_ssl: boolean;
}) {
  const token = localStorage.getItem('token');
  const response = await axios.post(API, conn, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function updateConnection(id: number, updates: any) {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteConnection(id: number) {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
