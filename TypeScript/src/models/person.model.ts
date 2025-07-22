export type Person = {
    firstName: string
    lastName: string
    age?: number //علامت سوال یعنی این پراپرتی آپشنال شد و وجود آن اختیاری است
    isStudent: boolean
};
//تایپ any یعنی هر نوع داده ای را می توان به متغیر داد
//تایپ unknown یک جایگزین مشابه و ایمن تر برای انی

export type Student = {
    person: Person
    studentId: number
    grade: number
    className: string
};

export type User = {
    name: string
    id: symbol
    wallet: bigint
};

export type Shape =
    | { kind: 'circle', radius: number }
    // | { kind: 'rectangle', side: number }
    | { kind: 'square', side: number };

// اینترفیس هم مانند تایپ است ولی فقط برای تعریف تایپ آبجکت کاربرد دارد
export interface Car {
    brand: string;
    model: string;
    year: number;
};

export interface CompleteCar extends Car {type: string};