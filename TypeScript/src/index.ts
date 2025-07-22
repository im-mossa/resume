import { Student, User, Shape, CompleteCar } from "./models/person.model";
const person = (student: Student) => {
    const { person, studentId, grade, className } = student
    const { firstName, lastName, age = 20, isStudent } = person
    if (isStudent) {
        console.log(`Hello! my name is ${firstName} ${lastName}, i'm ${age} years old.`);
        console.log(`your studying in class: ${className} at a grade: ${grade} with student ID: ${studentId}.`);
    }
}
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
//ترکیب مفهوم Literal و Union و Narrowing
type Role = 'admin' | 'user' | 'guest';
function checkAccess(role: Role) {
    if (role === 'admin') {
        console.log('Full access');
    } else {
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
const user1: User = {
    name: 'ali',
    id: Symbol('userId1'),
    wallet: 900719925474099100000n,
}
const user2: User = {
    name: 'sara',
    id: Symbol('userId2'),
    wallet: 500000000000000000000n,
}
function printUserInfo(user: User) {
    console.log(`
        👤 Name: ${user.name}
        🆔 ID (hidden): ${user.id.toString()}
        💰 Wallet: ${user.wallet} Rials
        --------------------------------
        `);
}
printUserInfo(user1);
printUserInfo(user2);

let ukn: unknown = 12;
ukn = 'str';
ukn = {
    greeting: () => console.log("hi what's up bro !!!")
}
function printUnknwn(item: unknown) {
    if (typeof item === "object" && item !== null && 'greeting' in item) {
        (item as any).greeting();
    }
}
printUnknwn(ukn);
// تایپ never هیچ وقت اتفاق نمی افتد
// مخصوص توابعی است که پایان ندارند یا throw می کنند
// در switch-case هم برای چک کردن کامل بودن همه ی حالت ها کاربرد دارد
// در پایین مثال سوییچ کیس را می آورم
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.side * shape.side;

        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
const square: Shape = { kind: 'square', side: 3 };
const circle: Shape = { kind: 'circle', radius: 3 };
// اگر مستطیل را از حالت کامنت خارج کنم پیام خطا در هنگام کامپایل می دهد
// چون کیس مستطیل در سویچ هنوز تعریف نشده
// const rectangle: Shape = {kind: 'rectangle', side: 3};
console.log(getArea(square));
console.log(getArea(circle));
// console.log(getArea(rectangle));
let y: undefined = undefined;
let z: null = null;
// مودیفایر readonly برای آرایه هایی است که فقط خوانده می شوند و نمی توان آن ها را تغییر داد
// وقتی تایپ آرایه را استرینگ تعیین می کنیم یعنی همه ی آیتم ها باید استرینگ باشند
const listOfName: readonly string[] = ['dylan'];
// تعیین تایپ آرایه در بالا به صورت صریح یا اکسپلیست می باشد
// در پایین تعیین نوع آرایه به صورت ضمنی یا ایمپلیست انجام می شود
const listOfNum = [1, 2];
// تعریف آرایه به صورت تاپل یا چند تایی tuple array
const listOfThings: [number, string] = [12, 'saeed'];
// به آرایه ی تاپل نمی توان آیتم جدید یا تایپ جدید داد
// listOfThings.push(true); //اشتباه است چون از قبل تعریف نشده است
// یعنی هنگام ران تایم اجرا می شود ولی در کامپایل نه. برای جلوگیری از این ایراد از رید اونلی استفاده کن
// اگر می خواهی یک آرایه با تایپ عناصر مختلف باشد و امکان حذف و اضافه داشته باشی
const listOfThings2: (number | string)[] = ['str', 12];
listOfThings2.push('24');
// تاپل های نامگذاری شده
type Result = [success: boolean, message: string];
function getResult(): Result {
    return [true, 'The operation is successful.'];
};
// در زیر تخریب یا Destructuring تاپل را انجام می دهیم
const [success, message] = getResult();
console.log(success);
console.log(message);
// TypeScript Object Types
const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
// مقداردهی به صورت ایمپلیست
const car1 = {
    type: "Toyota",
};
// در مثال های بالا وارد کردن مقدار ویژگی ها اجباری است. با گذاشتن؟ اختیاری می شود
const car2: { type: string, model?: string } = {
    type: "Toyota",
    model: "Corolla"
};
const nameAgeMap: { [item: string]: number } = {};
nameAgeMap.jack = 22;
console.log(nameAgeMap);
// TypeScript Enums
// Numeric Enums در این نوع آیتم اول مقدار صفر می گیرد و به ازای آیتم های بعدی یک واحد افزیش میابد
enum CardinalDirections {
    North,
    East,
    South,
    West
}
let currentDirection = CardinalDirections.North;
console.log(currentDirection);
console.log('-------------------');
// می شود مقدار آیتم ها را تغییر داد ولی باز هم به آیتم بعدی یکی اضافه می شود
enum CardinalDirections2 {
    North = 1,
    East,
    South = 5,
    West
};
console.log(CardinalDirections2.North);
console.log(CardinalDirections2.East);
console.log(CardinalDirections2.South);
console.log(CardinalDirections2.West);
// String Enums
enum CardinalDirections3 {
    North = 'North',
    East = 'East',
    South = 'South',
    West = 'West'
};
console.log(CardinalDirections3.North);
// نکته: پیشنهاد می شود مقادیر نامریک و استرینگ اینام ها را با هم ترکیب نکنید
// Interfaces
const car3: CompleteCar = {
    brand: 'Toyota',
    model: 'camry',
    year: 2024,
    type: 'sport'
}
console.log(car3);
// typeScript function
function getDate(): number { return new Date().getDate() }
console.log(getDate());
function printHello(): void { console.log('hi there!') };
printHello();
function sum(a: number, b: number, c: number = 10) { console.log(a + b + c) };
sum(2, 4);
function sum1(a: number, b: number, c?: number) { console.log(a + b + (c || 10)) };
sum1(4, 4);
function sum2({ a, b }: { a: number, b: number }) { console.log(a + b) };
sum2({ a: 4, b: 4 });
// rest oprator
function sum3(...numSum: number[]) { console.log(numSum.reduce((a, b) => a + b, 0)) };
sum3(1, 2, 3, 4);
// seprade oprator
function sum4(numSum: number[]) { console.log(numSum.reduce((a, b) => a + b, 0)) };
const arr0 = [3, 4];
const arr1 = [...arr0, 1, 3];
sum4(arr1);
type Negative = (item: number) => number;
const neg: Negative = (item) => item * -1;
console.log(neg(1));
const goodBye: unknown = 'good bye!';
console.log(goodBye as string);
const hello: unknown = 'hello!';
console.log(<string>hello); //این روش در فایل های tsx کار نمی کند
// Force casting
const name: any = 'masoud' as unknown as string;
console.log(name);
console.log(typeof name);
class Identity {
    private readonly fName: string;
    private readonly lName: string;
    public constructor(fName: string, lName: string) {
        this.fName = fName;
        this.lName = lName;
    }
    /**
     * getFName
     */
    public getFName(): string {
        return this.fName
    }
    public getLName(): string {
        return this.lName
    }
}
const client = new Identity('sasan', 'asgary');
console.log(`i'm ${client.getFName()} ${client.getLName()}`);
interface Rectangle {
    getArea: () => number;
}
// می توان بعد از implements چندین اینترفیس را بعد کاما نوشت
class RectangleArea implements Rectangle {
    constructor(protected readonly width: number, protected readonly height: number) { }
    public getArea(): number {
        return this.width * this.height;
    };
    public toString(): string {
        return `Rectangle [ width = ${this.width}  height = ${this.height}.]`;
    };
}
const rect = new RectangleArea(5, 4);
console.log(rect.getArea());
class SquareArea extends RectangleArea {
    public constructor(width: number) {
        super(width, width);
    }
    public override toString(): string {
        return `Square [ width = ${this.width}  height = ${this.height}.]`;
    };
}
// :برای بازنویسی یک متد والد قراردادن اور راید اختیاری است و نوشتن آن فوایدی دارد و بهتر است بنویسی
// مثلا اگر نام متد را اشتباه بنویسی یا اصلا همچین متدی در کلاس والد نباشد ارور می دهد
const sqr = new SquareArea(5);
console.log(sqr.getArea());
console.log(sqr.toString());
// Abstract Classes
abstract class Polygon {
    public abstract getArea(): number;
}
class Triangle extends Polygon {
    constructor(protected h: number, protected b: number) {
        super();
    }
    public override getArea(): number {
        return (this.b * this.h) / 2;
    }
}
const trl = new Triangle(10, 5);
console.log(`Triangle Area is ${trl.getArea()}`);
// TypeScript Basic Generics
function createPair<T, S>(v1: T, v2: S): [T, S] {
    return [v1, v2];
}
console.log(createPair<number, number>(10, 12));
class NamedValue<T> {
    private _value: T | undefined;
    constructor(private name: string) { }
    /**
     * setValue
     */
    public setValue(value: T) {
        this._value = value;
    }
    public toString(): string {
        return `${this.name}: ${this._value}.`;
    }
}
let signValue = new NamedValue<number>("salar");
signValue.setValue(20);
console.log(signValue.toString());
// Default Value
type wrapper<T, S = string> = { value: T, name: S };
let wrapp: wrapper<number, string> = { value: 12, name: 'samira' };
console.log(wrapp);
let wrapp1: wrapper<string> = { value: 'one', name: 'samira' };
console.log(wrapp1);
// extends
let fullNameAndSurname = <T extends string | number, S extends string | number>(f: T, l: S) => {
    return `hi this is ${f} ${l}`;
}
console.log(fullNameAndSurname('saeed', 'saeedyan'));
// TypeScript Utility Types
interface Point0 {
    a: number;
    b: number;
}
//Partial تمام پراپرتی ها را به حالت اختیاری تغییر می دهد
let point0: Partial<Point0> = {}
point0.b = 12;
console.log(point0);
interface Point1 {
    a?: number;
    b?: number;
}
// Required تمام پراپرتی ها را به حالت ضروری تغییر می دهد
let point1: Required<Point1> = { a: 10, b: 12 }
console.log(point1);
// Record یک شرت کات برای تعریف تایپ یک آبجکت با مشخص کردن تایپ کلید و تایپ مقدار
// Record<string, number> is equivalent to { [key: string]: number }
let point2: Record<string, number> = {
    'saeed': 29,
    'mana': 14
}
console.log(point2);
interface Person01 {
    name: string;
    age: number;
    location?: string;
}
// Omit حذف  کلید هایی از تایپ آبجکت
const omid: Omit<Person01, 'age' | 'location'> = { name: 'omid' };
console.log(omid);
interface Person02 {
    name: string;
    age: number;
    location?: string;
}
// Pick یک کلید از تایپ آبجکت را انتخاب می کند و مابقی را حذف می کند
const sina: Pick<Person02, 'name'> = { name: 'sina' };
console.log(sina);
type Primitive = string | number | boolean;
// Exclude تایپ مشخص شده از یونیون های متغیر حذف می شود
const primitivePrint: Exclude<Primitive, 'string'> = true;
console.log(primitivePrint);
interface OnlyR {
    name01: string;
    age: number;
}
// Readonly بعد از مقداردهی قابل تغییر نیست و فقط خوانده می شود
const onlyR: Readonly<OnlyR> = {
    name01: 'sasan',
    age: 55,
}
console.log(onlyR);
type PointPrinter = (p: { a: number, b: number }) => void;
// Parameters تایپ ورودی های یک تابع را به صورت یک آرایه ی تاپل ذخیره می کند
const printer: Parameters<PointPrinter>[0] = {
    a: 5,
    b: 10
}
console.log(printer);
function great01(name: string, age: number): void {
    console.log(`your name is ${name} and you'r ${age} years old.`);
}
type greatType = Parameters<typeof great01>;
function great02(...arg: greatType) {
    return `your name is ${arg[0]} and you'r ${arg[1]} years old.`;
}
console.log(great02('shahin', 12));
function sumAll(a: number, b: number): number {
    return a * b;
}
// ReturnType تایپ خروجی یک تابع را می گیرد
type sumPlus = ReturnType<typeof sumAll>;
function sumPrint(a: sumPlus): void {
    console.log(a);
}
sumPrint(45);
// TypeScript Keyof
interface FamilyScale {
    father: string;
    mother: string;
    brother: string;
    mySelf: string;
}
let family = {
    father: 'javad',
    mother: 'mahvash',
    brother: 'mohammad',
    mySelf: 'saeed'
}
function printFamilyProperty(item: FamilyScale, itemKey: keyof FamilyScale) {
    console.log(`Printing person property ${itemKey}: "${item[itemKey]}"`);
}
printFamilyProperty(family, 'mother');
interface Family01 {
    [key: string]: unknown
}
function setFamily(key: keyof Family01, value: string): Family01 {
    return { [key]: value }
}
console.log(setFamily("brother", "mardin"));
// Optional Chaining
interface Family02 {
    father: string;
    doughter?: {
        name: string;
        son?: string;
    }
}
function setFamily01(family: Family02) {
    let { father, doughter } = family
    let grandSon: string | undefined = doughter?.son
    if (grandSon !== undefined) {
        console.log(`${father} have a grand son, his name is ${grandSon}.`);
    } else {
        console.log(`you don't have grand son.`);
    }
}
let family1: Family02 = {
    father: 'mohammad',
    doughter: {
        name: 'mahvash',
        son: undefined
    }
}
setFamily01(family1);
// Nullish Coalescence
function printMileage(value: number | null | undefined): void {
    console.log(`Mileage your car is ${value ?? 'not available'}`);
}
printMileage(null);
// Null Assertion
function getLength(item: string | undefined) {
    return item!.length;
}
console.log(getLength('hello'));
// Array bounds handling
// برخلاف زبان های دیگر در تی اس و جی اس دسترسی به ایندکس خارج از محدوده آرایه خطا نمی دهد و مقدار آندیفایند می دهد
// برای رفع این مشکل از کاندیشن یا آپشنال چینینگ استفاده می کنیم
let arr2: string[] = ['saeed', 'mohammad'];
// در خط پایین باید خطا بدهد ولی بدلیل استفاده از اوپراتور آندیفایند را برمی گرداند
console.log(arr2[3]?.toUpperCase());

function checkArr(item: string | undefined): void {
    if (item !== undefined) {
        console.log(item);
    } else {
        console.log('your index is out of bounds!');
    }
}
checkArr(arr2[3]);
// Template Literal Types 
type ColorHexMap = {
    blue: '0000ff';
    white: 'ffffff';
    black: '000000';
}
type ColorHex<T extends keyof ColorHexMap> = `#${ColorHexMap[T]}`;
type ColorLabel<T extends keyof ColorHexMap> = `main - ${T} - ${ColorHex<T>}`;
let blue: ColorLabel<'black'> = "main - black - #000000";
console.log(blue);
// use infer
type ExtractHex<T> = T extends `main - ${string} - #${infer S}` ? S : never;
let extractBlue: ExtractHex<"main - black - #000000"> = "000000";
console.log(extractBlue);
//Index Signature Labels
type listOfUser = {
    name: string;  //کلید مشخص
    [key: string]: string;  //Index Signature Labels
} & {
    [K in `dynamic_${string}`]: string;  //Mapped Types
};
let classA: listOfUser = {
    name: "morad",
    age: '20',
    dynamic_grade: "14"
}
console.log(classA);
//Mapped Types
type EventNames = 'click' | 'hover' | 'scroll';
type EventHandlers = {
    readonly [k in EventNames as `on${Capitalize<k>}`]: string;
}
let event: EventHandlers = {
    onClick: 'clicked',
    onHover: 'hovered',
    onScroll: 'scrolled'
}
console.log(event);