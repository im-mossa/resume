class SliderApi extends BaseApi {
    getAll = async (onsuccess) => {
        this.getData("slider", onsuccess);
    }
    getById = async (id, onsuccess) => {
        this.getData(`slider/${id}`, onsuccess);
    }
}