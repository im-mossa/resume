class ApiAddress {
    static url = "https://onlineshop.holosen.net/api/";
    static getApiURL = (suffix) => `${this.url}${suffix}`;
}