// -- common.ts ---------------------------------------------------------------
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
// Common definitions and values used across files

//== CONSTS ===================================================================

/**
 * The API key stored in the local shell environment (get your own key to use this software)
 */
export const ACCESS_TOKEN = Deno.env.get("GeniusAccessToken");

/**
 * The artist ID of Eminem for genius API use
 */
export const EMINEM_ID = 45;

/**
 * The number of query result pages that mostly contain Eminem songs as the primary artist.
 */
export const NUM_PAGES = 58;

// == INTERFACES ==============================================================
// These describe the fields of the JSON objects returned by the genius API

export interface Artist {
    api_path: string,
    header_image_url: string,
    id: number,
    image_url: string,
    is_meme_verified: boolean,
    is_verified: boolean,
    name: string,
    url: string,
    iq: number
}

export interface ReleaseDate {
    year: number,
    month?: number,
    day?: number
}

export interface Statistic {
    unreviewed_annotations: number,
    concurrents: number,
    hot: boolean,
    pageviews: number
}

export interface Song {
    annotation_count: number,
    api_path: string,
    artist_names: string,
    full_title: string,
    header_image_thumbnail_url: string,
    header_image_url: string,
    id: number,
    lyrics_owner_id: number,
    lyrics_state: string,
    path: string,
    pyongs_count: number,
    relationships_index_url: string,
    release_date_components?: ReleaseDate,
    release_date_for_display?: string,
    song_art_image_thumbnail_url: string,
    song_art_image_url: string,
    stats: Statistic,
    title: string,
    title_with_featured: string,
    /** The webpage containing the song's lyrics */
    url: string,
    featured_artists: Artist[],
    primary_artist: Artist
}

/**
 * The top level object returned by the JSON response
 */
export interface SongsResponse {
    songs: Song[],
    next_page: number
}
