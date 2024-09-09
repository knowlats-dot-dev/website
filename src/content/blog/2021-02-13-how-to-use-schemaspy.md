---
slug: how-to-use-schemaspy
title: แนะนำ SchemaSpy เครื่องมือทำเอกสาร Database
description: มาดูวิธีการสร้างคลังข้อมูลที่เกี่ยวกับ Database ของเราภายในไม่กี่วินาทีด้วย SchemaSpy กัน
image: /assets/image/post/how-to-use-schemaspy/heading.jpg
date: 2021-02-12T17:00:00.000Z
category: useful-tools
tags:
  - database
  - documentation
  - tools
  - schemaspy
---

### Contents

# Introduction

ถ้าระบบของเรามีฐานข้อมูลที่เป็น Rational Database การทำเอกสารเกี่ยวกับมันเป็นงานที่สำคัญ เพราะจะทำให้ทุกคนที่เกี่ยวข้องเข้าใจการเก็บข้อมูลในระบบของเรามากขึ้น แต่ด้วยความซับซ้อนของมัน งานนี้จึงเป็นงานที่ใช้เวลาทำนานและค่อนข้างน่าเบื่อ ในปัจจุบัน มีเครื่องมือช่วยสร้างเอกสารให้เรามากมาย มีทั้งฟรีและไม่ฟรี ในบทความนี้ ผู้เขียนจะแนะนำให้คุณผู้อ่านรู้จักกับเครื่องมือตัวหนึ่ง ที่มีขนาดเล็ก ใช้งานง่าย เก็บข้อมูลได้ครบ ที่สำคัญคือ **ฟรี!** เครื่องมือตัวนี้มีชื่อว่า **SchemaSpy**

# SchemaSpy คืออะไร?

**SchemaSpy** เป็นโปรแกรมประเภท Command Line เขียนด้วยภาษา Java มันจะช่วยวิเคราะห์ เก็บข้อมูลของฐานข้อมูลของเรา และสร้างเอกสารออกมาเป็นเว็บที่สวยงาม ภายในเอกสารนอกจากจะมีข้อมูลเกี่ยวกับตารางและส่วนอื่น ๆ ที่จำเป็นแล้ว ยังมีแผนภาพ ER Diagram ให้เราอีกด้วย

![รูปแสดงตัวอย่างเอกสารที่สร้างขึ้นจาก SchemaSpy](/assets/image/post/how-to-use-schemaspy/00.png)

รูปภาพที่แสดงอยู่นี้คือตัวอย่างเอกสาร Database ที่ SchemaSpy สร้างขึ้น สามารถดูได้ที่ [http://schemaspy.org/sample/index.html](http://schemaspy.org/sample/index.html)

# ก่อนที่จะใช้งาน SchemaSpy

## ติดตั้ง JRE ลงเครื่อง

ก่อนที่จะใช้งาน SchemaSpy จะต้องมี JRE (Java Runtime Environment) เวอร์ชัน 8 หรือมากกว่าในเครื่องคอมของเราก่อน ถ้ายังไม่มีก็สามารถดาวน์โหลไฟล์ติดตั้งได้ที่เว็บ [java.net](https://www.java.com/en/download/manual.jsp) แลัวติดตั้งลงเครื่องให้เรียบร้อย

![รูปเว็บไซต์ java.net](/assets/image/post/how-to-use-schemaspy/01.png)

> ถ้าคุณผู้อ่านใช้ Ubuntu ปกติมันจะมี JRE 8 อยู่ในเครื่องอยู่แล้ว แต่ถ้าไม่มี หรือต้องการติดตั้งเวอร์ชันอื่นเพิ่มก็สามารถดูและทำตาม[บทความของ DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-20-04) ได้เลย

## ดาวน์โหลด JDBC Driver

เมื่อมี JRE ในเครื่องแล้วก็ให้ดาวน์โหลด **JDBC Driver** หรือ **Connector/J** ตามชนิดหรือยี่ห้อของ Database ที่ใช้งานอยู่ ตัวนี้จะทำหน้าที่เชื่อมต่อ Database เข้ากับโปรแกรมที่เขียนด้วย Java อย่าง SchemaSpy ในที่นี้จะแสดงวิธีการดาวน์โหลด JDBC Driver ของฐานข้อมูลที่เรานิยมใช้กัน ได้แก่ MySQL, MariaDB, Postgresql และ Microsoft SQL Server (ขอย่อว่า MSSQL)

### MySQL

เข้าไปที่เว็บ URL [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/) เลือก "**Platform Independent"** ที่ **Select Operating System** รอสักครู่ มันจะ Render รายการไฟล์แสดงบนเว็บ เมื่อมีรายการออกมาแล้ว ให้คลิกปุ่ม Download ที่อยู่แถว `ZIP Archive` เราจะได้ไฟล์ zip ไฟล์หนึ่ง

![รูปหน้าจอดาวน์โหลดของเว็บไซต์ MySQL เมื่อเลือก "Platform Independent" จะแสดงรายการไฟล์ขึ้นมา 2 รายการ คือ ไฟล์รูปแบบ .tar.gz และ .zip](/assets/image/post/how-to-use-schemaspy/02.png)

ภายในมีไฟล์ JAR ที่ชื่อว่า `mysql-connector-java-[version]` ให้เก็บไฟล์นี้ไว้

![รูปแสดงภายในไฟล์ zip จะมีไฟล์ที่ชื่อ mysql-connector-java ตามด้วย version ของไฟล์ ลงท้ายด้วย .jar](/assets/image/post/how-to-use-schemaspy/03.png)

### MariaDB

เข้าไปที่เว็บ URL [https://downloads.mariadb.org/connector-java/](https://downloads.mariadb.org/connector-java/) คลิกปุ่ม **Download Now!** ที่เวอร์ชันล่าสุด

![รูปหน้าเว็บไซต์ MariaDB จะมีกรอบแสดง Version เป็น Series ให้เลือกดาวน์โหลด](/assets/image/post/how-to-use-schemaspy/04.png)

เลือกแหล่งดาวน์โหลดที่ Mirror และคลิกที่ลิงก์ในช่อง File name แถวที่ **Package Type** เป็น **Jar**

![รูปหน้าจอดาวน์โหลดไฟล์ Connector/J ของเว็บไซต์ MariaDB มีตารางแสดงรายการไฟล์ที่ดาวน์โหลดได้อยู่ด้านซ้าย ซึ่งจะเป็นไฟล์ JAR ที่มีซอร์สโค้ด แลพที่ไม่มีซอร์สโค้ด  และกรอบแสดงแหล่งดาวน์โหลด (Mirror) อยู่ด้านขวา](/assets/image/post/how-to-use-schemaspy/05.png)

คลิกที่ `mariadb-java-client-[version].jar`

![รูปหน้าจอรายการไฟล์ Connector/J เป็นไฟล์ JAR ที่ไม่มีซอร์สโค้ดของเว็บไซต์ MariaDB เราต้องเลือกไฟล์ที่ชื่อ mariadb-java-client ตามด้วยเวอร์ชัน และลงท้ายด้วย .jar](/assets/image/post/how-to-use-schemaspy/06.png)

เราจะได้ JDBC Driver ของ MariaDB เป็นไฟล์ JAR ในเครื่อง

### Postgresql

เข้าไปที่เว็บ URL [https://jdbc.postgresql.org/download.html](https://jdbc.postgresql.org/download.html) ให้คลิกดาวน์โหลดที่ลิงก์ในส่วนของ **Current Version** (เวอร์ชันล่าสุด) หรือ **Other Versions** แล้วเราจะได้ไฟล์ JAR มาหนึ่งไฟล์

![รูปเว็บไซต์ดาวน์โหลด JDBC ของ Postgresql](/assets/image/post/how-to-use-schemaspy/07.png)

### Mssql

เข้าไปที่เว็บ URL [https://docs.microsoft.com/en-us/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server](https://docs.microsoft.com/en-us/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server) จากนั้นคลิกที่ **`Download Microsoft JDBC Driver [version] for SQL Server (zip)`** เราจะได้ไฟล์ zip ให้คลาย zip ออกมา ภายในจะมีไฟล์ JAR อยู่หลายไฟล์ แต่ละไฟล์มีชื่อลงท้ายด้วยเวอร์ชันของ JRE ให้เก็บไฟล์ที่มีชื่อเวอร์ชัน JRE ตรงกับเวอร์ชันที่เราลงในเครื่อง

![รูปแสดงไฟล์ Connector/J ของ MSSQL ในที่นี้มีไฟล์ JAR 3 ไฟล์ แต่ละไฟล์จะมีชื่อลงท้ายด้วย JRE คือ .jre8, .jre11 และ .jre15](/assets/image/post/how-to-use-schemaspy/08.png)

## ติดตั้ง GraphViz

**GraphViz** เป็น Package หนึ่งที่ช่วยวาดแผนภาพที่มีการเชื่อมโยงกันเป็นเครือข่ายและ Graph เช่น Flow Chart, Data Model เป็นต้น SchemaSpy ใช้ตัวนี้ในการวาด ER Diagram เราจึงจำเป็นต้องติดตั้งมันลงในเครื่องด้วย การติดตั้งสามารถดูได้ที่[เว็บไซต์ของ GraphViz](https://graphviz.org/download/)

สำหรับการติดตั้งใน Windows วิธีการที่ง่ายที่สุดคือ ติดตั้งผ่าน Chocolatey หรือ WinGet

```bash
// Chocolatey
> choco install graphviz

// WinGet
>  winget install graphviz
```

หากเราไม่มี Chocolatey หรือ WinGet ก็ดาวน์โหลดตัวติดตั้งเป็นไฟล์ `.exe` ในเว็บไซต์ของ GraphViz และดับเบิ้ลคลิกที่ไฟล์เพื่อติดตั้ง เมื่อมาถึงหน้าจอ **Install Options** เราจะต้องเลือกให้ GraphViz เพิ่มตัวรันโปรแกรมลงใน PATH ของ Windows เพื่อให้มันสามารถถูกเรียกใช้ได้จาก Command Line

![รูปแสดงหน้าจอการติดตั้ง GraphViz ในส่วนของ Install Options ต้องเลือก Add GraphViz to the system PATH for all user หรือ  Add GraphViz to the system PATH for current user เพื่อให้ GraphVizสามารถถูกเรียกใช้ได้จาก Command Line](/assets/image/post/how-to-use-schemaspy/09.png)

หลังจากติดตั้งเสร็จเรียบร้อย ให้เปิด Powershell หรือ Terminal ที่ใช้งานอยู่ โดยใช้สิทธิ์ของ Administrator แล้วพิมพ์ `dot -c` เพื่อลงทะเบียน Plugin ต่าง ๆ ของ GraphViz ให้ Windows รู้จัก

![รูปแสดงหน้าจอ Powershell ที่พิมพ์ dot -c ลงไป](/assets/image/post/how-to-use-schemaspy/10.png)

ต่อจากนั้นให้พิมพ์คำสั่ง `dot -v` เพื่อดูว่า GraphViz ถูกตั้งค่าเรียบร้อยแล้วหรือยัง?

![รูปแสดงหน้าจอ Powershell ที่พิมพ์ dot -v ลงไป แล้วมีรายละเอียดการ Render ขึ้นมา](/assets/image/post/how-to-use-schemaspy/11.png)

ถ้าขึ้นเวอร์ชัน และรายละเอียดการ Render ตามรูปนี้ แสดงว่าเราได้ติดตั้ง GraphViz เสร็จสมบูรณ์แล้ว ต่อไปเราก็ดาวน์โหลด SchemaSpy มาใช้ได้เลย

# การดาวน์โหลด SchemaSpy

ให้ดาวน์โหลดที่ [SchemaSpy.org](http://schemaspy.org/) เราก็จะได้โปรแกรม SchemaSpy เป็นไฟล์ JAR มา (ในที่นี้ได้ไฟล์ชื่อ `schemaspy-6.1.0.jar`) สามารถใช้งานได้เลย ไม่ต้องติดตั้งลงเครื่อง

![รูปแสดงเว็บไซต์ schemaspy.org](/assets/image/post/how-to-use-schemaspy/12.png)

# การใช้งาน SchemaSpy

เปิด Terminal แล้วไปที่โฟลเดอร์ที่เราเก็บโปรแกรมด้วยคำสั่ง `cd` พิมพ์คำสั่งผ่าน Terminal รูปแบบดังนี้

```bash
java -jar schemaspy-6.1.0.jar
     -t [database dialect]
     -db [database name]
     -s [schema name]
     -host [server address]
     -port [port]
     -u [user]
     -p [password]
     -o [output path]
     -dp [jdbc driver path]
```

ตัวอย่าง

```bash
java -jar schemaspy-6.1.0.jar -t mysql -db 'sample_database' -s 'sample_database' -host 'localhost' -port 3306 -u 'root' -p '123456' -o db-output -dp ./mysql-connector-java-8.0.23.jar
```

จากคำสั่ง ให้เราแทนที่ `[...]` ที่อยู่ในแต่ละ Argument (`-xx`) ด้วยข้อมูลของ Database ของเราเอง ทั้งนี้ หากเราต้องการดูความหมายและรายละเอียดของ Argument ต่าง ๆ เพิ่มเติม ก็สามารถดูที่ [Document ของ GraphViz](https://schemaspy.readthedocs.io/en/latest/configuration/commandline.html) ได้เลย

Note เกี่ยวกับบาง Argument เล็กน้อย (เท่าที่ลองใช้งานดู):

- `-t [database dialect]` มีไว้กำหนดยี่ห้อหรือชนิดของฐานข้อมูล โดยทั่วไปให้ใช้ `mysql` สำหรับ MySQL, `mariadb` สำหรับ MariaDB, `pgsql` หรือ `pgsql11` สำหรับ Postgresql, `mssql08` สำหรับ Microsoft SQL Server รุ่น 2008 ขึ้นไป หากเราใช้ยี่ห้ออื่นนอกเหนือจากนี้ให้พิมพ์คำสั่งนี้เพื่อดูชื่อยี่ห้อ Database ทั้งหมดที่ SchemaSpy รู้จัก
  `java -jar schemaspy-6.1.0.jar -dbhelp`
  นอกจากชื่อยี่ห้อแล้ว คำสั่งนี้ยังแสดง Argument ที่จำเป็นต้องใช้ในแต่ละยี่ห้อด้วย
- `-s [schema name]` มีไว้กำหนด Schema ที่เก็บตารางต่าง ๆ ใน Database บางยี่ห้อ จะมีการแบ่งหมวดหมู่เก็บตารางเป็น Schema ยกตัวอย่าง โดย Default **Postgresql** จะเก็บตารางต่าง ๆ ใน Schema ชื่อว่า `public` ส่วน **Microsoft SQL Server** จะเก็บตารางใน Schema ชื่อ `dbo` สำหรับ MySQL และ MariaDB จะไม่มี Schema แต่บางครั้ง SchemaSpy จะฟ้องให้ใช้ชื่อ Schema ลงไปด้วย หากเกิดเหตุการณ์นี้ขึ้นให้ใส่ชื่อ Schema เป็นชื่อเดียวกับ Database แล้วจะสร้างเอกสารได้ (Solution มาจาก [issue นี้](https://github.com/schemaspy/schemaspy/issues/329))
- `-o db-output` ใช้กำหนด Path ของโฟลเดอร์ของเอกสารที่จะให้ SchemaSpy สร้างขึ้นมา
- `-dp [jdbc driver path]` ใช้กำหนด Path ของ JDBC Driver เป็นไฟล์ JAR ที่เราดาวน์โหลดเก็บไว้ก่อนหน้านี้

เมื่อทำคำสั่ง ผลลัพธ์ที่ถูกต้อง จะแสดงบน Terminal ดังรูปนี้

![รูปแสดงผลลัพธ์หลังจากทำคำสั่ง ผลลัพธ์ที่ถูกต้องจะต้องแสดงว่า "เขียนเสร็จในเวลา ... วินาที"](/assets/image/post/how-to-use-schemaspy/13.png)

แล้วโฟลเดอร์ตาม Path ที่กำหนดใน `-o` จะปรากฎขึ้นมา เมื่อเราไปเปิดดูจะเห็นไฟล์และโฟลเดอร์เยอะแยะเต็มไปหมด ทั้งหมดนี้เป็นส่วนประกอบของเอกสารที่ SchamaSpy สร้างขึ้น เมื่อเราจะเปิดอ่านก็ให้ดับเบิลคลิกที่ไฟล์ `index.html` เอกสารก็จะปรากฎขึ้นมาในหน้าต่าง Browser
