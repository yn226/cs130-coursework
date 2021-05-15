const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    
    let url = baseURL + `?type=track&q=${term}&limit=5`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(tracks=> {
            console.log(tracks);
            document.querySelector('#tracks').innerHTML = ""
            for (const track of tracks) {
                document.querySelector('#tracks').innerHTML += `
                    <section class="track-item preview" data-preview-track="${track.preview_url}">
                        <img src="${track.album.image_url}">
                    <i class="fas play-track fa-play" aria-hidden="true"></i>
                    <div class="label">
                        <h3>"${track.name}"</h3>
                        <p>
                            "${track.artist.name}"
                        </p>
                    </div>
                </section>`
            }
        })
};

// for (const rest of restaurants) {
//     console.log(rest.name);
//     document.querySelector('.restaurants').innerHTML += `
//         <div>
//             ${rest.name}<br>
//             <img src = "${rest.image_url}" />
//         </div>`;
// }

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);

    let url = baseURL + `?type=artist&q=${term}&limit=1`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(artist => {
            console.log(artist)
            document.querySelector("#artist").innerHTML =
                `<section class="artist-card" id="${artist[0].id}">
                <div>
                    <img src="${artist[0].image_url}">
                    <h3>"${artist[0].name}"</h3>
                    <div class="footer">
                    <a href="${artist[0].spotify_url}" target="_blank">
                        view on spotify
                    </a>
                    </div>
                </div>
                </section>`
            })  
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};