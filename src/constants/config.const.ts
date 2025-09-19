const config = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  maxSizeUploadAvatar: 1048576 * 2,
  googleId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  secrectClient: import.meta.env.VITE_CLIENT_SECRECT || '',
  googleURL: import.meta.env.VITE_GOOGLE_URL || ''
}

export default config
