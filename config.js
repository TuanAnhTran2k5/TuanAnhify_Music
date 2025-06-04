// Tự động detect URL hiện tại
function getCurrentURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback URLs cho các trường hợp phổ biến
  return "http://127.0.0.1:5500";
}

// Spotify API Configuration
const SPOTIFY_CONFIG = {
  // Client ID từ Spotify Developer Dashboard
  CLIENT_ID: "b4c8aea8fd2842689a2a2a43e714d0fb",
  // Client Secret - CHÚ Ý: Trong production không nên để Client Secret ở frontend
  // Đây chỉ là demo, trong thực tế nên sử dụng backend để xử lý
  CLIENT_SECRET: "bc99ed2be8c4482bbc41b34b65e89acb",

  // Redirect URI - Tự động detect URL hiện tại
  get REDIRECT_URI() {
    return getCurrentURL();
  },


};

console.log(`
🎵 SPORTIFY WEB PLAYER
📝 Cấu hình:
- Client ID: ${SPOTIFY_CONFIG.CLIENT_ID ? "✅" : "❌"}
- Client Secret: ${SPOTIFY_CONFIG.CLIENT_SECRET ? "✅" : "❌"}
- Redirect URI: ${SPOTIFY_CONFIG.REDIRECT_URI}

`);