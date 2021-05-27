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
            if (tracks.length > 0) {
                document.querySelector('#tracks').innerHTML = ""
                for (const track of tracks) {
                    document.querySelector('#tracks').innerHTML += `
                        <section class="track-item preview" data-preview-track="${track.preview_url}" onclick="playTrack(event);">
                            <img src="${track.album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h3>"${track.name}"</h3>
                            <p>
                                "${track.artist.name}"
                            </p>
                        </div>
                    </section>`
                    // addEventListener("click", playTrack);
                } 
                if (tracks.length < 5) {
                    document.querySelector('#tracks').innerHTML += `<h3>Only ${tracks.length} tracks found.</h3>`
                }
            } else {
                console.log("No tracks found that match your search criteria.")
                document.querySelector("#tracks").innerHTML = '<h3>No tracks found that match your search criteria</h3>'
            }
        })
};


const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    let url = baseURL + `?type=album&q=${term}`
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(albums => {
            console.log(albums)
            if (albums.length > 0) {
                document.querySelector('#albums').innerHTML = ""
                for (const album of albums) {
                    document.querySelector('#albums').innerHTML += `
                    <section class="album-card" id="${album.id}">
                        <div>
                            <img src="${album.image_url}">
                            <h3>'${album.name}'</h3>
                            <div class="footer">
                                <a href="${album.spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>`
                }
            } else {
                console.log('No albums were returned.')
                document.querySelector("#albums").innerHTML = '<h3>"No albums found that match your search criteria"</h3>'
            }
        })
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
            if (artist.length===1) {
                console.log(artist.length)
            document.querySelector("#artist").innerHTML =
                `<section class="artist-card" id="${artist[0].id}" data-id=${artist[0].id} onclick="replaceTracks(event)";>
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
            } else {
                console.log("nothing")
                document.querySelector("#artist").innerHTML = '<h3>"No artist found that match your search criteria"</h3>'
            }
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

const playTrack = (ev) => {
    const elem = ev.currentTarget;
    // console.log(elem)
    // console.log(elem.preview_url);
    const previewURL =  elem.dataset.previewTrack;
    console.log(previewURL)
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else {
        console.log("there is no preview available for this track")
    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML
    // document.querySelector('.track-item').innerHTML = 
    //     `<div class="track-item" data-preview-track="${elem.preview_url}">
    //     <img src="${elem.album.image_url}">
    //     <i class="fas play-track fa-pause" aria-hidden="true"></i>
    //     <div class="label">
    //         <h3>"${elem.name}"</h3>
    //         <p>
    //             "${elem.artist.name}"
    //         </p>
    //     </div>
    // </div>`

}

const replaceTracks = (ev) => {
    const elem = ev.currentTarget;
    console.log(elem)
    console.log(elem.dataset.id)
    let url = `https://www.apitutor.org/spotify/v1/artists/${elem.dataset.id}/top-tracks?country=us`;
    console.log(url)
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(tracks=> {
            console.log(tracks);
            if (tracks.length > 0) {
                document.querySelector('#tracks').innerHTML = ""
                for (const track of tracks) {
                    console.log(track)
                    document.querySelector('#tracks').innerHTML += `
                        <section class="track-item preview" data-preview-track="${track.preview_url}" onclick="playTrack(event);">
                            <img src="${track.images[0]}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h3>"${track.name}"</h3>
                            <p>
                                "${track.album.artist.name}"
                            </p>
                        </div>
                    </section>`
                    // addEventListener("click", playTrack);
                } 
            } 
            // else {
            //     console.log("No tracks found that match your search criteria.")
            //     document.querySelector("#tracks").innerHTML = '<h3>"No tracks found that match your search criteria"</h3>'
            // }
        })

}

// const featureImage = (ev) => {
//     const elem = ev.currentTarget;
//     imageIndex = parseInt(elem.dataset.index);
//     console.log(elem.style.backgroundImage);

//     document.querySelector(".featured_image").style.backgroundImage = elem.style.backgroundImage;
// };