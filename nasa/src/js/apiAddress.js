class Url {
    constructor() {
        this.address = "https://api.nasa.gov/planetary/apod";
        this.apiKey="qnWN2baOaU3mrxR5qyYGmB15TG77xUUWGqrDKKOv";
        this.count="10"
    }
    getApiUrl = () => `${this.address}?api_key=${this.apiKey}&count=${this.count}`;
}