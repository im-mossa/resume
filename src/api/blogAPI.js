class BlogApi extends BaseApi {
    getAll = async (onsuccess) => {
        this.getData("blog", onsuccess);
    }
    getById = async (id, onsuccess) => {
        this.getData(`blog/${id}`, onsuccess);
    }
}