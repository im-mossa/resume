const containerRent = document.querySelector(".container-rent");
const partBox = document.querySelector(".part-box");
const containerPart1 = document.querySelector("#container-part1");
const containerPart2 = document.querySelector("#container-car");
const containerVan = document.querySelector("#container-van");
const containerPickUp = document.querySelector("#container-pick-up");
const informationSection = document.querySelector("#information-car");
const informationSection1 = document.querySelector("#information-van");
const informationSection2 = document.querySelector("#information-pick-up");
const resultSection = document.querySelector(".result-section");
const resultText = document.querySelector(".result-text");
const returnButton = document.querySelector("#Return");
const returnButtonVan = document.querySelector("#Return1");
const returnButtonPickUp = document.querySelector("#Return2");
const returnButtonInfotmation = document.querySelector(".Return-infotmation");
const printButton = document.querySelector(".print");

printButton.addEventListener("click", function() {
  // مخفی کردن دکمه‌ها
  printButton.style.display = "none";
  returnButtonInfotmation.style.display = "none";

  // اجرای دستورات چاپ
  window.print();

  // نمایش دوباره دکمه‌ها بعد از اجرای دستورات چاپ
  printButton.style.display = "block";
  returnButtonInfotmation.style.display = "block";
});

function fCar() {
  containerPart1.style.display = "none";
  containerPart2.style.display = "block";
  informationSection.style.display = "none";
  resultSection.style.display = "none";
  returnButton.style.display = "block";

  // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه
  if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "823px";
      partBox.style.height = "540px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

function fVan() {
  containerVan.style.display = "block";
  containerPart1.style.display = "none";
  informationSection1.style.display = "none";
  returnButtonVan.style.display = "block";
  resultSection.style.display = "none";

   // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه 
    if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "623px";
      partBox.style.height = "340px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

function fPickUp() {
  containerPickUp.style.display = "block";
  containerPart1.style.display = "none";
  containerPart2.style.display = "none";
  informationSection2.style.display = "none";
  returnButtonPickUp.style.display = "block";
  resultSection.style.display = "none";

   // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه 
    if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "623px";
      partBox.style.height = "340px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

function displayBlock() {
  containerRent.style.height = "320px";
  partBox.style.height = "20px";
  containerPart1.style.display = "block";
  informationSection.style.display = "none";
  informationSection1.style.display = "none";
  informationSection2.style.display = "none";
  returnButton.style.display = "none";
  returnButtonVan.style.display = "none";
  returnButtonPickUp.style.display = "none";
  returnButtonInfotmation.style.display = "none";
  printButton.style.display = "none";
  resultSection.style.display = "none";

  // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه
  if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "290px";
      partBox.style.height = "0px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

let carModel;
let selectedCarEle;

function selectCar(name, ele) {
  if (rentalCars.includes(name)) {
    // بررسی ماشین موجود بودن در لیست
    alert("This car is not currently available.");
    return;
  }

  carModel = name;
  selectedCarEle = ele;
  const selectedList = document.querySelector(".car-item-selected");
  if (selectedList) {
    selectedList.classList.remove("car-item-selected");
  }
  ele.classList.add("car-item-selected");

  containerPart2.style.display = "none";
  informationSection.style.display = "block";
  resultSection.style.display = "none";
}

let vanModel;
let selectedVanEle;

function selectVan(name1, ele1) {
  if (rentalVans.includes(name1)) {
    // بررسی ماشین موجود بودن در لیست
    alert("This van is not currently available.");
    return;
  }

  vanModel = name1;
  selectedVanEle = ele1;
  const selectedList1 = document.querySelector(".car-item-selected");
  if (selectedList1) {
    selectedList1.classList.remove("car-item-selected");
  }
  ele1.classList.add("car-item-selected");

  containerVan.style.display = "none";
  informationSection1.style.display = "block";
  resultSection.style.display = "none";


   // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه 
   if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "823px";
      partBox.style.height = "540px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

let pickUpModel;
let selectedPickUpEle;

function selectPickUp(name2, ele2) {
  if (rentalPickUps.includes(name2)) {
    // بررسی ماشین موجود بودن در لیست
    alert("This pick up is not currently available.");
    return;
  }

  pickUpModel = name2;
  selectedPickUpEle = ele2;
  const selectedList2 = document.querySelector(".car-item-selected");
  if (selectedList2) {
    selectedList2.classList.remove("car-item-selected");
  }
  ele2.classList.add("car-item-selected");

  containerPickUp.style.display = "none";
  informationSection2.style.display = "block";
  resultSection.style.display = "none";


   // اولین چک کنیم که آیا یک event listener قبلاً اضافه شده یا نه 
   if (!window.adjustContainerHeightAdded) {
    // اضافه کردن event listener به resize
    window.addEventListener('resize', adjustContainerHeight);
    window.adjustContainerHeightAdded = true; // فلگ برای نشان دادن اینکه event listener اضافه شده است
  }

  // تابع adjustContainerHeight برای تنظیم ارتفاع
  function adjustContainerHeight() {
    if (window.innerWidth < 1440) {
      containerRent.style.height = "873px";
      partBox.style.height = "590px";
      informationSection2.style.height = "780px";
    } else {
      containerRent.style.height = "";
      partBox.style.height = "";
      informationSection2.style.height = "";
    }
  }
  
  // تنظیم ارتفاع هم به هنگام بارگذاری
  adjustContainerHeight();
}

const carsInventory = {
  "benz-cls": 1,
  "benz-E350": 1,
  "bmw-528": 1,
  "bmw-i8": 1,
  "bmw-x6": 1,
  "porsche-911": 1,
  "porsche-boxster": 1,
  "prado-4X": 1,
};

const rentalCars = []; // استفاده از آرایه برای ذخیره ماشین‌های اجاره شده

function returnCar(carModel) {
  console.log(
    `The car model ${carModel} was returned to the list of available cars.`
  );
  carsInventory[carModel]++;
  console.log(
    `${carModel} model number of cars now: ${carsInventory[carModel]}`
  );
}

const vansInventory = {
  "ford-cargo": 1,
  "f-passenger": 1,
  "v_crafter": 1,
  "f-dropside": 1,
  "ford-curtain": 1,
  "ford-connect": 1,
};

const rentalVans = []; // استفاده از آرایه برای ذخیره ون های اجاره شده

function returnVan(vanModel) {
  console.log(
    `The car model ${vanModel} was returned to the list of available cars.`
  );
  vansInventory[vanModel]++;
  console.log(
    `${vanModel} model number of cars now: ${vansInventory[vanModel]}`
  );
}

const pickUpInventory = {
  "dodge-ram-2020": 1,
  "dodge-ram-2008": 1,
  "ford-150": 1,
  "ford-maverick": 1,
  "toyota-tacoma": 1,
  "toyota-hilux": 1,
};

const rentalPickUps = []; // استفاده از آرایه برای ذخیره ون های اجاره شده

function returnPickUp(pickUpModel) {
  console.log(
    `The pick up model ${pickUpModel} was returned to the list of available pick ups.`
  );
  pickUpInventory[pickUpModel]++;
  console.log(
    `${pickUpModel} model number of pick ups now: ${pickUpInventory[pickUpModel]}`
  );
}

function reserveCar() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);
  const lName = document.getElementById("l-name").value;
  const fName = document.querySelector("#f-name").value;
  resultSection.style.display = "block";

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate(startDate) && isValidReservationDate(endDate)) {
    if (carsInventory[carModel] > 0 && startDate < endDate) {
      resultText.innerHTML = `The car model ${carModel} was successfully reserved from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} in the name of ${fName} ${lName}.Deliver the car to your home within the next two hours and provide the required documents.`;

      carsInventory[carModel]--;
      selectedCarEle.classList.add("car-item-display");
      rentalCars.push(carModel); // اضافه کردن نام خودرو به لیست rentalCars



      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate = new Date(endDate);
      expirationDate.setDate(expirationDate.getDate() + 1);
      resultText.innerHTML += `<br>Expiry date of reservation: ${expirationDate.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice = calculateTotalRentPrice(carModel, startDate, endDate);
      resultText.innerHTML += `<br>Total price of car model rental ${carModel} for reserved days: ${totalPrice} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnCar(carModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerPart2.style.display = "none";
      containerPart1.style.display = "none";
      if (startDate >= endDate) {
        resultText.innerHTML = "Error: End date must be after start date.";
      } else {
        resultText.innerHTML = `Unfortunately, the car model ${carModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    resultText.innerHTML = "Error: Please select a valid reservation date.";
  }
}

function reserveVan() {
  const startDate1 = new Date(document.getElementById("startDate1").value);
  const endDate1 = new Date(document.getElementById("endDate1").value);
  const lName1 = document.getElementById("l-name1").value;
  const fName1 = document.querySelector("#f-name1").value;
  resultSection.style.display = "block";

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate1(startDate1) && isValidReservationDate1(endDate1)) {
    if (vansInventory[vanModel] > 0 && startDate1 < endDate1) {
      resultText.innerHTML = `The van model ${vanModel} was successfully reserved from ${startDate1.toLocaleDateString()} to ${endDate1.toLocaleDateString()} in the name of ${fName1} ${lName1}.Deliver the van to your home within the next two hours and provide the required documents.`;

      vansInventory[vanModel]--;
      selectedVanEle.classList.add("car-item-display");
      rentalVans.push(vanModel); // اضافه کردن نام خودرو به لیست rentalCars


      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate1 = new Date(endDate1);
      expirationDate1.setDate(expirationDate1.getDate() + 1);
      resultText.innerHTML += `<br>Expiry date of reservation: ${expirationDate1.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice1 = calculateTotalRentPrice1(vanModel, startDate1, endDate1);
      resultText.innerHTML += `<br>Total price of van model rental ${vanModel} for reserved days: ${totalPrice1} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnCar(vanModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate1.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerVan.style.display = "none";
      containerPart1.style.display = "none";
      if (startDate1 >= endDate1) {
        resultText.innerHTML = "Error: End date must be after start date.";
      } else {
        resultText.innerHTML = `Unfortunately, the van model ${vanModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    resultText.innerHTML = "Error: Please select a valid reservation date.";
  }
}

function reservePickUp() {
  const startDate2 = new Date(document.getElementById("startDate2").value);
  const endDate2 = new Date(document.getElementById("endDate2").value);
  const lName2 = document.getElementById("l-name2").value;
  const fName2 = document.querySelector("#f-name2").value;
  resultSection.style.display = "block";

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate2(startDate2) && isValidReservationDate2(endDate2)) {
    if (pickUpInventory[pickUpModel] > 0 && startDate2 < endDate2) {
      resultText.innerHTML = `The pick up model ${pickUpModel} was successfully reserved from ${startDate2.toLocaleDateString()} to ${endDate2.toLocaleDateString()} in the name of ${fName2} ${lName2}.Deliver the pick up to your home within the next two hours and provide the required documents.`;

      pickUpInventory[pickUpModel]--;
      selectedPickUpEle.classList.add("car-item-display");
      rentalPickUps.push(pickUpModel); // اضافه کردن نام خودرو به لیست rentalCars



      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate2 = new Date(endDate2);
      expirationDate2.setDate(expirationDate2.getDate() + 1);
      resultText.innerHTML += `<br>Expiry date of reservation: ${expirationDate2.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice2 = calculateTotalRentPrice2(pickUpModel, startDate2, endDate2);
      resultText.innerHTML += `<br>Total price of pick up model rental ${pickUpModel} for reserved days: ${totalPrice2} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnCar(pickUpModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate2.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerPickUp.style.display = "none";
      containerPart1.style.display = "none";
      if (startDate2 >= endDate2) {
        resultText.innerHTML = "Error: End date must be after start date.";
      } else {
        resultText.innerHTML = `Unfortunately, the pick up model ${pickUpModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    resultText.innerHTML = "Error: Please select a valid reservation date.";
  }
}

// محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
function calculateTotalRentPrice(carModel, startDate, endDate) {
  const rentalPrices = {
    "benz-cls": 110,
    "benz-E350": 100,
    "bmw-528": 100,
    "bmw-i8": 200,
    "bmw-x6": 105,
    "porsche-911": 110,
    "porsche-boxster": 150,
    "prado-4X": 100,
  };

  // تعداد روزهای رزرو شده
  const oneDay = 24 * 60 * 60 * 1000; // میلی ثانیه در یک روز
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.round(Math.abs((end - start) / oneDay));

  // محاسبه قیمت کل کرایه
  const dailyPrice = rentalPrices[carModel];
  const totalPrice = dailyPrice * days;
  const costEle = document.getElementById("cost");
  costEle.value = Number(totalPrice);

  return totalPrice;
}

function calculateTotalRentPrice1(vanModel, startDate1, endDate1) {
  const rentalPrices1 = {
    "ford-cargo": 200,
    "f-passenger": 250,
    "v_crafter": 220,
    "f-dropside": 180,
    "ford-curtain": 200,
    "ford-connect": 180,
  };

  // تعداد روزهای رزرو شده
  const oneDay1 = 24 * 60 * 60 * 1000; // میلی ثانیه در یک روز
  const start1 = new Date(startDate1);
  const end1 = new Date(endDate1);
  const days1 = Math.round(Math.abs((end1 - start1) / oneDay1));

  // محاسبه قیمت کل کرایه
  const dailyPrice1 = rentalPrices1[vanModel];
  const totalPrice1 = dailyPrice1 * days1;
  const costEle1 = document.getElementById("cost1");
  costEle1.value = Number(totalPrice1);

  return totalPrice1;
}

function calculateTotalRentPrice2(pickUpModel, startDate2, endDate2) {
  const rentalPrices2 = {
    "dodge-ram-2020": 200,
    "dodge-ram-2008": 110,
    "ford-150": 220,
    "ford-maverick": 180,
    "toyota-tacoma": 180,
    "toyota-hilux": 160,
  };

  // تعداد روزهای رزرو شده
  const oneDay2 = 24 * 60 * 60 * 1000; // میلی ثانیه در یک روز
  const start2 = new Date(startDate2);
  const end2 = new Date(endDate2);
  const days2 = Math.round(Math.abs((end2 - start2) / oneDay2));

  // محاسبه قیمت کل کرایه
  const dailyPrice2 = rentalPrices2[pickUpModel];
  const totalPrice2 = dailyPrice2 * days2;
  const costEle2 = document.getElementById("cost2");
  costEle2.value = Number(totalPrice2);

  return totalPrice2;
}

function submitRent() {
  const fName = document.querySelector("#f-name").value; // برای دریافت مقدار فیلدها باید value را استفاده کنید
  const lName = document.querySelector("#l-name").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  if (fName == "" || lName == "" || phone == "" || address == "") {
    alert("The information entered is incorrect.");
  } else {
    informationSection.style.display = "none";
    returnButtonInfotmation.style.display = "block";
    printButton.style.display = "block";
    reserveCar();
  }
}

function submitRent1() {
  const fName1 = document.querySelector("#f-name1").value; // برای دریافت مقدار فیلدها باید value را استفاده کنید
  const lName1 = document.querySelector("#l-name1").value;
  const phone1 = document.querySelector("#phone1").value;
  const address1 = document.querySelector("#address1").value;

  if (fName1 == "" || lName1 == "" || phone1 == "" || address1 == "") {
    alert("The information entered is incorrect.");
  } else {
    informationSection1.style.display = "none";
    returnButtonInfotmation.style.display = "block";
    printButton.style.display = "block";
    reserveVan();
  }
}

function submitRent2() {
  const fName2 = document.querySelector("#f-name2").value; // برای دریافت مقدار فیلدها باید value را استفاده کنید
  const lName2 = document.querySelector("#l-name2").value;
  const phone2 = document.querySelector("#phone2").value;
  const address2 = document.querySelector("#address2").value;

  if (fName2 == "" || lName2 == "" || phone2 == "" || address2 == "") {
    alert("The information entered is incorrect.");
  } else {
    informationSection2.style.display = "none";
    returnButtonInfotmation.style.display = "block";
    printButton.style.display = "block";
    reservePickUp();
  }
}

function returnCar(carModel) {
  console.log(
    `The car model ${carModel} was returned to the list of available cars.`
  );
  costOfCars.set(carModel, costOfCars.get(carModel) + 1); // افزایش تعداد ماشین‌ها
  console.log(
    `${carModel} model number of cars now: ${costOfCars.get(carModel)}`
  );
}

function returnVan(vanModel) {
  console.log(
    `The van model ${vanModel} was returned to the list of available vans.`
  );
  costOfVans.set(vanModel, costOfVans.get(vanModel) + 1); // افزایش تعداد ماشین‌ها
  console.log(
    `${vanModel} model number of vans now: ${costOfVans.get(vanModel)}`
  );
}

function returnPickUp(pickUpModel) {
  console.log(
    `The pick up model ${pickUpModel} was returned to the list of available pick ups.`
  );
  costOfPickUps.set(pickUpModel, costOfPickUps.get(pickUpModel) + 1); // افزایش تعداد ماشین‌ها
  console.log(
    `${pickUpModel} model number of pick ups now: ${costOfPickUps.get(pickUpModel)}`
  );
}

// ابتدا یک تابع برای بررسی اعتبار تاریخ رزرو ایجاد می‌کنیم
function isValidReservationDate(date) {
  // تاریخ حال حاضر
  var currentDate = new Date();

  // بررسی آیا تاریخ انتخاب شده توسط کاربر بعد از تاریخ حال حاضر است یا خیر
  if (date >= currentDate) {
    return true; // تاریخ انتخاب شده معتبر است
  } else {
    return false; // تاریخ انتخاب شده قبل از تاریخ حال حاضر است، بنابراین نامعتبر است
  }
}

function isValidReservationDate1(date) {
  // تاریخ حال حاضر
  var currentDate1 = new Date();

  // بررسی آیا تاریخ انتخاب شده توسط کاربر بعد از تاریخ حال حاضر است یا خیر
  if (date >= currentDate1) {
    return true; // تاریخ انتخاب شده معتبر است
  } else {
    return false; // تاریخ انتخاب شده قبل از تاریخ حال حاضر است، بنابراین نامعتبر است
  }
}

function isValidReservationDate2(date) {
  // تاریخ حال حاضر
  var currentDate2 = new Date();

  // بررسی آیا تاریخ انتخاب شده توسط کاربر بعد از تاریخ حال حاضر است یا خیر
  if (date >= currentDate2) {
    return true; // تاریخ انتخاب شده معتبر است
  } else {
    return false; // تاریخ انتخاب شده قبل از تاریخ حال حاضر است، بنابراین نامعتبر است
  }
}
