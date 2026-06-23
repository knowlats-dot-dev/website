---
slug: intro-to-lerna
title: จัดการ Project ใน Monorepo อย่างง่าย ๆ ด้วย Lerna
description: มารู้จัก Lerna เครื่องมือที่จะช่วยให้การจัดการ Multi-package Repository ทำได้ง่ายขึ้น
image: /assets/image/post/intro-to-lerna/heading.jpg
date: 2020-04-07T17:00:00.000Z
category: useful-tools
tags:
  - node.js
  - javascript
  - monorepo
  - tools
  - lerna
canonical_url: https://medium.com/@icegotchafantasoxy/introduction-to-lerna-tool-for-monorepos-7a3d6fe4d65c
---

# Contents

# Introduction

Project ของ NPM (Node Package Manager) ไม่ว่าจะเป็น Project ที่สร้างขึ้นมาด้วยคำสั่ง `npm init` Project ที่เป็น React, Vue, หรืออะไรที่เป็น JavaScript ที่มีไฟล์ package.json จะถือว่าเป็น 1 Project

โดยปกติแล้ว เรามักจะทำงานกับ Project 1 ตัวต่อกับ 1 Git Repository เท่านั้น แต่ทว่าในโลกความจริง เราสามารถทำงานหลาย Project ต่อ 1 Git Repository ได้ด้วย เราเรียก Repository นั้นว่า **“Multi-package Repository”** หรือ **“Monorepo”**

Monorepo เป็นแนวคิดของการจัดโครงสร้างของการพัฒนา Software อีกรูปแบบหนึ่งที่ให้ Application หรือ Service ต่าง ๆ รวมอยู่ใน Project เดียวกัน มีประโยชน์เด่น ๆ คือ สามารถใช้ Resource และ Code ร่วมกันได้ ลดการเขียน Code ที่ซ้ำซ้อน (Duplicate Code) Refactor โค้ดง่าย (เพราะสามารถแก้ไขได้ในที่เดียว)

แต่ทว่า การทำ Monorepo กับ Project ที่เป็น JavaScript ยังถือว่าเป็นเรื่องที่น่าปวดหัวไม่น้อย เนื่องจากว่า เราต้องจัดการเรื่องของ Dependency (หรือ Package) ที่ใช้ใน Project ย่อยทั้งหมดด้วยตัวเอง (ถ้าคิดไม่ออก ให้ลองนึกภาพ Project ที่ Project ย่อยที่มี package.json เป็นของตัวเองดู จะเห็นว่าเมื่อต้องใช้ `npm install` เราต้องไล่เปิด Project ทำคำสั่งในทุก ๆ Project) อีกทั้งถ้าจะใช้โค้ดจาก Project หนึ่งในอีก Project หนึ่ง เราจะต้องใช้คำสั่ง [NPM link](https://docs.npmjs.com/cli/link.html) ด้วยตนเองอีกเช่นกัน ซึ่งทั้งยุ่งยากและเสียเวลามาก (วิธีการใช้คำสั่ง NPM Link สามารถดูได้ที่[บล็อกนี้](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557))

ในบล็อกนี้ ผู้เขียนจะแนะนำให้รู้จักเครื่องมือหนึ่งที่ช่วยทำให้การทำ Monorepo กับ Project ที่เป็น JavaScript เป็นเรื่องที่ง่ายขึ้น เครื่องมือตัวนี้มีชื่อว่า **“[Lerna](https://github.com/lerna/lerna)”**

# การติดตั้ง Lerna

เราสามารถติดตั้งด้วย NPM แบบ Global ดังคำสั่งด้านล่าง

```
npm install -g lerna
```

# การสร้าง Project ด้วย Lerna

การเริ่มใช้งาน เราต้องสร้างโปรเจคด้วย Lerna ก่อน ดังคำสั่งด้านล่างนี้

```
mkdir lerna-test-project
cd lerna-test-project
lerna init --independent
```

เมื่อพิมพ์คำสั่งข้างบน ผลลัพธ์จะเป็นดังนี้

```
lerna notice cli v3.20.2
lerna info Initializing Git repository
lerna info Creating package.json
lerna info Creating lerna.json
lerna info Creating packages directory
lerna success Initialized Lerna files
```

และโฟลเดอร์ชื่อว่า `lerna-test-project` จะถูกสร้างขึ้น ภายในโฟลเดอร์จะมีไฟล์ Configuration ชื่อว่า `lerna.json` พร้อมทั้งโฟลเดอร์ชื่อว่า `packages` ที่จะเป็นที่เก็บ Subproject ต่าง ๆ

```
.
├── lerna.json
├── package.json
└── packages
```

เมื่อดูผลลัพธ์ของคำสั่งในตอนแรก จะเห็นได้ว่า Lerna สร้าง Git Repository ให้เราด้วย ถึงตรงนี้เราสามารถพิมพ์ `git commit` เพื่อเพิ่ม Commit แรกได้เลย

# เพิ่ม Subproject แรก

หลังจากสร้าง Project ด้วย Lerna เสร็จแล้ว การสร้าง Project ภายใน Project นี้ (ขอเรียก Subproject เพื่อให้เข้าใจง่าย ๆ) ก็สามารถทำได้ตามถนัด จะสร้างด้วย NPM, `create-react-app`, หรือโปรแกรมอะไรก็ได้

ในที่นี้จะขอยกตัวอย่างการสร้าง Subproject ทั้งหมด 3 Project

2 Project เป็น Service ที่พัฒนาด้วย Node.js โดย Service แรกนั้นเป็น REST API ธรรมดา ส่วน Service ที่สองเป็น Server ที่ทำหน้าที่ Serve หน้า Webpage

อีก Project หนึ่งเป็นโค้ดที่ทำหน้าที่เป็น Logging สำหรับ Service ทั้งสอง นี่จะเป็นตัวอย่างของ Project ที่ใช้เป็น Dependency ของ Project อื่นซึ่งจะสร้างในหัวข้อนี้เลย

สร้าง Subproject ชื่อว่า `logger` โดยสร้างเป็น Scoped Project ดังคำสั่งด้านล่าง

```
mkdir packages/logger
cd packages/logger
npm init --scope=lerna-test --yes
```

> [NPM Scope](https://docs.npmjs.com/misc/scope) เป็นฟีเจอร์ของ NPM ที่ใช้จัด Project ของเราเป็นกลุ่ม ๆ เมื่อสร้าง NPM จะให้ชื่อ Project ในรูปแบบ `@[ชื่อกลุ่ม]/[ชื่อ Project]` มีประโยชน์อย่างหนึ่งคือสามารถเรียกใช้เป็น Package ให้ Project อื่นได้สะดวก

Project ที่สร้างใหม่จะมี `package.json` เกิดขึ้นดังนี้

```json
// package.json

{
  "name": "@lerna-test/logger",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

ในที่นี้จะใช้ [pinojs/pino](https://github.com/pinojs/pino) ทำ Logging การติดตั้ง Package ใน Subproject จะไม่ใช้ `npm install` แต่จะใช้คำสั่ง `lerna add` แทน

```
lerna add pino --scope='@lerna-test/logger'
```

เมื่อดู `package.json` ของ Logger จะเห็นว่ามี Package เพิ่มเข้ามาดังนี้

```json
// package.json

{
  "name": "@lerna-test/logger",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pino": "^6.1.1" // <--
  }
}
```

จากนั้นสร้างไฟล์ `index.js` เขียนโค้ดที่เราจะใช้ใน Project อื่น และส่งออกผ่าน `module.exports` ดังตัวอย่าง

```javascript
// packages/logger/index.js

const pino = require('pino')

const logger = pino({
  level: 'debug',
  formatters: {
    level(label) {
      return { level: label }
    }
  }
})

module.exports = logger
```

ตอนนี้ Logger ก็พร้อมใช้งานใน Project ต่อไปแล้ว

# สร้าง Subproject ต่อไปเป็น Service

การสร้าง Subproject ไม่จำเป็นต้องสร้างในโฟลเดอร์ packages เสมอไป เราสามารถสร้างในโฟลเดอร์ที่มีชื่อที่สื่อกว่าก็ได้ เช่น services, apps แต่ต้องแก้ไขที่ไฟล์ `lerna.json` เพื่อให้ Lerna เห็น Subproject ที่โฟลเดอร์ดังกล่าวด้วย

ในที่นี้จะสร้างโฟลเดอร์ชื่อว่า `services` สำหรับทุก Project ที่เป็น Service ดังนั้นในไฟล์ `lerna.json` ควรแก้ไขโดยเพิ่ม `services/*` ใน packages ดังนี้

```json
// lerna.json
{
  "packages": [
    "packages/*",
    "services/*" // <--
  ],
  "version": "independent"
}
```

ที่โฟลเดอร์ Service ให้สร้าง Service ตัวแรกชื่อ `backend-service`

```
mkdir -p services/backend-service
cd services/api-service
npm init --scope=lerna-test --yes
```

และสร้าง service ตัวที่สองชื่อว่า `serve-web-service`

```
cd .. #ย้อนกลับไปยังโฟลเดอร์ services
mkdir serve-web-service
cd serve-web-service
npm init --scope=lerna-test --yes
```

ติดตั้ง `express` ให้กับทั้งสอง Service โดยใช้คำสั่ง `lerna add`

```
lerna add express --scope='@lerna-test/*-service'
```

เพิ่มไฟล์ `index.js` ให้กับ `backend-service`

```javascript
// services/backend-service/index.js

const http = require('http')
const express = require('express')

const app = express()
const PORT = 3001

app.get('/hello', (req, res) => {
  const name = req.query.name
  if (!name) {
    res.send('Hello, stranger!')
    return
  }
  if (typeof name !== 'string') {
    res.status(400).status('Please send name as a string')
    return
  }
  res.send(`Hello, ${name}!`)
})

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

สำหรับ `web-serve-service` ในที่นี้จะใช้ ejs เป็น Web Template Engine เพิ่มเติม ให้ติดตั้งลงไป

```
lerna add ejs --scope='@lerna-test/serve-web-service'
```

เพิ่มไฟล์ `views/index.ejs`

```html
// services/serve-web-service/views/index.ejs

<html>
  <head>
    <title>Lerna Test Webpage</title>
  </head>
  <body>
    <h1><%= title %></h1>
    <p id="greeting"></p>
    <p>Welcome to <%= title %></p>
    <script>
      const backendUrl = `http://${window.location.hostname}:3001`
      const name = 'Icegotcha'
      fetch(`${backendUrl}/hello?name=${name}`)
        .then((response) => response.text())
        .then((result) => {
          document.getElementById('greeting').innerHTML = result
        })
        .catch((error) => {
          document.getElementById('greeting').innerHTML =
            `Sorry, an error occured: ${error.message}`
        })
    </script>
  </body>
</html>
```

และก็เพิ่มไฟล์ `index.js`

```javascript
// services/serve-web-service/index.ejs

const http = require('http')
const path = require('path')
const express = require('express')

const app = express()
const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { title: 'Lerna Test Project' })
})

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

ในหัวข้อที่แล้ว ผู้เขียนได้สร้าง Logger สำหรับใช้ใน Service ทั้งสอง การนำไปใช้จำเป็นต้องติดตั้งลงไปก่อน การติดตั้งก็ใช้คำสั่งเหมือนการติดตั้ง Package ทั่วไป

```
lerna add @lerna-test/logger --scope='@lerna-test/*-service'
```

หลังจากใช้คำสั่งนี้ `@lerna-test/logger` ควรอยู่ในรายชื่อ dependencies ในไฟล์ `package.json` ของทั้งสอง Service

ต่อจากนี้นำไปใช้ในแต่ละ Service ได้เลย

```javascript
// services/backend-service/index.js

const http = require('http')
const express = require('express')
const logger = require('@lerna-test/logger') // <--

const app = express()
const PORT = 3001

app.get('/hello', (req, res) => {
  logger.debug('GET /hello is called') // <--
  const name = req.query.name
  if (!name) {
    res.send('Hello, stranger!')
    return
  }
  if (typeof name !== 'string') {
    res.status(400).status('Please send name as a string')
    return
  }
  res.send(`Hello, ${name}!`)
})

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

```javascript
// services/serve-web-service/index.ejs

const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('@lerna-test/logger') // <--

const app = express()
const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  logger.debug('GET / is called') // <--
  res.render('index', { title: 'Lerna Test Project' })
})

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

จากขั้นตอนทั้งหมด ตอนนี้ Project `lerna-test-project` มี Subproject ทั้งหมด 3 Project แล้ว นั่นก็คือ

- `@lerna-test/logger`

- `@lerna-test/backend-service` — Web Service ที่มี Route GET /hello ที่ทำหน้าที่ทักทายผู้ใช้ที่ติดต่อเข้ามา

- `@lerna-test/serve-web-service` — Web Service ที่ทำหน้าที่ Render หน้าเว็บทักทายผู้ใช้

จะเห็นได้ว่า แต่ละ Project จะมีโครงสร้างเป็นของตัวเอง แยกหน้าที่การทำงานออกอย่างชัดเจน ที่นี้การเพิ่ม การลบ และการจัดการ Subproject ภายใน Project ก็ไม่เป็นเรื่องยากอีกต่อไป เราสามารถทำงานกับแต่ละ Project เหมือนที่เคยทำกันใน Project ที่ต่อกับ 1 Git repository ได้เลย

สำหรับโครงสร้างของ Project `lerna-test-project` ในตอนนี้ จะเป็นดังรูป

![](/assets/image/post/intro-to-lerna/01.png)

ในหัวข้อต่อไป จะอธิบายคำสั่งของ Lerna ที่ควรรู้จัก ได้แก่ `lerna add`, `lerna run`, `lerna exec`, `lerna bootstrap` และ `lerna clean`

# การติดตั้ง Package ให้กับ Project

`lerna add` เป็นคำสั่งที่ใช้ติดตั้ง Package ให้กับ Subproject ที่เรากำหนดไว้ มีความสามารถพิเศษ คือ มันติดตั้ง Package ลงในมากกว่า 1 Project ได้

คำสั่งนี้มีรูปแบบดังนี้

```
lerna add <package>[@version] [--dev] [--exact] [--peer]
```

เราสามารถพิมพ์คำสั่ง `lerna add` แล้วตามด้วยชื่อ package เช่น

```
lerna add axios
```

ผลลัพธ์ที่ได้ คือ Lerna จะติดตั้ง Package axios เวอร์ชันล่าสุดลงในทุก ๆ Project

```json
// package.json

"dependencies": {
    "axios": "^0.19.2",
    // ...
}
```

หากต้องการให้ Package ลงในเวอร์ชันล่าสุด แต่ไม่ให้เปลี่ยนแปลงเวอร์ชันได้ในอนาคต ให้ใส่ `--exact` ต่อท้ายด้วย

```
lerna add axios --exact
```

ผลลัพธ์ที่ได้ ใน `package.json` ส่วน Package นั้นจะไม่มีเครื่องหมายข้างหน้าเวอร์ชัน เช่น เครื่องหมาย ^ (Caret)

```json
// package.json

"dependencies": {
    "axios": "0.19.2",
    // ...
}
```

> เครื่องหมาย ^หมายถึง อนุญาตให้ NPM ทำการ Patch Package ในเวอร์ชันใหม่ระดับ Minor

ถ้าหากต้องการให้ลงเวอร์ชันตามที่ต้องการ ต้องกำหนดเวอร์ชันหลังชื่อ Package ด้วย

```
lerna add axios@0.18.1
```

แล้วจะได้ Package นั้น ๆ ในเวอร์ชันที่กำหนดไว้เลย

```json
// package.json

"dependencies": {
    "axios": "0.18.1",
    // ...
}
```

จะลงเป็น Development Dependency หรือ Peer Dependency ก็ทำได้เช่นกัน

```
lerna add axios --dev
lerna add axios --peer
```

มาถึงเรื่องของการเลือก Project ที่จะติดตั้ง

เราสามารถเลือก Project ที่จะติดตั้งลงไปได้โดยเขียน `--scope` ต่อท้ายคำสั่ง แล้วตามด้วยชื่อ Project ดังตัวอย่าง

```
lerna add axios --scope '@lerna-test/serve-web-service'
# หรือ
lerna add axios --scope='@lerna-test/serve-web-service'
```

Lerna จะติดตั้ง `axios` ลงใน Project ที่เลือกไว้ Project เดียว

เราสามารถใช้เครื่องหมาย \* ประกอบได้เช่นเดียวกัน ยกตัวอย่าง เช่น ในหัวข้อที่แล้ว ผู้เขียนได้ติดตั้ง Package `express` ให้ทั้งสอง Service ด้วยคำสั่งดังนี้

```
lerna add express --scope='@lerna-test/*-service'
```

จากคำสั่งนี้แปลความหมายได้ว่า ให้ลง `express` ในทุก Project ที่ชื่อมี `@lerna-test` ตามด้วยตัวอักษรใด ๆ ข้างหน้า `-service`

ถ้าจะลงในทุก ๆ Project ยกเว้น Project ใด ๆ ก็ทำได้โดยพิมพ์ --ignore ต่อท้าย ดังตัวอย่าง

```
lerna add express --ignore '@lerna-test/logger'
# หรือ
lerna add express --ignore='@lerna-test/logger'
```

คำสั่งนี้แปลความหมายได้ว่า ให้ลง `express` ในทุก Project ยกเว้น Project ที่ชื่อ `@lerna-test/logger`

`--ignore` สามารถใช้ร่วมกับ `--scope` ได้ด้วย

```
lerna add express --scope='@lerna-test/*-service' --ignore='@lerna-test/backend-service'
```

คำสั่งนี้แปลความหมายได้ว่า ให้ลง `express` ในทุก Project ที่ชื่อมีตัวอักษรใด ๆ อยู่ข้างหน้า `-service` ยกเว้น Project ที่ชื่อ `@lerna-test/backend-service`

# รัน Command ผ่าน Lerna

นอกจากการติดตั้ง Package แล้ว Lerna ยังสามารถช่วยทำคำสั่งในทุก Project ที่เลือกพร้อมกันได้ ผ่านคำสั่ง `lerna exec` และ `lerna run`

ก่อนอื่น ผู้เขียนขอเพิ่มคำสั่ง npm start ให้กับทั้งสอง Service เพื่อนำไปใช้เป็นตัวอย่างคำสั่งที่ใช้ใน `lerna exec`, `lerna run` โดยแก้ไขไฟล์ `package.json` ของทั้งสอง Service ให้มีเนื้อหาเพิ่มเติมดังนี้

```json
"scripts": {
    ...
    "start": "node index.js",
    ...
},
```

คำสั่ง `npm start` จะเป็นคำสั่งเปิดการทำงานของแต่ละ Service

มาเริ่มกันที่ `lerna exec`

`lerna exec` มีรูปแบบคำสั่งดังนี้

```
lerna exec -- <command> [..args]
```

ด้วยคำสั่งนี้ ทำให้เราสามารถรันคำสั่งอะไรก็ได้ในทุก Project เช่น Linux Command, NPM Script เป็นต้น

ลบโฟลเดอร์ `node_modules`

```
lerna exec -- rm -rf ./node_modules
```

รัน NPM Script

```
lerna exec -- npm start
```

เราสามารถเลือก Project ผ่าน option `--scope` และ `--ignore` เช่นเดียวกับ lerna add ในคำสั่งนี้ต้องพิมพ์หลังคำว่า exec ดังตัวอย่าง

```
 lerna exec --scope '@lerna-test/*-service' -- npm start
```

ปกติแล้ว คำสั่งนี้จะรันคำสั่งแบบขนานกัน (Parallel) โดยทำงานเป็น Thread จำนวนสอดคล้องกับ core ของ CPU ที่อยู่ในเครื่อง และถ้ามี Logging ออกมาทาง Console หรือ Command Line จะแยกไม่ออกว่าเป็นของ Subproject ไหน

ถ้าต้องการให้มีชื่อ Project กำกับ Logging สามารถทำได้ด้วยการเพิ่ม
`--parallel` ต่อท้ายคำว่า exec เช่น

```
lerna exec --parallel --scope '@lerna-test/*-service' -- npm start
```

ข้อแตกต่างคำสั่งที่ไม่มี `--parallel` และคำสั่งที่มี `--parallel` จะเห็นได้จาก Console ดังตัวอย่าง

![](/assets/image/post/intro-to-lerna/02.png)

_รูปเปรียบเทียบผลลัพธ์ของคำสั่งที่ไม่มี `-- parallel` และมี `--parallel`_

`--parallel` จะรันคำสั่งในทุก Project ที่เลือกทันที โดยไม่สนใจเรื่องข้อจำกัดของ CPU หากต้องการให้ Lerna รันโดยคำนึงถึงเรื่องข้อจำกัดของ CPU แต่ยังต้องการให้แยก Logging ให้เปลี่ยนจาก `--parallel` เป็น `--stream` แทน

```
lerna exec --stream --scope '@lerna-test/*-service' -- npm start
```

นอกจาก `lerna exec` แล้ว เราสามารถใช้คำสั่ง `lerna run` เพื่อรันคำสั่งที่เป็น NPM script แทนได้ จากตัวอย่าง ถ้าจะรัน `npm start` ด้วยคำสั่ง `lerna run` แทน `lerna exec` สามารถเขียนคำสั่งได้เป็นดังนี้

```
lerna run start
lerna run start --scope '@lerna-test/*-service'
lerna run start --parallel --scope '@lerna-test/*-service'
```

> คำสั่ง `lerna run` ทำงานเหมือน `lerna exec` แต่สามารถรันได้เฉพาะ NPM Script เท่านั้น

# การติดตั้ง Package ทั้งหมด และการลบ Package ใน Lerna

เรายังคงสามารถใช้ `npm install` ใน Project ที่ใช้ Lerna ได้อยู่ตราบเท่าที่ไม่มีการใช้ Subproject เป็น Package ให้ Subproject อื่น

แต่ถ้าใช้ไปแล้ว การใช้คำสั่ง `npm install` จะทำไม่สำเร็จ เพราะว่า NPM หา Package บางตัวใน NPM Registry ไม่พบ ซึ่งมันก็คือ Subproject ที่อยู่ภายใน Project ที่เราทำงานอยู่นั่นเอง

![](/assets/image/post/intro-to-lerna/03.png)

ทางแก้ปัญหานี้คือ ใช้คำสั่ง `lerna bootstrap` แทน

`lerna bootstrap` เป็นคำสั่งพื้นฐานที่เราต้องใช้ นอกจากคำสั่งนี้จะช่วยติดตั้ง Package แทน `npm install` แล้ว สิ่งสำคัญที่มันทำถัดมาก็คือ สร้าง Symlink เชื่อมกับซอร์สโค้ดของ Subproject ที่เป็น Dependency ของ Subproject อื่น

โดยปกติแล้วโฟลเดอร์ `node_modules` จะทำหน้าที่เก็บซอร์สโค้ดของ Dependency ที่เราติดตั้ง ซอร์สโค้ดทั้งหมดจะมาจากภายนอก ยกเว้น Dependency ที่เป็น Subproject ซึ่งมีซอร์สโค้ดอยู่ภายใน Project หลักแล้ว พวกนี้จะเก็บเป็นไฟล์ Symlink แทน ดังรูปตัวอย่างด้านล่าง ลักษณะจะเป็นเหมือนไฟล์ Shortcut ที่จะนำเราไปสู่ซอร์สโค้ดของ Subproject นั้น เพราะฉะนั้น หากมี Subproject ใดใช้ Dependency นั้น ก็เท่ากับว่า Subproject นั้นกำลังเข้าถึงซอร์สโค้ดของ Dependency ผ่านไฟล์ Symlink อยู่นั่นเอง

```
./services/backend-service/node_modules
├── @lerna-test
│   └── logger -> ../../../../packages/logger
├── other-package-1
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── other-package-2
│   ├── index.js
│   ├── LICENSE
│   ├── package.json
│   └── README.md
├── other-packages...
| ...
```

สำหรับการลบ Package เราจะใช้คำสั่ง `npm uninstall` หรือ `npm remove` ไม่ได้เพราะว่าคำสั่งนี้มีการสแกนไฟล์ `package.json` เพื่อเช็คซอร์สโค้ดแต่ละ Package ด้วย ก่อนที่จะลบ Package ที่เลือกออกไป และมันจะทำไม่สำเร็จเพราะหา Package บางตัวไม่เจอเช่นเดียวกับตอนใช้คำสั่ง `npm install`

ทางเดียวที่จะลบ Package ได้ ก็คือ เราต้องไปลบชื่อ Package ที่เราต้องการลบในไฟล์ `package.json` เอง ลบโฟลเดอร์ `node_module` โดยใช้คำสั่ง lerna clean จากนั้นก็ใช้คำสั่ง `lerna bootstrap`

`lerna clean` เป็นอีกคำสั่งหนึ่งของ Lerna ใช้ลบโฟลเดอร์ `node_module` สามารถเลือกลบเฉพาะใน `Subproject` ที่ต้องการโดยใช้ `--scope` และ `--ignore` มันดีกว่าคำสั่ง `lerna exec --rm -rf ./node_modules` ตรงที่มีให้เรายืนยันก่อนว่าจะลบจริงหรือไม่ และมี Log ให้เราดูว่ามันลบที่ Subproject ไหนบ้าง ดังตัวอย่าง

```
info cli using local version of lerna
lerna notice cli v3.20.2
lerna info versioning independent
lerna info Removing the following directories:
lerna info clean packages/logger/node_modules
lerna info clean services/a/node_modules
lerna info clean services/backend-service/node_modules
lerna info clean services/serve-web-service/node_modules
? Proceed? Yes
lerna info clean removing /home/icegotchaf/lerna-test-project/packages/logger/node_modules
lerna info clean removing /home/icegotchaf/lerna-test-project/services/a/node_modules
lerna info clean removing /home/icegotchaf/lerna-test-project/services/backend-service/node_modules
lerna info clean removing /home/icegotchaf/lerna-test-project/services/serve-web-service/node_modules
lerna success clean finished
```

# เกี่ยวกับ Package.json ที่เป็นของ Project หลัก

ที่ผ่านมา เรายุ่งกับไฟล์ `package.json` ที่เป็นของแต่ละ Subproject เท่านั้น ในหัวข้อนี้ ผู้เขียนจะขอพูดถึงไฟล์ `Package.json\_ ที่เป็นของ Project หลัก (Root ของ Project) สักเล็กน้อย

ไฟล์ `package.json` นี้เราสามารถที่จะจัดการตามปกติได้เลย เช่น การติดตั้ง Package โดยใช้ `npm install` (Package ที่ติดตั้งตรงนี้จะสามารถใช้งานกับทุก Subproject) การลบ Package โดยใช้ `npm uninstall` หรือการเพิ่ม NPM Script ใด ๆ หรือแม้แต่การเพิ่มให้รันด้วย npm แทน lerna ก็ทำได้เช่นกัน ดังตัวอย่าง

```json
{
  "name": "root",
  "private": true,
  "devDependencies": {
    "lerna": "^3.20.2"
  },
  "scripts": {
    "start:all": "lerna run start --scope='@lerna-test/*-service' --parallel"
  }
}
```

จากตัวอย่าง ผู้เขียนได้เพิ่ม `start:all` ในส่วนของ scripts ทำให้สามารถรัน Service ทั้งสองด้วยคำสั่ง `npm run start:all`

แต่ถ้าใช้ Yarn workspace ร่วมด้วยแล้ว คำสั่งที่ใช้จัดการจะเปลี่ยนไปเล็กน้อย ดังที่จะได้เห็นในหัวข้อถัดไป

# เสริม: ใช้ Yarn Workspace ร่วมกับ Lerna เพื่อชีวิตที่ดีกว่า

![](/assets/image/post/intro-to-lerna/yarn.jpg)

_Photo by [Les Triconautes](https://unsplash.com/@triconautes) on [Unsplash](https://unsplash.com)_

หากเริ่มใช้ Lerna ใน Project แล้ว ผู้เขียนขอแนะนำให้ใช้ Yarn Workspace ร่วมด้วย เพราะมันช่วยอำนวยความสะดวกให้เรามากกว่าการใช้ Lerna ล้วน ๆ ตั้งแต่ต้นจนจบกระบวนการของการพัฒนาเลยทีเดียว

Workspace คือ Feature หนึ่งของ Yarn โปรแกรมที่ช่วยจัดการกับ Package เช่นเดียวกับ NPM

Feature นี้จะให้โฟลเดอร์ `node_modules` จาก Root ของ Project เป็นศูนย์รวมของซอร์สโค้ดของ Dependency ของ Subproject ทั้งหมด นั่นหมายความว่า แต่ละ Subproject ไม่จำเป็นต้องมีโฟลเดอร์ `node_modules` เป็นของตัวเองอีกต่อไป ลดการมีซอร์สโค้ดซ้ำกรณีที่มีหลาย Subproject ใช้ Dependency ตัวเดียวกัน ซึ่งช่วยลดการใช้พื้นที่ฮาร์ดดิสก์ลงไปมากทีเดียว

นอกจากช่วยประหยัดพื้นที่ฮาร์ดดิสก์แล้ว การแชร์ `node_modules` ยังช่วยอำนวยสะดวกให้หลายอย่าง เราสามารถจัดการ Dependency ทั้งการเพิ่ม Package และการลบ Package ได้ด้วยคำสั่งของ Yarn คำสั่งเดียว

ก่อนเริ่มใช้งาน Yarn Workspace เราต้องติดตั้ง Yarn ลงในเครื่องก่อน ซึ่งการติดตั้ง สามารถเข้าไปดูได้[ที่นี่](https://classic.yarnpkg.com/en/docs/install)

ต่อจากนี้ ให้เราเข้าไปที่ Project ของเรา ทำการแก้ package.json โดยเพิ่ม Property "workspaces" และกำหนดที่อยู่ของ Subproject ทั้งหมดในรูปแบบดังนี้

```json
"workspaces": {
    "packages": [
    "packages/*",
    "services/*"
    ]
},
```

ไฟล์ `package.json` ตอนนี้ควรเป็นดังนี้

```json
{
  "name": "root",
  "private": true,
  "devDependencies": {
    "lerna": "^3.20.2"
  },
  "workspaces": {
    "packages": ["packages/*", "services/*"]
  },
  "scripts": {
    "start:all": "lerna run start --scope='@lerna-test/*-service' --parallel"
  }
}
```

แก้ไขไฟล์ `lerna.json` เพิ่มข้อมูลทั้งสองตัวนี้ลงไป

```json
// lerna.json

{
    ...
    "npmClient": "yarn",
    "useWorkspaces": true,
    ...
}
```

`npmClient` — ให้ Lerna สามารถใช้ตัวจัดการ Package ตามที่เราต้องการได้ หากเปลี่ยนเป็น Yarn หมายความว่า Lerna จะใช้ Yarn แทน NPM ทำคำสั่งต่าง ๆ

`useWorkspaces` — ใส่ค่าเป็น true เพื่อเปิดใช้ Yarn Workspace

เป็นอันเสร็จ เราได้เปิดใช้ Yarn Workspace ใน Project แล้ว

การเปลี่ยนแปลงนี้จะมีผลอย่างไรบ้าง?

- **ลดจำนวนไฟล์ `package-lock.json`** — นอกจากโฟลเดอร์ `node_modules` แล้ว Workspace ยังช่วยลดจำนวนไฟล์ `package-lock.json` ด้วย ไฟล์นี้เป็นไฟล์ที่เก็บเวอร์ชัน ข้อมูลและที่อยู่ของซอร์สโค้ดใน NPM Server ของ Dependency ต่าง ๆ ซึ่งปกติแล้วมันต้องอยู่คู่กับ `package.json` แต่ Workspace จะทำให้ไฟล์นี้ไม่จำเป็นอีก มันจะเปลี่ยนไปเก็บไว้ในไฟล์ `yarn.lock` ที่อยู่ใน Root ของ Project แทน ซึ่งช่วยลดความขัดแย้งของ Dependency ได้มาก

- **ความเร็วในการทำคำสั่ง** — Yarn ทำคำสั่งเร็วและมีประสิทธิภาพกว่า NPM

- **การทำคำสั่งของ Lerna** — หากลองรัน `lerna add` หรือ `lerna run` จะเห็นว่า Lerna ใช้ Yarn ทำงานแทน NPM

- **การทำคำสั่งของเรา** — เราต้องใช้ Yarn แทน NPM ทำคำสั่งต่าง ๆ เพื่อให้ได้ประสิทธิภาพสูงสุด

- **การเพิ่ม Package** — เราสามารถใช้ `yarn add <package-name>` ในการเพิ่ม Package ลงใน Subproject หนึ่งได้ อีกทั้งถ้าต้องการติดตั้ง Package ทั้งหมดใหม่ (ที่มักจะทำกันตอน Git clone ใหม่ ๆ) เราสามารถใช้คำสั่ง yarn หรือ yarn install คำสั่งเดียวได้ มันจะไม่เกิด Error `E404` ที่เกิดจากการค้นหา Package ใน NPM Server (ยกเว้นถ้าจะติดตั้ง Subproject เป็น Dependency จะไม่สามารถทำได้ ต้องใช้ `lerna add`)

- **การลบ Package** — เราสามารถใช้ `yarn remove <package-name>` ในการลบ Package ได้ด้วย ซึ่งสามารถลบได้อย่างราบรื่นเช่นเดียวกับตอนเพิ่ม Package **แต่ก็ยังมีข้อจำกัดอยู่ก็คือ **เราไม่สามารถใช้คำสั่งนี้ลบ Package ในหลาย Subproject พร้อมกันได้\*\* หากต้องการลบพร้อมกัน ให้ลบชื่อ Package ที่เราต้องการลบในไฟล์ package.json เอง จากนั้นใช้คำสั่ง lerna clean และ lerna bootstrap แทน

- **การติดตั้ง Common Package** — หากเราจะติดตั้ง Package ที่ Root ของ Project เราต้องใช้คำสั่ง `yarn add <package-name> -W` เพื่อให้ Yarn ยอมรับการติดตั้ง Package ที่ Root ของ Project (-W มีชื่อ Option เต็ม ๆ คือ--ignore-workspace-root-check)

# สรุปและทิ้งท้าย

เราได้รู้จักกับ Lerna ที่เป็นเครื่องมือช่วยจัดการ Project ภายใน Project ไปแล้ว ในบล็อกนี้ได้แสดงวิธีการเริ่มต้น Project ใหม่ และการสร้าง Subproject ด้วย Lerna รวมไปถึงการใช้คำสั่งของ Lerna เพื่อติดตั้ง Package และรันคำสั่งต่าง ๆ ซึ่งคำสั่งที่ยกมามีดังนี้

- `lerna add` — ช่วยติดตั้ง Dependency ใน Subproject ที่เลือกไว้

- `lerna exec` — ช่วยรันคำสั่ง Command line ใน Subproject ที่เลือกไว้

- `lerna run` — ช่วยรัน NPM Script ใน Subproject ที่เลือกไว้

- `lerna bootstrap` — ช่วยติดตั้ง Dependency ต่าง ๆ ที่อยู่ในไฟล์ package.json ของ Subproject และช่วยสร้างไฟล์ Symlink เชื่อมกับซอร์สโค้ดของ Subproject ที่เป็น Dependency ของ Subproject อื่น

- `lerna clean` — ช่วยลบโฟลเดอร์ node_modules ใน Subproject ที่เลือกไว้

ความสามารถของ Lerna ยังไม่หมดเพียงเท่านี้นะคะ หากคุณผู้อ่านสนใจต้องการเรียนรู้เพิ่มเติมจากนี้ ก็สามารถเข้าไปดูที่ [Github ของ Lerna](https://github.com/lerna/lerna) ในนี้จะมีรายการคำสั่งและวิธีการใช้อย่างละเอียด

ขอขอบคุณผู้อ่านทุกคนที่อ่านบล็อกนี้จนจบด้วยนะคะ กด 👏 เพื่อเป็นกำลังใจให้ให้ผู้เขียนได้ ถ้ามีคำแนะนำหรือคำติชมอะไร สามารถ Comment ได้เลยนะคะ

พบกันใหม่ในบล็อกหน้า สวัสดีค่ะ

---

_This article was originally published at [Medium.com](https://medium.com/@icegotchafantasoxy/introduction-to-lerna-tool-for-monorepos-7a3d6fe4d65c)_
