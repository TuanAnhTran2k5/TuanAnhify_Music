
let token;

document.addEventListener("DOMContentLoaded", function(){
    initialApp();
});

 async function  initialApp(){
     token = await getSpotifyToken();
    if(token){
        getPopularTrack();
    }
}

async function getPopularTrack(){
    try{
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: "Sơn Tùng MTP",
                type: "track",
                market: "VN",
            },
        });

        console.log(response);
    } catch(error){
        console.log(error);
    }

}

async function getSpotifyToken() {
  try {
    const credentials = btoa(
      `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
    );

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}