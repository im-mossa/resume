class panelApi extends BaseApi {
    getAllByUserId = async (userId, pageIndex, pageSize, token, onsuccess) => {
        this.getDataWithToken(`invoice/user/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`, token, onsuccess);
    }
    getById = async (token, onsuccess) => {

        this.getDataWithToken(`user`, token, onsuccess);
    }
}