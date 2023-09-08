import fetch from 'node-fetch';
export default async function apiCall({ url, method, contentType, authorization, body }) {
  const headers = { 'Content-Type': contentType };
  if (authorization) headers['Authorization'] = authorization;
  const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
  return { status: response.status, data: await response.json() };
}
