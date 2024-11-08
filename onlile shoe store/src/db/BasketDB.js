class BasketDB {
    static addToBasket(data, size, color) {
        let dataList = this.load();
        if (dataList == undefined || dataList == null) {
            dataList = new Array();
        }
        let basketItem = new Basket(
            data.id,
            data.title,
            data.price,
            data.image,
            1,
            size.id,
            size.title,
            color.id,
            color.title,
            color.hexValue,
        );

        let oldData = dataList.find((value) => value != null && value.id == basketItem.id
            && value.sizeId == basketItem.sizeId && value.colorId == basketItem.colorId);
        if (oldData != undefined && oldData != null) {
            oldData.qty++;
        } else {
            dataList.push(basketItem);
        }
        setCookie("basket", JSON.stringify(dataList), 30);
        Swal.fire({
            icon: "success",
            title: basketItem.title + " Added to basket",
        });
    }

    static load() {
        let str = getCookie("basket");
        if (str == "") return null;
        let dataList = JSON.parse(str);
        let result = [];
        dataList.forEach(element => {
            if (element != null) {
                result.push(element);
            }
        });
        return result;
    }

    static increaseQTY(id, cId, sId) {
        let dataList = this.load();
        if (dataList == undefined || dataList == null) {
            dataList = new Array();
        }
        let oldData = dataList.find((value) => value != null && value.id == id && value.colorId == cId && value.sizeId == sId);
        if (oldData != undefined && oldData != null) {
            oldData.qty++;
            setCookie("basket", JSON.stringify(dataList), 30);
            return oldData.qty;
        }
        return 0;
    }

    static decreaseQTY(id, cId, sId) {
        let dataList = this.load();
        if (dataList == undefined || dataList == null) {
            dataList = new Array();
        }
        let oldData = dataList.find((value) => value != null && value.id == id && value.colorId == cId && value.sizeId == sId);
        if (oldData != undefined && oldData != null) {
            oldData.qty--;
            if (oldData.qty <= 0) {
                let index = dataList.findIndex((value) => value != null && value.id == id && value.colorId == cId && value.sizeId == sId);
                delete dataList[index];
            }
            setCookie("basket", JSON.stringify(dataList), 30);
            return oldData.qty;
        }
        return 0;
    }
}