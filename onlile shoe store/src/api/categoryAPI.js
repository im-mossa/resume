class CategoryApi extends BaseApi {
    getAll = async (onsuccess) => {
        this.getData("productCategory", onsuccess);
    }
    getById = async (id, onsuccess) => {
        this.getData(`productCategory/${id}`, onsuccess);
    }
}