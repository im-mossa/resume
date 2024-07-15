//  نمایانگر کفشی است که برای فروش  وجود دارد.
class Shoe {
    constructor(id, title, brand, img, agency, WarehouseInventory, shoeType,auction, price, material, soleMaterial, SoleFeatures, insole, SpecialFeaturesOfShoes, ShoeSizes) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.img = img;
        this.agency = agency;
        this.WarehouseInventory = WarehouseInventory;
        this.shoeType = shoeType;
        this.auction = auction;
        this.price = price;
        this.material = material;
        this.soleMaterial = soleMaterial;
        this.SoleFeatures = SoleFeatures;
        this.insole = insole;
        this.SpecialFeaturesOfShoes = SpecialFeaturesOfShoes;
        this.ShoeSizes = ShoeSizes;
    }

    // متدی برای اضافه کردن تعداد کفش برای یک سایز خاص
    // addSize(size, count) {
    //     if (this.ShoeSizes[size]) {
    //         this.ShoeSizes[size] += count;
    //     } else {
    //         this.ShoeSizes[size] = count;
    //     }
    // }

    // متدی برای گرفتن تعداد کفش‌ها برای یک سایز خاص
    // getSizeCount(size) {
    //     return this.ShoeSizes[size] || 0;
    // }

    // متدی برای کم کردن تعداد کفش برای یک سایز خاص
    // removeSize(size, count) {
    //     if (this.ShoeSizes[size]) {
    //         if (this.ShoeSizes[size] >= count) {
    //             this.ShoeSizes[size] -= count;
    //         } else {
    //             console.error(`تعداد کفش‌ها برای سایز ${size} کمتر از مقدار مورد نظر است`);
    //         }
    //     } else {
    //         console.error(`سایز ${size} وجود ندارد`);
    //     }
    // }
}



