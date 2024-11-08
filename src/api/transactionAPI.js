class TransactionApi extends BaseApi {
    goToPayment = async (data, onsuccess) => {
        let token = getCookie("token");
        this.postDataWithToken("trx/gotoPayment", data, token, onsuccess);
    }
}