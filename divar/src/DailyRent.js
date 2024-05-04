//DailyRent Class
//نمایانگر ملکی است که برای اجاره روزانه در دسترس است
//کلاس فروش را گسترش می دهد
class DailyRent extends Selling {
    constructor(id, name, adType, segmentTypes, propertyType, address, city, state, country, sizeOfLand, floor, room, normalDayRental, weekendRental, rentingHolidaysAndOccasions, capacity, theCostOfEachAdditionalPerson, elevator, parking, theBalcony, phone, email, description, urgent, video, image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10) {
        super(id, name, adType, segmentTypes, propertyType, address, city, state, country, sizeOfLand, floor, room, elevator, parking, theBalcony, phone, email, description, urgent, video, image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10);
        //توضیحات کانستراکتور ها در فایل selling موجود است
        this.normalDayRental = normalDayRental; //قیمت اجاره برای یک روز عادی.
        this.weekendRental = weekendRental; //قیمت اجاره برای تعطیلات آخر هفته.
        this.rentingHolidaysAndOccasions = rentingHolidaysAndOccasions; //قیمت اجاره برای تعطیلات و مناسبت های خاص
        this.capacity = capacity; //حداکثر ظرفیت ملک.
        this.theCostOfEachAdditionalPerson = theCostOfEachAdditionalPerson; //هزینه برای هر نفر اضافی.
        this.video = video; //آدرس فایل ویدئو ملک.
    }
}

