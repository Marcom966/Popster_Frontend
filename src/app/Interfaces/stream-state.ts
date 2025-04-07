export class StreamState {
    constructor(
        public playing: boolean,
        public readableCurrentTime: string,
        public readableDuration: string,
        public duration?: number,
        public currentTime?: number,
        public canPlay?: boolean,
        public error?: boolean,
        public mute?: boolean
    ){}
}
