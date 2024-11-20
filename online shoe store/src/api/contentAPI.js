class AboutApi extends BaseApi {
    getAll = async (onsuccess) => {
        this.getData("content", onsuccess);
    }
    // Because there is only one item, this part of the code was not used
    // getData = async (title, onsuccess) => {
    //     this.getData(`content/${title}`, onsuccess);
    // }
}