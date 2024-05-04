//Monthlyrent Class
//نمایانگر ملکی است که برای اجاره ماهانه در دسترس است
//کلاس فروش را گسترش می دهد
class Monthlyrent extends Selling {
    constructor(id, name,aAdType, segmentTypes, propertyType, address, city, state, country, sizeOfLand, floor, room, phone, email, description, urgent, deposit, monthlyRent, convert, video, image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10) {
        super(id, name,aAdType, segmentTypes, propertyType, address, city, state, country, sizeOfLand, floor, room, phone, email, description, urgent);
        //توضیحات کانستراکتور ها در فایل selling موجود است
        this.deposit = deposit; //مبلغ ودیعه برای اجاره ملک.
        this.monthlyRent = monthlyRent; //مبلغ اجاره ماهانه ملک.
        this.convert = convert; //قابلیت تبدیل ودیعه به اجاره ماهانه.
        this.video = video; // آدرس فایل ویدئو ملک
        this.image = image //آدرس فایل تصویر ملک.
        this.image1 = image1; //آدرس فایل تصویر 1 ملک.
        this.image2 = image2; //آدرس فایل تصویر 2 ملک.
        this.image3 = image3; //آدرس فایل تصویر 3 ملک.
        this.image4 = image4; //آدرس فایل تصویر 4 ملک.
        this.image5 = image5; //آدرس فایل تصویر 5 ملک.
        this.image6 = image6; //آدرس فایل تصویر 6 ملک.
        this.image7 = image7; //آدرس فایل تصویر 7 ملک.
        this.image8 = image8; //آدرس فایل تصویر 8 ملک.
        this.image9 = image9; //آدرس فایل تصویر 9 ملک.
        this.image10 = image10; //آدرس فایل تصویر 10 ملک.
    }
}


