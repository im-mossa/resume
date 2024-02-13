const containerPart1 = document.querySelector("#container-part1");
const containerPart2 = document.querySelector("#container-car");
const containerVan = document.querySelector("#container-van");
const containerPickUp = document.querySelector("#container-pick-up");
const returnButton = document.querySelector("#Return");
const printButton = document.querySelector("#print");
const result = document.getElementById("result1");
function p() {
  window.print();
}

function fCar() {
  containerPart2.style.display = "block";
  containerPart1.style.display = "none";
  returnButton.style.display = "none";
  printButton.style.display = "none";
  result.style.display = "none";
}

function fVan() {
  containerVan.style.display = "block";
  containerPart1.style.display = "none";
  returnButton.style.display = "none";
  printButton.style.display = "none";
  result.style.display = "none";
}

function fPickUp() {
  containerPickUp.style.display = "block";
  containerPart1.style.display = "none";
  returnButton.style.display = "none";
  printButton.style.display = "none";
  result.style.display = "none";
}

const pickUpInventory = {
  "dodge-ram-1": 1,
  "dodge-ram-2": 1,
  "ford-f150": 1,
  "ford-maverick": 1,
  "toyota-tacoma": 1,
  "toyota-hilux": 1,
}

const vansInventory = {
  "ford-cargo": 1,
  "ford-passenger": 1,
  "Volkswagen_Crafter": 1,
  "Ford-Dropside": 1,
  "ford-curtain": 1,
  "ford-connect": 1,
}

const carsInventory = {
  "benz-cls": 1,
  "benz-E350": 1,
  "bmw-528": 1,
  "bmw-i8": 1,
  "bmw-x6": 1,
  "porsche-91": 1,
  "porsche-boxster": 1,
  "prado-4X": 1,
};

function returnCar(carModel) {
  console.log(`The car model ${carModel} was returned to the list of available cars.`);
  carsInventory[carModel]++;
  console.log(
    `${carModel} model number of cars now: ${carsInventory[carModel]}`
  );
}

function returnVan(vanModel) {
  console.log(`The van model ${vanModel} was returned to the list of available vans.`);
  carsInventory[vanModel]++;
  console.log(
    `${vanModel} model number of vans now: ${vansInventory[vanModel]}`
  );
}

function returnPickUp(pickUpModel) {
  console.log(`The pick up model ${pickUpModel} was returned to the list of available pick up.`);
  pickUpInventory[pickUpModel]++;
  console.log(
    `${pickUpModel} model number of pick up now: ${pickUpInventory[pickUpModel]}`
  );
}

function displaynone() {
  containerPart2.style.display = "none";
  returnButton.style.display = "block";
  printButton.style.display = "block";
  result.style.display = "block";
  reserveCar();
}

function displaynone1() {
  containerVan.style.display = "none";
  returnButton.style.display = "block";
  printButton.style.display = "block";
  result.style.display = "block";
  reservevan();
}

function displaynone2() {
  containerPickUp.style.display = "none";
  returnButton.style.display = "block";
  printButton.style.display = "block";
  result.style.display = "block";
  reservePickUp();
}

function displayBlock() {
  containerPart1.style.display = "block";
  returnButton.style.display = "none";
  printButton.style.display = "none";
  result.style.display = "none";
  containerPart2.style.display = "none";
  containerVan.style.display = "none";
  containerPickUp.style.display = "none";

}

function reserveCar() {
  const carModel = document.getElementById("carModel").value;
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate(startDate) && isValidReservationDate(endDate)) {
    if (carsInventory[carModel] > 0 && startDate < endDate) {
      result.innerHTML = `The car model ${carModel} was successfully reserved from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.`;

      (carsInventory[carModel]--);

      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate = new Date(endDate);
      expirationDate.setDate(expirationDate.getDate() + 1);
      result.innerHTML += `<br>Expiry date of reservation: ${expirationDate.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice = calculateTotalRentPrice(carModel, startDate, endDate);
      result.innerHTML += `<br>Total price of car model rental ${carModel} for reserved days: ${totalPrice} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnCar(carModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerPart2.style.display = "none";
      containerPart1.style.display = "none";
      if (startDate >= endDate) {
        result.innerHTML = "Error: End date must be after start date.";
      } else {
        result.innerHTML = `Unfortunately, the car model ${carModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    result.innerHTML = "Error: Please select a valid reservation date.";
  }
}

function reservevan() {
  const vanModel = document.getElementById("vanModel").value;
  const startDate1 = new Date(document.getElementById("startDate1").value);
  const endDate1 = new Date(document.getElementById("endDate1").value);

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate(startDate1) && isValidReservationDate(endDate1)) {
    if (vansInventory[vanModel] > 0 && startDate1 < endDate1) {
      result.innerHTML = `The van model ${vanModel} was successfully reserved from ${startDate1.toLocaleDateString()} to ${endDate1.toLocaleDateString()}.`;

      vansInventory[vanModel]--;

      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate = new Date(endDate1);
      expirationDate.setDate(expirationDate.getDate() + 1);
      result.innerHTML += `<br>Expiry date of reservation: ${expirationDate.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice1 = calculateTotalRentPrice1(vanModel, startDate1, endDate1);
      result.innerHTML += `<br>Total price of van rental ${vanModel} for reserved days: ${totalPrice1} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnVan(vanModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerPart1.style.display = "none";
      containerVan.style.display = "none";
      if (startDate1 >= endDate1) {
        result.innerHTML = "Error: End date must be after start date.";
      } else {
        result.innerHTML = `Unfortunately, the van model ${vanModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    result.innerHTML = "Error: Please select a valid reservation date.";
  }
}

function reservePickUp() {
  const pickUpModel = document.getElementById("pickUpModel").value;
  const startDate2 = new Date(document.getElementById("startDate2").value);
  const endDate2 = new Date(document.getElementById("endDate2").value);

  // بررسی اعتبار تاریخ‌های ورودی
  if (isValidReservationDate(startDate2) && isValidReservationDate(endDate2)) {
    if (pickUpInventory[pickUpModel] > 0 && startDate2 < endDate2) {
      result.innerHTML = `The pick up model ${pickUpModel} was successfully reserved from ${startDate2.toLocaleDateString()} to ${endDate2.toLocaleDateString()}.`;

      pickUpInventory[pickUpModel]--;

      // تعیین تاریخ انقضای رزرو (یک روز بعد از تاریخ پایان رزرو)
      const expirationDate = new Date(endDate2);
      expirationDate.setDate(expirationDate.getDate() + 1);
      result.innerHTML += `<br>Expiry date of reservation: ${expirationDate.toLocaleDateString()}`;

      // محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
      const totalPrice2 = calculateTotalRentPrice2(pickUpModel, startDate2, endDate2);
      result.innerHTML += `<br>Total price of pick up rental ${pickUpModel} for reserved days: ${totalPrice2} dollars`;

      // تابع setTimeout برای انجام عملیاتی که باید بعد از یک روز انجام شود (بازگرداندن ماشین به لیست)
      setTimeout(function () {
        returnPickUp(pickUpModel); // تابعی که ماشین را به لیست باز می‌گرداند
      }, expirationDate.getTime() - Date.now()); // محاسبه زمان باقی‌مانده تا انقضای رزرو

      return true;
    } else {
      containerPart1.style.display = "none";
      containerPickUp.style.display = "none";
      if (startDate2 >= endDate2) {
        result.innerHTML = "Error: End date must be after start date.";
      } else {
        result.innerHTML = `Unfortunately, the pick up model ${pickUpModel} is not available at the moment.`;
      }
      return false;
    }
  } else {
    // تاریخ انتخاب شده توسط کاربر نامعتبر است
    result.innerHTML = "Error: Please select a valid reservation date.";
  }
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

// محاسبه قیمت کل کرایه ماشین برای روز‌های رزرو شده
function calculateTotalRentPrice(carModel, startDate, endDate) {
  const rentalPrices = {
    "benz-cls": 110,
    "benz-E350": 100,
    "bmw-528": 100,
    "bmw-i8": 200,
    "bmw-x6": 105,
    "porsche-91": 110,
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

  return totalPrice;
}

function calculateTotalRentPrice1(vanModel, startDate1, endDate1) {

  const rentalPrices1 = {
    "ford-cargo": 200,
    "ford-passenger": 250,
    "Volkswagen_Crafter": 220,
    "Ford-Dropside": 180,
    "ford-curtain": 200,
    "ford-connect": 160,
  };

  // تعداد روزهای رزرو شده
  const oneDay = 24 * 60 * 60 * 1000; // میلی ثانیه در یک روز
  const start = new Date(startDate1);
  const end = new Date(endDate1);
  const days = Math.round(Math.abs((end - start) / oneDay));

  // محاسبه قیمت کل کرایه
  const dailyPrice = rentalPrices1[vanModel];
  const totalPrice1 = dailyPrice * days;

  return totalPrice1;
}

function calculateTotalRentPrice2(pickUpModel, startDate2, endDate2) {

  const rentalPrices2 = {
    "dodge-ram-1": 200,
    "dodge-ram-2": 180,
    "ford-f150": 180,
    "ford-maverick": 160,
    "toyota-tacoma": 160,
    "toyota-hilux": 160,
  };

  // تعداد روزهای رزرو شده
  const oneDay = 24 * 60 * 60 * 1000; // میلی ثانیه در یک روز
  const start = new Date(startDate2);
  const end = new Date(endDate2);
  const days = Math.round(Math.abs((end - start) / oneDay));

  // محاسبه قیمت کل کرایه
  const dailyPrice = rentalPrices2[pickUpModel];
  const totalPrice2 = dailyPrice * days;

  return totalPrice2;
}
