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
// تعیین تایپ آرایه در بالا به صورت ریح یا اکسپلیست می باشد
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
    public constructor(width: number){
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