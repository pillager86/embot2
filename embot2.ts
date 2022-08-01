// -- embot2.ts ---------------------------------------------------------------
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
// The main Deno script that generates lyrics and posts to social media.

// mastodon access token
const ACCESS_TOKEN = Deno.env.get("EmAccessToken");

// first generate the lyrics
const p = Deno.run({
    cmd: ["python", "./generate.py"],
    stdout: 'piped'
});
await p.status();

const lyricOutput = await p.output();
let lyrics = new TextDecoder().decode(lyricOutput).replaceAll(/[\n]+/g, '\n');
if(lyrics.length > 470)
    lyrics = lyrics.substring(0, 470); // limit of text status

// add lyrics and other info to form then submit
const formData = new FormData();
formData.append("status", lyrics);
formData.append("spoiler_text", "[AI generated Eminem lyrics]");

fetch("https://botsin.space/api/v1/statuses", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`
    },
    body: formData
})
    .then(res => res.json())
    .then(res => console.log(res));