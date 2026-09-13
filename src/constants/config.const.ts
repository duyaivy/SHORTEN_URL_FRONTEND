const config = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  maxSizeUploadAvatar: 1048576 * 2,
  googleId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  secrectClient: import.meta.env.VITE_CLIENT_SECRECT || '',
  googleURL: import.meta.env.VITE_GOOGLE_URL || '',
  siteKeyCapcha: import.meta.env.VITE_SITE_KEY_CAPCHA || '',
  serverAliasUrl: import.meta.env.VITE_SERVER_ALIAS_URL || 'http://localhost:8000'
}

export default config
