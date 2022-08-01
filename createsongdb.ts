// -- createsongdb.ts ---------------------------------------------------------
// Copyright (C) 2022 pillager86
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>
//-----------------------------------------------------------------------------
// Tool for creating a json database of song metadata for Eminem. This is used
// by the lyric scraper to find all webpages containing the
// lyrics.

import {ACCESS_TOKEN, 
        EMINEM_ID, 
        NUM_PAGES, 
        SongsResponse, 
        Song } 
    from "./common.ts";

const songList: Song[] = [];
const fetches: Promise<void|Response>[] = [];

for(let i = 0; i < NUM_PAGES; ++i) {
    fetches.push(
        fetch(`https://api.genius.com/artists/${EMINEM_ID}/songs?page=${i+1}&access_token=${ACCESS_TOKEN}`)
            .then(res => res.json())
            .then(response => {
                const songResponse = response.response as SongsResponse;
                for(const song of songResponse.songs) {
                    if(song.primary_artist.id === EMINEM_ID)
                        songList.push(song);
                }
                console.log("Finished page " + (i + 1));
            })
            .catch(error => console.error(error))
    );
}

Promise.all(fetches)
    .then(() => {
        console.log(songList.length + " songs by Eminem found");
        Deno.writeTextFile("db.json", JSON.stringify({ "songs": songList }));
    });






