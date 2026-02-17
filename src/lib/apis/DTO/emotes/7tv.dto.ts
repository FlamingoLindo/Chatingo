export interface The7TvAPIResponse {
    data: Data;
    extensions: Extensions;
}

export interface Data {
    search: Search;
}

export interface Search {
    all: All;
}

export interface All {
    users: Users;
}

export interface Users {
    items: UsersItem[];
}

export interface UsersItem {
    id: string;
    mainConnection: MainConnection;
    style: Style;
}

export interface MainConnection {
    platformDisplayName: string;
}

export interface Style {
    activeEmoteSet: ActiveEmoteSet;
}

export interface ActiveEmoteSet {
    id: string;
    name: string;
    emotes: Emotes;
}

export interface Emotes {
    items: EmotesItem[];
}

export interface EmotesItem {
    emote: Emote;
    alias: string;
}

export interface Emote {
    id: string;
    images: Image[];
    flags: Flags;
}

export interface Flags {
    animated: boolean;
}

export interface Image {
    url: string;
}

export interface Extensions {
    analyzer: Analyzer;
}

export interface Analyzer {
    complexity: number;
    depth: number;
}
