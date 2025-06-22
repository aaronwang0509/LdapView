// src/api/auth.ts
import axios from 'axios';
import config from '../config';

const API = `${config.authApi}`;

export async function login(username: string, password: string) {
  const response = await axios.post(`${API}/login`, {
    username,
    password,
  });
  return response.data;
}
