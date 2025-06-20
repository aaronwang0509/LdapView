// src/utils/auth.ts
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
