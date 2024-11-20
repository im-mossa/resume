class UserApi extends BaseApi {
    login = async (data, onsuccess) => {
        this.postData("user/login", data, onsuccess);
    }
    signUp = async (data, onsuccess) => {
        this.postData("user/register", data, onsuccess);
    }
    editProfile = async (data, token, onsuccess) => {
        this.putDataWithToken("user/update", data, token, onsuccess);
    }
    changePassword = async (data, token, onsuccess) => {
        this.putDataWithToken("user/changePassword", data, token, onsuccess);
    }
}