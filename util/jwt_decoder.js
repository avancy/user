const base64UrlDecode = (str) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/'); // substituir caracteres base64url por base64
  const binary = atob(base64); // decodifica base64
  let bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
};

const decodeJwt = (token) => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
};

export { decodeJwt };
