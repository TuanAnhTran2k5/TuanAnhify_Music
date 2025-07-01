let token;
let searchTimeOut;

document.addEventListener("DOMContentLoaded", function () {
  initialApp();
  setupSearchListener();
});

function setupSearchListener() {
  const inputSearch = document.getElementById("input-search");
  inputSearch.addEventListener("input", (e) => {
    const querry = e.target.value.trim();

    clearTimeout(searchTimeOut);

    // debounce : doi nguoi dung nhap xong moi su ly  (thoi gian doi )

    searchTimeOut = setTimeout(async () => {
      if (querry) {
        const respose = await getPopularTrack(querry);
        resetTrack();
        displayTrack(respose.tracks.items);
      }
    }, 500);
  });
}

function resetTrack() {
  const trackSection = document.getElementById("track-section");
  trackSection.innerHTML = "";
}

async function initialApp() {
  token = await getSpotifyToken();
  if (token) {
    const response = await getPopularTrack();
    displayTrack(response.tracks.items);
  }
}

async function displayTrack(data) {
  console.log(data);
  data.forEach((items) => {
    // console.log(items);
    console.log(items.id);

    // console.log(items.album.images[0].url);
    const imageURL = items.album.images[0].url;
    const name = items.name;
    // tao ra the div
    const element = document.createElement("div");
    // gan class cho the div do
    element.className = "track-card";

    const artistsName = items.artists.map((artist) => artist.name).join(", ");
    // console.log(artistsName);

    element.addEventListener("click", () => {
      playTrack(items.id, name, artistsName);
    });

    //gan noi dung
    element.innerHTML = `
      <div class="track-card-container">
                <img
                  src="${imageURL}"
                  alt=""
                />
                <h3>${truncateText(name, 25)}</h3>
                <p>${truncateText(artistsName, 15)}</p>
              </div> `;

    // gan nguyen the div do vao track-section
    const trackSection = document.getElementById("track-section");
    trackSection.appendChild(element);
  });
}

function truncateText(text, number) {
  return text.length > number ? text.slice(0, number) + "..." : text;
}

function playTrack(id, name, artistsName) {
  // console.log(id);
  // console.log(name);
  // console.log(artistsName);

  const iframe = document.getElementById("iframe");
  iframe.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;

  const modalName = document.getElementById("modal-name");
  modalName.innerHTML = name;

  const modal = document.getElementById("modal");

  modal.style.display = "block";

  const modalArtist = document.getElementById("modal-artist");
  modalArtist.innerHTML = artistsName;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  const iframe = document.getElementById("iframe");
  iframe.src = " ";
}

async function getPopularTrack(querry = "Sơn Tùng MTP") {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: querry,
        type: "track",
        market: "VN",
      },
    });

    return response.data;
  } catch (error) {
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
