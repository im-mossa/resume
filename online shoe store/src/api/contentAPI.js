class AboutApi extends BaseApi {
    getAll = async (onsuccess) => {
        this.getData("content", onsuccess);
    }
}