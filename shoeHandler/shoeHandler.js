// نمایانگر لیستی است که آیتم های املاک در آن قرار می گیرد
class ShoeHandler {
    static dataList = new Array();

    static getDataList() {
        return this.dataList;
    }
    
    static addData(shoe) {
        if(this.dataList == null) {
            this.dataList = new Array();
        }
        this.dataList.push(shoe);
    }
}