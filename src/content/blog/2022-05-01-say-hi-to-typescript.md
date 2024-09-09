---
slug: say-hi-to-typescript
title: สวัสดี Typescript
description: Typescript ดียังไง? จะใช้ยังไง? มี Type อะไรบ้าง? ไปดูกัน
image: /assets/image/post/say-hi-to-typescript/heading.jpg
date: 2022-04-30T17:00:00.000Z
category: language
tags:
  - javascript
  - typescript
---

### Contents

# Introduction

ภาษา JavaScript เป็นภาษาที่ใครหลาย ๆ คน รวมถึงผู้เขียนชื่นชอบเพราะว่าเขียนง่ายสนุกดี แถมรันได้เร็วด้วย แต่บางครั้งผู้เขียนรู้สึกเบื่อ ไม่ชอบมัน เพราะด้วยความง่าย ทำให้เรามองไม่เห็นปัญหาหลายอย่างจนต้องตามแก้อยู่นาน

ต่อมา ผู้เขียนก็ได้เรียนรู้ภาษาหนึ่ง ที่ทำให้กลับมารักโลก JavaScript อีกครั้งหนึ่งซึ่งก็คือ **TypeScript** ที่จะพูดถึงในบทความนี้นั่นแหละ

# ปัญหาของการใช้ JavaScript

ภาษา Javascript เป็นภาษาที่มีการกำหนด Type แบบ Dynamic Type ดังนั้น เวลาเราสร้างตัวแปรตัวหนึ่ง เราไม่ต้องใส่ Type ให้มัน เราจะใส่ค่าให้มันยังไงก็ได้ จะเป็นตัวอักษร ตัวเลข อาร์เรย์ Object หรือแม้แต่ เป็นฟังก์ชัน ก็ได้หมด ในเวลาไหนก็ได้ด้วย

```javascript
let variable
variable = 'Hello'
variable = 1
variable = []
variable = {
  name: 'John'
}
variable = function () {
  return 'Hello'
}
```

ข้อดีของมัน คือ เขียนโค้ดง่าย มีอิสระ ความยืดหยุ่นสูง ทำให้สร้างโปรแกรมได้รวดเร็ว เพราะไม่ต้องวุ่นวายเรื่องการกำหนด Type ให้เสียเวลา แต่ความง่ายของมัน ก็ทำให้เกิดปัญหาและความยุ่งยากได้ง่ายเช่นกัน

การที่ไม่มี Type กำกับตัวแปร ก็ทำให้เราต้องทำความเข้าใจ Structure และการใช้ตัวแปรต่าง ๆ ผ่านโค้ด ซึ่งทำให้เสียเวลามาก ยิ่งโปรแกรมใหญ่ ๆ ที่มีโค้ดซับซ้อน ก็ยิ่งใช้เวลาอ่านทำความเข้าใจมากด้วย อีกทั้งก็ยิ่งทำให้เกิดการเขียนโค้ดผิดพลาดจนทำให้เกิด Bug เยอะขึ้น

ด้วยความที่ Javascript เป็นภาษาประเภท Interpreted Language ไม่ใช่ Compiled Language เราจะไม่มีทางรู้ว่า _โปรแกรมที่เราเขียนมีปัญหาอะไรหรือเปล่า_ จนกระทั่งเราสั่งรันโปรแกรม

![Error ของ JavaScript ที่เกิดบนเว็บไซต์](/assets/image/post/say-hi-to-typescript/01.png)

ขอยกตัวอย่างปัญหาที่เจอบ่อย ๆ

ฟังก์ชันบวกเลขง่าย ๆ

```javascript
function add(a, b) {
  return a + b
}
```

เราดันเรียกใช้ตัวหนึ่งเป็น string

```
add(1, '2')
```

เมื่อรันโปรแกรม ก็ได้ผลลัพธ์คือ '12' เป็น string กรณีนี้ถือว่าเป็น Logical Error ซึ่งเราไม่อยากให้เกิด

อีกกรณีหนึ่ง คือ เผลอใช้ข้อมูลใน Object ที่ตัว Object ถูกเปลี่ยนค่าไปแล้ว อย่างโค้ดนี้

```javascript
let a = {
  name: 'John'
}

a = null

console.log(a.name)
```

พอรันโปรแกรม เมื่อทำงานถึงบรรทัดที่มี `console.log(a.name)` มันก็ฟ้อง Error อย่างตัวอย่างโค้ดด้านบนเมื่อรันจะเกิด Error ว่า `TypeError: Cannot read property 'name' of null`

จะเห็นได้ว่า JavaScript มันจะรันโปรแกรมโดยไม่ตรวจค่าให้ มันจะอ่านคำสั่งและประมวลผลไปเรื่อย ๆ ถ้ามี Error ค่อยแสดงขึ้นมาให้เห็น ดังนั้นจะมีโอกาสหลุดขึ้นไป Production ถ้าเราไม่ตรวจสอบให้ดี ๆ

Error ทั้งสองข้อนี้ ถ้าเกิดกับโปรเจคเล็ก ๆ เราจะหาต้นตอได้ไม่ยาก แต่ถ้าเกิดกับโปรเจคใหญ่ ๆ การหาต้นตออาจจะใช้เวลานาน เพราะไม่มีตัวชี้ตำแหน่งชัดเจน บางทีก็ต้องใช้ Debugger ช่วย

# Typescript คืออะไร? ใช้ Typescript แล้วดียังไง?

TypeScript ได้ถูกสร้างและพัฒนาโดย **Microsoft** เพื่อแก้ปัญหาของ JavaScript ซึ่งเหมาะที่จะใช้ในโปรเจคขนาดใหญ่

TypeScript เป็นภาษา Superset ของ JavaScript หมายความว่า โค้ดในภาษา JavaScript ทุกอย่างจะใช้ได้ใน TypeScript เพียงแต่ช่วยเพิ่ม Type system เข้าไปทำให้การเขียนโปรแกรมของเราดีขึ้น

แล้วดีขึ้นยังไง?

**1. ข้อนี้แน่นอนที่สุด คือ ช่วยลดการเกิด Error พวก `TypeError` ตอนโปรแกรมทำงาน**

เมื่อเราสั่งรันโปรแกรม เราจะต้องใช้ Compiler ของ TypeScript เราจะเห็น Error ตั้งแต่แรกเมื่อเราเขียนผิด ยิ่งถ้าใช้ Editor อย่างเช่น VSCode ก็จะขึ้นให้เราเห็นโดยที่เราไม่ต้องทำอะไรเลย

![การแสดง Error ของ Typescript](/assets/image/post/say-hi-to-typescript/02.png)

**2. โค้ดมีคุณภาพขึ้น**

การมี Type กำกับตัวแปร จะทำให้เราเข้าใจได้ทันทีว่าตัวแปรนั้นใช้เก็บค่าอะไร ส่งผลให้เข้าใจการทำงานในส่วนที่เกี่ยวข้องภายในเวลารวดเร็ว

**3. มี Auto Complete**

Code Editor อย่าง VSCode ก็มี Auto Complete ที่เมื่อเราพิมพ์จุด (.) หลังตัวแปร แล้วมีรายการ Property และ Function ที่ตรงกับ Type ของตัวแปรขึ้นมาให้ นี่เป็นผลมาจากการทำงานของ TypeScript ที่ฝังอยู่ใน VSCode ถ้าโปรแกรมเราใช้ TypeScript ตัว Editor ก็จะประมวลผล Auto Complete ให้เราใช้เร็วและบ่อยกว่า JavaScript

![การมี Auto complete ของ VSCode](/assets/image/post/say-hi-to-typescript/03.png)

**4. ไม่ Strict เท่า Strict Type Language**

แม้ TypeScript จะทำให้เราต้องกำหนด Type และ Strict เรื่องใช้ตัวแปรมากขึ้น แต่ก็ไม่ได้ Strict ถึงขนาดต้องใส่ Type ให้กับทุกตัวที่เราใช้ในโปรแกรม เหมือนอย่างภาษาที่ Strict หนัก ๆ อย่างเช่น ภาษา Java ตัว TypeScript เองก็เปิดให้เราเลือกได้ว่าจะใส่ Type หรือไม่ใส่ Type อย่างไรบ้าง เช่น

```javascript
// ตัวแปร ต้องใส่ type นะ
cost a: number = 10;

// ฟังก์ชัน ไม่ต้องใส่ return type ก็ได้
function add(a: number, b: number) {
  return a + b;
}
```

# อยากใช้บ้างต้องทำไง?

TypeScript ใช้ได้ในโปรเจคที่ใช้ Environment เป็น Node.js หรือ Deno ถ้าเป็น Frontend ก็เป็นพวก Framework ที่นิยมใช้กัน อย่างเช่น React.js, Vue.js ในที่นี้จะขอพูดถึงการเพิ่ม TypeScript ใน Node.js ธรรมดาอย่างเดียวก่อน

เราสามารถติดตั้งผ่าน `npm`

```
npm install typescript --save-dev // local
npm install typescript -g // global
```

จากนั้นให้เราสร้างไฟล์ `tsconfig.json` ในโปรเจคซึ่งมีเนื้อหาประมาณนี้

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

มันเป็นไฟล์ Config ของ TypeScript ซึ่งมีผลต่อการแปลภาษา เราสามารถปรับได้ตามความต้องการเรา สามารถเริ่มต้นจาก [`tsconfig-base`](https://github.com/tsconfig/bases) ได้ รายละเอียดของ Config ก็สามารถดูได้ที่ [`tsconfig.json` Refrence](https://www.typescriptlang.org/tsconfig)

เวลาเขียนโค้ด TypeScript เราจะเขียนในไฟล์ที่มีนามสกุลเป็น `.ts` แทน `.js` (ถ้าเขียนเป็น JSX เราจะเขียนในไฟล์ `.tsx`)

การสร้างตัวแปร ใน Typescript จะมีประกาศ type เพิ่มเข้าไป

```javascript
const a: type = something
```

เสร็จแล้วเมื่อจะทดสอบ ให้รัน TypeScript compiler ด้วยคำสั่งนี้

```
npx tsc
```

ตัวอย่าง

```javascript
let a: { name: string } = {
  name: 'John'
}

a = null

console.log(a.name)
```

ถ้ามีอะไรผิดปกติ มันจะแจ้งใน Terminal หรือ Command line ของเราแบบนี้

```
example.ts:5:1 - error TS2322: Type 'null' is not assignable to type '{ name: string; }'.
```

เมื่อแก้เสร็จแล้ว เมื่อจะรันโปรแกรมจริง ๆ จะต้องแปลงกลับมาเป็น Javascript ซึ่งทำได้โดยใช้ TypeScript compiler ด้วยคำสั่งเดียวกัน แต่เพิ่ม `--outDir` แบบนี้

```
npx tsc --outDir ./build
```

หรือจะเพิ่ม outDir ใน `tsconfig.json`

```json
{
  "compilerOptions": {
    ...
    "outDir": "./build"
    ...
  },
}
```

แล้วรันคำสั่งเหลือแค่

```
npx tsc
```

ผลลัพธ์ที่ได้จากคำสั่งนี้ จะเป็นไฟล์ JavaScript อยู่โฟลเดอร์ตามที่กำหนดใน `outDir` ในที่นี้จะเป็น `./build`

# Type ใน TypeScript

## Primitive Type

Primitive Type คือ ชนิดของข้อมูลทั่วไปที่มีอยู่ใน JavaScript มีชื่อเดียวกับที่เราเห็นเมื่อใช้ Operator `typeof` มี 3 ตัวคือ

- `boolean`
- `number`
- `string`

```javascript
const a: boolean = true
const b: number = 10
const c: string = 'Hello'
```

## Object

การใส่ Type ให้กับ Object เราต้องใส่เป็นรายการ Property ของ Object ลงไปแบบนี้

```javascript
const obj: {
  name: string
  age: number
  gender: string
} = {
  name: 'John',
  age: 20,
  ender: 'Male'
};
```

เราสามารถใช้ `;` หรือ `,` คั่นได้ในกรณีเราเขียน type ของ Object บรรทัดเดียว

```javascript
const obj: { name: string, age: number, gender: string } = {
  name: 'John',
  age: 20,
  gender: 'Male'
}
```

Property ทุกตัวใน type นี้จะบังคับใส่ค่าหมด ถ้าใส่ไม่หมดจะมี Error ขึ้น

![การแสดง Error ที่เกิดจากใส่ Property ไม่ครบ](/assets/image/post/say-hi-to-typescript/04.png)

ถ้ามี Property ที่ไม่อยากบังคับให้ใส่ค่าจริง ๆ เราสามารถใส่เครื่องหมาย `?` กำกับได้

```javascript
const obj: { name: string, age?: boolean, gender: string } = {
  name: 'John',
  gender: 'Male'
}

if (typeof a.age === 'undefined') {
  // true
  console.log('a.age is undefined')
}
```

เราสามารถเพิ่ม `[key: string]: type` เพื่อให้ใส่ Unknown property ได้ด้วย

```javascript
let a: { [x: string]: string | number } = {
  name: 'John',
};
a['age'] = 20;
a['gender'] = 'Male';

let b: {
  name: string
  age: number
  [x: string]: string | number
} = {
  name: 'John',
  age: 20
}
b.gender = 'Male'
```

การเขียน และการใช้มีหลายแบบ

แบบที่ 1

```javascript
let a: { [x: string]: string | number } = {}
```

การใช้ type แบบนี้ Object จะรับ Property อะไรก็ได้ เวลาสร้างตัวแปร ต้องใส่ค่าของ Object เสมอ แต่แบบนี้จะใส่ เป็นค่า `{}` (Object ว่าง) ได้

เวลา Assign หรือใช้ค่า Property ใน Object นั้น จะต้องใช้แบบ `obj[string index]`

```javascript
a['age'] = 20
a['gender'] = 'Male'
```

แบบที่ 2

```javascript
let b: {
  name: string
  age: number
  [x: string]: string | number
} = {
  name: 'John',
  age: 20
}
```

การประกาศแบบนี้ Object จะต้องมี `name` และ `age` เพราะฉะนั้นการสร้าง Object จะต้องใส่ค่า object ที่มี Property ให้ครบ ไม่สามารถใส่เป็น `{}` ได้ แต่จะใส่เพิ่มได้เช่นเดียวกัน เพราะใน type มี `[x: string]: string | number`

และเวลา Assign หรือใช้ค่า Property ใน Object นั้น เราใช้แบบ `obj[string index]` ไม่ได้ เราจะต้องใช้แบบ `obj.name`

```javascript
b.gender = 'Male'
```

แต่เงื่อนไขของการใช้ `[key: string]: type` คือ เราต้องใส่ type ให้ครบตามจำนวน type ที่ใช้ทั้งหมดดังที่แสดงในตัวอย่างด้านบน ถ้ามี type หลายชนิด เราสามารถใช้เครื่องหมาย `|` คั่นระหว่าง type ได้ ซึ่งเครื่องหมายนี้เรียกว่า Union Type Operator ซึ่งจะอธิบายในหัวข้อต่อไป

ถ้าเกิดเราไม่ได้ใส่ type ให้กับ Object ใน TypeScript จะตีความว่า Object นั้นมี type `any`

## Array

การใส่ type ให้กับ Array ต้องใส่เป็น `type[]` เช่น `string[]` การเขียนแบบนี้สามารถใช้กับ type ทุกตัวที่กล่าวมา หากไม่อยากเขียนแบบนี้ เราสามารถเขียนอีกแบบก็ได้เหมือนกัน คือ `Array<type>`

```javascript
const arr: string[] = ['a', 'b', 'c']
const arr2: Array<string> = ['a', 'b', 'c']
```

## `null`

Type ทั้งหมดที่กล่าวมาเป็น Non-nullable คือ ข้อมูลจะมีค่าเป็น null ไม่ได้ ถ้าเราต้องการให้ข้อมูลนั้นมีค่า null เราต้องใช้ type นี้ด้วย

> null และ undefined ไม่เหมือนกันนะ
>
> - null คือ ข้อมูลที่ถูกสร้างขึ้นมาแล้ว แต่ไม่มีค่า
> - undefined คือ ข้อมูลที่ไม่ได้ถูกสร้างขึ้น

```javascript
let a: null // เก็บค่า null อย่างเดียว
let b: string | null // เก็บค่า string หรือ null
```

## `any`

`any` คือ Type ชนิดพิเศษที่สามารถใช้กับตัวแปรอะไรก็ได้ เมื่อใช้แล้ว TypeScript จะข้ามไม่ตรวจการใช้ตัวแปรนั้น

```javascript
const a: any = { x: 1, y: 2 }
a.foo()
a()
a.bar = 100
a = 'hello'
```

ตาม Best Practices `any` ถือว่าเป็น type ที่ควรหลีกเลี่ยง เพราะมันจะปิดการตรวจหมด และขณะที่โปรแกรมทำงานอาจจะเกิด Error ไม่ต่างจากการใช้ JavaScript เพียว ๆ เลย

## `unknown`

`unknown` เป็น type ที่ทำงานเหมือน `any` ก็คือ เป็น type ที่รองรับได้ทุกข้อมูล แต่จะพิเศษกว่า `any` คือ เราจะใช้ตัวแปรที่เป็น `unknown` ไม่ได้เลย ถ้าไม่เช็ค type ด้วย operation `typeof` หรือ `instanceof` ก่อน หมายความว่า `unknown` ปลอดภัยกว่า `any` เราสามารถใช้ได้โดยไม่ผิดหลักอะไร

ส่วนมากจะใช้ `unknown` กันเมื่อไม่รู้ type ของตัวแปร หรือมีได้หลาย type และต้องเช็คด้วย `typeof` หรือ `instanceof` เช่น ตัวแปรที่เป็น Object ของ Class ต่าง ๆ

คัวอย่าง:

```javascript
class A {
  foo() {
    return 'foo'
  }
}

class B {
  bar() {
    return 'bar'
  }
}

let a: unknown = new A() // ถ้าไม่ใส่ type เป็น unknown ตัวตรวจของ TypeScript จะตีความว่า `a มี type เป็น A` ทำให้ไม่สามารถ assign ค่าเป็น object ของ B ได้

// ก่อนที่จะใช้ตัวแปร ต้องเช็คด้วย `instanceof` ก่อน
if (a instanceof A) {
  console.log(a.foo())
}

a = new B()

if (a instanceof B) {
  console.log(a.bar())
}
```

## Union Type

ในบางครั้ง เราอยากให้ตัวแปรสามารถเก็บค่าได้หลายชนิด เราสามารถใส่ type ที่ต้องการคั่นด้วยเครื่องหมาย `|` เช่น

```javascript
let a: number | string
a = 1
a = 'hello'
```

เราใช้ค่าและฟังก์ชันต่าง ๆ ในตัวแปรที่เป็น Union ได้ถ้าค่าและฟังก์ชันต่าง ๆ ที่เราเรียกใช้มีใน Type ที่เราจับมา Union ทั้งหมด

```javascript
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3) // เรียกได้ไม่มี error เพราะฟังก์ชัน slice มีอยู่ในอาร์เรย์และ string
}
```

แต่ถ้าจะเรียกค่าและฟังก์ชันที่ไม่ได้มีอยู่ทุก Type เราจะเรียกไม่ได้

```javascript
function printId(id: number | string) {
  console.log(id.toUpperCase()) // เกิด error
}
```

จากข้างบน เมื่อรันตัวแปลภาษาของ TypeScript มันจะแจ้งว่า

```
Property 'toUpperCase' does not exist on type 'string | number'.
Property 'toUpperCase' does not exist on type 'number'.
```

เป็นที่แน่ชัดว่ามันเกิดจาก เราไปเรียกฟังก์ชัน `toUpperCase` ที่มีใน `string` แต่ไม่มีใน `number`

วิธีแก้ไขเมื่อเกิดเหตุการณ์แบบนี้ คือ ให้เราเช็ค type ของตัวแปรด้วย `typeof` หรือ `instanceof` ก่อนใช้ตัวแปร

```javascript
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

printId('one') // ONE
printId(1) // 1
```

ถ้าเป็นอาร์เรย์ สามารถใช้ `Array.isArray()` ได้

```javascript
const a: number[] | string = [1, 2, 3]
if (Array.isArray(a)) {
  console.log(`Array joined: ${a.join(', ')}`)
}
```

## Intersaction type

เป็นการรวม type เป็นหนึ่งเดียว ทำให้เราสามารถใช้ค่าและฟังก์ชันทุกตัวของ type ที่รวมกัน

```javascript
const a: { name: string } & { age: number } = { name: 'John', age: 30 }

console.log(a.name) // John
console.log(a.age) // 30
```

# การสร้าง Type

## Type Alias

ถ้า type ที่ใช้มันยาวมาก และใช้บ่อย ๆ เราสามารถตั้งชื่อให้ type นั้นได้ และใช้ชื่อนั้นแทน

```javascript
type numberOrString = number | string

const a: numberOrString = 1
```

```javascript
type Person = {
  name: string,
  age: number
}

const a: Person = {
  name: 'John',
  age: 30
}
```

## Interface

Interface เป็นการประกาศลักษณะของ Object

```javascript
interface Person {
  name: string;
  age: number;
}

const a: Person = {
  name: 'John',
  age: 30
}
```

Interface และ Type Alias จะเหมือนกันทุกอย่าง แต่ที่แตกต่าง คือ การประกาศ และอีกอย่างหนึ่ง Interface จะสามารถเพิ่ม Property ขึ้นมาทีหลังได้ ในขณะที่ Type Alias ทำไม่ได้

```javascript
// การประกาศ
// Type Alias
type Point = {
  x: number,
  y: number
}

// Interface
interface Point {
  x: number;
}

// Interface สามารถประกาศซ้ำเพื่อเพิ่ม Property ได้
interface Point {
  y: number;
}

const coordinate: Point = { x: 12, y: 12 }
```

# ประกาศ Type ใน Function

ในฟังก์ชัน ใส่ type ได้ที่ Parameter และ Return value

```javascript
function add(a: number, b: number): string {
  return (a + b).toString()
}
```

```javascript
const add = (a: number, b: number): string => (a + b).toString()
```

TypeScript ยังมี Type และรายละเอียดอื่น ๆ อีกมากมาย จนไม่สามารถเขียนได้หมด ถ้าอยากจะศึกษาเพิ่ม ก็สามารถเข้าไปที่ลิงก์ด้านล่างเพื่อศึกษาต่อได้เลยค่ะ

# References & Read More

- [Typescript (Wikipedia)](https://en.wikipedia.org/wiki/TypeScript)
- [What is a tsconfig.json (Official Typescript Handbook)](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Everyday Types (Official Typescript Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Learn TypeScript](https://learntypescript.dev/)
