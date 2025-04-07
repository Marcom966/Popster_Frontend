export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number|undefined
    currentTime: number|undefined;
    canPlay: boolean;
    error: boolean;
    mute: boolean;
}
