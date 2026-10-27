export interface Photo {
    id: string;
    thumbnailUrl: string;
    fullUrl: string;
}

export enum EffectType {
    Grayscale = '?grayscale',
    Blur = '?blur',
    None = ''
}