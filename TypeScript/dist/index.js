"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person = (student) => {
    const { person, studentId, grade, className } = student;
    const { firstName, lastName, age = 20, isStudent } = person;
    if (isStudent) {
        console.log(`Hello! my name is ${firstName} ${lastName}, i'm ${age} years old.`);
        console.log(`your studying in class: ${className} at a grade: ${grade} with student ID: ${studentId}.`);
    }
};
person({
    person: {
        firstName: 'saeed',
        lastName: 'saeedyan',
        isStudent: true
    },
    studentId: 1374,
    grade: 10,
    className: 'A2'
});
function checkAccess(role) {
    if (role === 'admin') {
        console.log('Full access');
    }
    else {
        console.log('Access restrictions');
    }
}
checkAccess('guest');
// وقتی const تعریف می‌کنی، اون مقدار به صورت literal شناخته میشه
// const status = "success";
// اما با let
//let status1 = "success";  // نوعش: string (نه literal)
// مگر اینکه خودت بنویسی
//let status3: "success" = "success";
// تعریف نوع کاربر با symbol و bigint
// ایجاد کاربران
const user1 = {
    name: 'ali',
    id: Symbol('userId1'),
    wallet: 900719925474099100000n,
};
const user2 = {
    name: 'sara',
    id: Symbol('userId2'),
    wallet: 500000000000000000000n,
};
function printUserInfo(user) {
    console.log(`
        👤 Name: ${user.name}
        🆔 ID (hidden): ${user.id.toString()}
        💰 Wallet: ${user.wallet} Rials
        --------------------------------
        `);
}
printUserInfo(user1);
printUserInfo(user2);
let ukn = 12;
ukn = 'str';
ukn = {
    greeting: () => console.log("hi what's up bro !!!")
};
function printUnknwn(item) {
    if (typeof item === "object" && item !== null && 'greeting' in item) {
        item.greeting();
    }
}
printUnknwn(ukn);
// تایپ never هیچ وقت اتفاق نمی افتد
// مخصوص توابعی است که پایان ندارند یا throw می کنند
// در switch-case هم برای چک کردن کامل بودن همه ی حالت ها کاربرد دارد
// در پایین مثال سوییچ کیس را می آورم
function getArea(shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.side * shape.side;
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
const square = { kind: 'square', side: 3 };
const circle = { kind: 'circle', radius: 3 };
// اگر مستطیل را از حالت کامنت خارج کنم پیام خطا در هنگام کامپایل می دهد
// چون کیس مستطیل در سویچ هنوز تعریف نشده
// const rectangle: Shape = {kind: 'rectangle', side: 3};
console.log(getArea(square));
console.log(getArea(circle));
// console.log(getArea(rectangle));
let y = undefined;
let z = null;
// مودیفایر readonly برای آرایه هایی است که فقط خوانده می شوند و نمی توان آن ها را تغییر داد
// وقتی تایپ آرایه را استرینگ تعیین می کنیم یعنی همه ی آیتم ها باید استرینگ باشند
const listOfName = ['dylan'];
// تعیین تایپ آرایه در بالا به صورت صریح یا اکسپلیست می باشد
// در پایین تعیین نوع آرایه به صورت ضمنی یا ایمپلیست انجام می شود
const listOfNum = [1, 2];
// تعریف آرایه به صورت تاپل یا چند تایی tuple array
const listOfThings = [12, 'saeed'];
// به آرایه ی تاپل نمی توان آیتم جدید یا تایپ جدید داد
// listOfThings.push(true); //اشتباه است چون از قبل تعریف نشده است
// یعنی هنگام ران تایم اجرا می شود ولی در کامپایل نه. برای جلوگیری از این ایراد از رید اونلی استفاده کن
// اگر می خواهی یک آرایه با تایپ عناصر مختلف باشد و امکان حذف و اضافه داشته باشی
const listOfThings2 = ['str', 12];
listOfThings2.push('24');
function getResult() {
    return [true, 'The operation is successful.'];
}
;
// در زیر تخریب یا Destructuring تاپل را انجام می دهیم
const [success, message] = getResult();
console.log(success);
console.log(message);
// TypeScript Object Types
const car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
// مقداردهی به صورت ایمپلیست
const car1 = {
    type: "Toyota",
};
// در مثال های بالا وارد کردن مقدار ویژگی ها اجباری است. با گذاشتن؟ اختیاری می شود
const car2 = {
    type: "Toyota",
    model: "Corolla"
};
const nameAgeMap = {};
nameAgeMap.jack = 22;
console.log(nameAgeMap);
// TypeScript Enums
// Numeric Enums در این نوع آیتم اول مقدار صفر می گیرد و به ازای آیتم های بعدی یک واحد افزیش میابد
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 0] = "North";
    CardinalDirections[CardinalDirections["East"] = 1] = "East";
    CardinalDirections[CardinalDirections["South"] = 2] = "South";
    CardinalDirections[CardinalDirections["West"] = 3] = "West";
})(CardinalDirections || (CardinalDirections = {}));
let currentDirection = CardinalDirections.North;
console.log(currentDirection);
console.log('-------------------');
// می شود مقدار آیتم ها را تغییر داد ولی باز هم به آیتم بعدی یکی اضافه می شود
var CardinalDirections2;
(function (CardinalDirections2) {
    CardinalDirections2[CardinalDirections2["North"] = 1] = "North";
    CardinalDirections2[CardinalDirections2["East"] = 2] = "East";
    CardinalDirections2[CardinalDirections2["South"] = 5] = "South";
    CardinalDirections2[CardinalDirections2["West"] = 6] = "West";
})(CardinalDirections2 || (CardinalDirections2 = {}));
;
console.log(CardinalDirections2.North);
console.log(CardinalDirections2.East);
console.log(CardinalDirections2.South);
console.log(CardinalDirections2.West);
// String Enums
var CardinalDirections3;
(function (CardinalDirections3) {
    CardinalDirections3["North"] = "North";
    CardinalDirections3["East"] = "East";
    CardinalDirections3["South"] = "South";
    CardinalDirections3["West"] = "West";
})(CardinalDirections3 || (CardinalDirections3 = {}));
;
console.log(CardinalDirections3.North);
// نکته: پیشنهاد می شود مقادیر نامریک و استرینگ اینام ها را با هم ترکیب نکنید
// Interfaces
const car3 = {
    brand: 'Toyota',
    model: 'camry',
    year: 2024,
    type: 'sport'
};
console.log(car3);
// typeScript function
function getDate() { return new Date().getDate(); }
console.log(getDate());
function printHello() { console.log('hi there!'); }
;
printHello();
function sum(a, b, c = 10) { console.log(a + b + c); }
;
sum(2, 4);
function sum1(a, b, c) { console.log(a + b + (c || 10)); }
;
sum1(4, 4);
function sum2({ a, b }) { console.log(a + b); }
;
sum2({ a: 4, b: 4 });
// rest oprator
function sum3(...numSum) { console.log(numSum.reduce((a, b) => a + b, 0)); }
;
sum3(1, 2, 3, 4);
// seprade oprator
function sum4(numSum) { console.log(numSum.reduce((a, b) => a + b, 0)); }
;
const arr0 = [3, 4];
const arr1 = [...arr0, 1, 3];
sum4(arr1);
const neg = (item) => item * -1;
console.log(neg(1));
const goodBye = 'good bye!';
console.log(goodBye);
const hello = 'hello!';
console.log(hello); //این روش در فایل های tsx کار نمی کند
// Force casting
const name = 'masoud';
console.log(name);
console.log(typeof name);
class Identity {
    constructor(fName, lName) {
        this.fName = fName;
        this.lName = lName;
    }
    /**
     * getFName
     */
    getFName() {
        return this.fName;
    }
    getLName() {
        return this.lName;
    }
}
const client = new Identity('sasan', 'asgary');
console.log(`i'm ${client.getFName()} ${client.getLName()}`);
// می توان بعد از implements چندین اینترفیس را بعد کاما نوشت
class RectangleArea {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    ;
    toString() {
        return `Rectangle [ width = ${this.width}  height = ${this.height}.]`;
    }
    ;
}
const rect = new RectangleArea(5, 4);
console.log(rect.getArea());
class SquareArea extends RectangleArea {
    constructor(width) {
        super(width, width);
    }
    toString() {
        return `Square [ width = ${this.width}  height = ${this.height}.]`;
    }
    ;
}
// :برای بازنویسی یک متد والد قراردادن اور راید اختیاری است و نوشتن آن فوایدی دارد و بهتر است بنویسی
// مثلا اگر نام متد را اشتباه بنویسی یا اصلا همچین متدی در کلاس والد نباشد ارور می دهد
const sqr = new SquareArea(5);
console.log(sqr.getArea());
console.log(sqr.toString());
// Abstract Classes
class Polygon {
}
class Triangle extends Polygon {
    constructor(h, b) {
        super();
        this.h = h;
        this.b = b;
    }
    getArea() {
        return (this.b * this.h) / 2;
    }
}
const trl = new Triangle(10, 5);
console.log(`Triangle Area is ${trl.getArea()}`);
// TypeScript Basic Generics
function createPair(v1, v2) {
    return [v1, v2];
}
console.log(createPair(10, 12));
class NamedValue {
    constructor(name) {
        this.name = name;
    }
    /**
     * setValue
     */
    setValue(value) {
        this._value = value;
    }
    toString() {
        return `${this.name}: ${this._value}.`;
    }
}
let signValue = new NamedValue("salar");
signValue.setValue(20);
console.log(signValue.toString());
let wrapp = { value: 12, name: 'samira' };
console.log(wrapp);
let wrapp1 = { value: 'one', name: 'samira' };
console.log(wrapp1);
// extends
let fullNameAndSurname = (f, l) => {
    return `hi this is ${f} ${l}`;
};
console.log(fullNameAndSurname('saeed', 'saeedyan'));
//Partial تمام پراپرتی ها را به حالت اختیاری تغییر می دهد
let point0 = {};
point0.b = 12;
console.log(point0);
// Required تمام پراپرتی ها را به حالت ضروری تغییر می دهد
let point1 = { a: 10, b: 12 };
console.log(point1);
// Record یک شرت کات برای تعریف تایپ یک آبجکت با مشخص کردن تایپ کلید و تایپ مقدار
// Record<string, number> is equivalent to { [key: string]: number }
let point2 = {
    'saeed': 29,
    'mana': 14
};
console.log(point2);
// Omit حذف  کلید هایی از تایپ آبجکت
const omid = { name: 'omid' };
console.log(omid);
// Pick یک کلید از تایپ آبجکت را انتخاب می کند و مابقی را حذف می کند
const sina = { name: 'sina' };
console.log(sina);
// Exclude تایپ مشخص شده از یونیون های متغیر حذف می شود
const primitivePrint = true;
console.log(primitivePrint);
// Readonly بعد از مقداردهی قابل تغییر نیست و فقط خوانده می شود
const onlyR = {
    name01: 'sasan',
    age: 55,
};
console.log(onlyR);
// Parameters تایپ ورودی های یک تابع را به صورت یک آرایه ی تاپل ذخیره می کند
const printer = {
    a: 5,
    b: 10
};
console.log(printer);
function great01(name, age) {
    console.log(`your name is ${name} and you'r ${age} years old.`);
}
function great02(...arg) {
    return `your name is ${arg[0]} and you'r ${arg[1]} years old.`;
}
console.log(great02('shahin', 12));
function sumAll(a, b) {
    return a * b;
}
function sumPrint(a) {
    console.log(a);
}
sumPrint(45);
let family = {
    father: 'javad',
    mother: 'mahvash',
    brother: 'mohammad',
    mySelf: 'saeed'
};
function printFamilyProperty(item, itemKey) {
    console.log(`Printing person property ${itemKey}: "${item[itemKey]}"`);
}
printFamilyProperty(family, 'mother');
function setFamily(key, value) {
    return { [key]: value };
}
console.log(setFamily("brother", "mardin"));
function setFamily01(family) {
    let { father, doughter } = family;
    let grandSon = doughter?.son;
    if (grandSon !== undefined) {
        console.log(`${father} have a grand son, his name is ${grandSon}.`);
    }
    else {
        console.log(`you don't have grand son.`);
    }
}
let family1 = {
    father: 'mohammad',
    doughter: {
        name: 'mahvash',
        son: undefined
    }
};
setFamily01(family1);
// Nullish Coalescence
function printMileage(value) {
    console.log(`Mileage your car is ${value ?? 'not available'}`);
}
printMileage(null);
// Null Assertion
function getLength(item) {
    return item.length;
}
console.log(getLength('hello'));
// Array bounds handling
// برخلاف زبان های دیگر در تی اس و جی اس دسترسی به ایندکس خارج از محدوده آرایه خطا نمی دهد و مقدار آندیفایند می دهد
// برای رفع این مشکل از کاندیشن یا آپشنال چینینگ استفاده می کنیم
let arr2 = ['saeed', 'mohammad'];
// در خط پایین باید خطا بدهد ولی بدلیل استفاده از اوپراتور آندیفایند را برمی گرداند
console.log(arr2[3]?.toUpperCase());
function checkArr(item) {
    if (item !== undefined) {
        console.log(item);
    }
    else {
        console.log('your index is out of bounds!');
    }
}
checkArr(arr2[3]);
let blue = "main - black - #000000";
console.log(blue);
let extractBlue = "000000";
console.log(extractBlue);
let classA = {
    name: "morad",
    age: '20',
    dynamic_grade: "14"
};
console.log(classA);
let event = {
    onClick: 'clicked',
    onHover: 'hovered',
    onScroll: 'scrolled'
};
console.log(event);
