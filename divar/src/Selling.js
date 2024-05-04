/**
 * Selling Class
 * 
 * نمایانگر ملکی است که برای فروش یا اجاره وجود دارد.
 */
class Selling {
    /**
     * نمونه ای از Selling ایجاد می کند.
     * 
     * @param {string} id - شناسه منحصر به فرد ملک.
     * @param {string} name - عنوان یا نام ملک.
     * @param {string} adType - نوع آگهی (مثلاً فروش مسکونی، اجاره).
     * @param {string} segmentTypes - انواع آگهی دهندگان (شخصی، مشاور املاک...).
     * @param {string} propertyType - انواع ملک (آپارتمان، ویلا، مغازه...).
     * @param {string} address - آدرس ملک.
     * @param {string} city - شهری که ملک در آن واقع شده است.
     * @param {string} state - استانی که ملک در آن واقع شده است.
     * @param {string} country - کشوری که ملک در آن واقع شده است.
     * @param {number} sizeOfLand - متراژ زمین (به متر مربع).
     * @param {number} floor - شماره طبقه ملک.
     * @param {number} yearOfConstruction - سال ساخت ملک.
     * @param {number} room - تعداد اتاق های ملک.
     * @param {number} totalPrice - قیمت کل ملک.
     * @param {number} pricePerMeter - قیمت هر متر مربع ملک.
     * @param {boolean} elevator - نشان می دهد که آیا ملک دارای آسانسور است.
     * @param {boolean} parking - نشان می دهد که آیا ملک دارای امکانات پارکینگ است یا خیر.
     * @param {boolean} warehouse - نشان می دهد که ملک دارای انبار است یا خیر.
     * @param {boolean} theBalcony - نشان می دهد که آیا ملک دارای بالکن است یا خیر.
     * @param {string} phone - شماره تماس ملک.
     * @param {string} email - آدرس ایمیل تماس ملک.
     * @param {string} description - شرح ملک.
     * @param {boolean} urgent - نشان می دهد که آیا ملک فوری است.
     * @param {boolean} video - آدرس فایل ویدئو ملک.
     * @param {string} image - آدرس فایل تصویر ملک.
     * @param {string} image1 - آدرس فایل تصویر1 ملک.
     * @param {string} image2 - آدرس فایل تصویر2 ملک.
     * @param {string} image3 - آدرس فایل تصویر3 ملک.
     * @param {string} image4 - آدرس فایل تصویر4 ملک.
     * @param {string} image5 - آدرس فایل تصویر5 ملک.
     * @param {string} image6 - آدرس فایل تصویر6 ملک.
     * @param {string} image7 - آدرس فایل تصویر7 ملک.
     * @param {string} image8 - آدرس فایل تصویر8 ملک.
     * @param {string} image9 - آدرس فایل تصویر9 ملک.
     * @param {string} image10 - آدرس فایل تصویر10 ملک.
     */
    constructor(id, name, adType, segmentTypes, propertyType, address, city, state, country, sizeOfLand, floor, yearOfConstruction, room, totalPrice, pricePerMeter, elevator, parking, warehouse, theBalcony, phone, email, description, urgent, video, image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10) {
        this.id = id;
        this.name = name;
        this.adType = adType;
        this.segmentTypes = segmentTypes;
        this.propertyType = propertyType;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.sizeOfLand = sizeOfLand;
        this.floor = floor;
        this.yearOfConstruction = yearOfConstruction;
        this.room = room;
        this.totalPrice = totalPrice;
        this.pricePerMeter = pricePerMeter;
        this.elevator = elevator;
        this.parking = parking;
        this.warehouse = warehouse;
        this.theBalcony = theBalcony;
        this.phone = phone;
        this.email = email;
        this.description = description;
        this.urgent = urgent;
        this.video = video;
        this.image = image;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.image5 = image5;
        this.image6 = image6;
        this.image7 = image7;
        this.image8 = image8;
        this.image9 = image9;
        this.image10 = image10;
    }

    /**
     * Getter برای نوع ملک.
     */
    get proType() {
        return this.propertyType;
    }

    /**
     * Getter برای نوع آگهی.
     */
    get propertyAdType() {
        return this.adType;
    }

    /**
     * بررسی می کند که آیا ملک حداقل یک تصویر دارد یا خیر.
     */
    get hasImage() {
        return this.image !== undefined && this.image !== null && this.image !== "";
    }

    /**
     * بررسی می کند که آیا ملک فیلم دارد یا خیر.
     */
    get hasVideo() {
        return this.video !== undefined && this.video !== null && this.video !== "";
    }

    /**
     * Getter برای انواع آگهی دهندگان.
     */
    get getSegmentTypes() {
        return this.segmentTypes;
    }

    /**
     * Getter برای فوری بودن آگهی ملک.
     */
    get getUrgent() {
        return this.urgent;
    }
}
