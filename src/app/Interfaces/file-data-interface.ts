export class FileDataInterface {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public artistName: string,
        public songName: string,
        public usernName: string,
        public data: Blob
    ) {}
}
