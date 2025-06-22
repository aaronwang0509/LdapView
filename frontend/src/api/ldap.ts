// src/api/ldap.ts
import axios from 'axios';

const SEARCH_API = 'http://localhost:8000/api/ldap/search';
const MODIFY_API = 'http://localhost:8000/api/ldap/modify';

export async function ldapSearch({
  connectionId,
  baseDn,
  filter,
  attributes,
}: {
  connectionId: number;
  baseDn: string;
  filter: string;
  attributes: string[];
}) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    SEARCH_API,
    {
      connection_id: connectionId,
      base_dn: baseDn,
      filter,
      attributes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // should be a list of entry dicts
}

export async function ldapModify({
  connectionId,
  dn,
  changes,
}: {
  connectionId: number;
  dn: string;
  changes: {
    operation: 'add' | 'delete' | 'replace';
    attribute: string;
    values: string[];
  }[];
}) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    MODIFY_API,
    {
      connection_id: connectionId,
      dn,
      changes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}