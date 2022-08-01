// -- lyricscraper.ts ---------------------------------------------------------
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
// Lyric scraper for Eminem songs. Do not use this.

import { DOMParser, HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.33-alpha/deno-dom-wasm.ts";

// first read db
import { Song } from "./common.ts";

function urlToDoc(url: string) {
    return fetch(url)
        .then(res => res.text())
        .then(text => new DOMParser().parseFromString(text, "text/html"))
        .catch(error => console.error(error));
}

function getLyricFromDoc(doc: HTMLDocument, songname = "") {
    const lyricDiv = doc.querySelector("div[data-lyrics-container]");
    if(lyricDiv === null) {
        console.error("Unable to find lyric container for " + songname);
        return "";
    }
    lyricDiv.innerHTML = lyricDiv.innerHTML.replaceAll("<br>", "\n");
    return lyricDiv.innerText.replaceAll(/ *\[[^\]]*]/g, "");
}

const songs: Song[] = JSON.parse(Deno.readTextFileSync("./db.json")).songs;

let lyricFile = ""; // string builder

for(const song of songs) {
    const doc = await urlToDoc(song.url);
    if(!doc)
        throw "Failed to parse HTML";
    const lyrics = getLyricFromDoc(doc, song.title)
    lyricFile += lyrics + "\n\n";
}

Deno.writeTextFileSync("input.txt", lyricFile);
