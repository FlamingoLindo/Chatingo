export interface GlobalEmoteApiResponse {
    data: EmoteData[];
    template?: string;
}

export interface EmoteData {
    id: string;
    name: string;
    images: Images;
    format: Format[];
    scale: string[];
    theme_mode: ThemeMode[];
}

export enum Format {
    Animated = "animated",
    Static = "static",
}

export interface Images {
    url_1x: string;
    url_2x: string;
    url_4x: string;
}

export enum ThemeMode {
    Dark = "dark",
    Light = "light",
}