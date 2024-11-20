class ProductApi extends BaseApi {
    getAll = async (pageIndex , pageSize , onsuccess) => {
        this.getData(`product?pageIndex=${pageIndex }&pageSize=${pageSize }`, onsuccess);
    }
    getById = async (id, onsuccess) => {
        this.getData(`product/${id}`, onsuccess);
    }
    getByCategoryId = async (id, pageIndex, pageSize, onsuccess) => {
        this.getData(`product/cat/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`, onsuccess);
    }
    getNewProducts = async (onsuccess) => {
        this.getData("product/new", onsuccess);
    }
    getPopularProducts = async (onsuccess) => {
        this.getData("product/popular", onsuccess);
    }
}