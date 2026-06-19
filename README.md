# 🗄️ DB-NoSQL-4-Evaluation

Repository for the fourth evaluation of the **NoSQL Databases** course at **INACAP (2026)**.

---

# 📖 Project Overview

This project presents the design of a **NoSQL database** for an e-commerce platform using **MongoDB** and **Mongoose**.

The objective is to model product management, customer information, orders, payments, shipments, and customer support while applying document-oriented database principles.

---

# 🛠️ Technologies

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Express.js | REST API Framework              |
| MongoDB    | NoSQL Database                  |
| Mongoose   | Object Data Modeling (ODM)      |
| Dotenv     | Environment Variable Management |
| Node.js    | JavaScript Runtime              |

---

# 📦 Dependencies

```bash
npm install express mongoose dotenv
```

---

# 🏗️ Database Model

The database is composed of the following collections:

* Product
* Person
* Order
* Payment
* Shipment
* Support Chat
* Support Messages

---

# 📚 Collections

## 🛍️ Product

Stores product information available in the catalog.

### Structure

```json
{
  "model": "",
  "brand": "",
  "price": 0,
  "type_product": "",
  "created_at": "",
  "updated_at": "",
  "stock": 0,
  "specs": {},
  "description": "",
  "images": [],
  "is_active": true
}
```

### Fields

| Field        | Description               |
| ------------ | ------------------------- |
| model        | Product model             |
| brand        | Product manufacturer      |
| price        | Product price             |
| type_product | Product category          |
| created_at   | Creation date             |
| updated_at   | Last update date          |
| stock        | Available inventory       |
| specs        | Technical specifications  |
| description  | Product description       |
| images       | Product image URLs        |
| is_active    | Product visibility status |

---

## 👤 Person

Stores customer information.

### Structure

```json
{
  "name": "",
  "rut": "",
  "mail": {
    "mail_addres": "",
    "is_verified": false
  },
  "phone": "",
  "alt_phone": "",
  "password_hash": "",
  "birth_date": "",
  "gender": "",
  "address": {
    "region": "",
    "commune": "",
    "street": "",
    "number": "",
    "apartment": ""
  }
}
```

### Embedded Documents

#### Mail

```json
{
  "mail_addres": "",
  "is_verified": false
}
```

#### Address

```json
{
  "region": "",
  "commune": "",
  "street": "",
  "number": "",
  "apartment": ""
}
```

---

## 📦 Order

Stores customer purchase orders.

### Structure

```json
{
  "receipt_number": "",
  "person_id": "",
  "products": [
    {
      "product_id": "",
      "amount": "",
      "unit_price": 0
    }
  ],
  "total_price": 0,
  "status": "",
  "created_at": "",
  "updated_at": ""
}
```

### References

| Field     | References |
| --------- | ---------- |
| person_id | Person     |

### Embedded Array

```json
{
  "product_id": "",
  "amount": "",
  "unit_price": 0
}
```

---

## 💳 Payment

Stores payment records associated with orders.

### Structure

```json
{
  "order_id": "",
  "amount": 0,
  "payment_method": "",
  "status": "",
  "created_at": ""
}
```

### References

| Field    | References |
| -------- | ---------- |
| order_id | Order      |

---

## 🚚 Shipment

Stores shipment tracking information.

### Structure

```json
{
  "company": "",
  "tracking_number": "",
  "receipt_number": "",
  "mailing_address": "",
  "status": ""
}
```

---

## 🎧 Support Chat

Stores customer support tickets.

### Structure

```json
{
  "person_id": "",
  "number_order": "",
  "created_at": "",
  "updated_at": "",
  "status": ""
}
```

### References

| Field        | References |
| ------------ | ---------- |
| person_id    | Person     |
| number_order | Order      |

---

## 💬 Support Messages

Stores messages exchanged within a support chat.

### Structure

```json
{
  "chat_id": "",
  "sender": "",
  "content": "",
  "date_time": "",
  "is_read": true
}
```

### References

| Field   | References   |
| ------- | ------------ |
| chat_id | Support Chat |

---

# 📋 NoSQL Design Decisions

## Embedded Documents

The following data structures are embedded because they belong exclusively to their parent document:

* Person → Mail
* Person → Address
* Product → Specs
* Order → Products

This reduces the number of queries required to retrieve related information.

---

## Referenced Documents

References are used when collections represent independent entities:

* Order → Person
* Payment → Order
* Support Chat → Person
* Support Messages → Support Chat

This approach reduces unnecessary data duplication and improves maintainability.

---

# 🎯 Advantages of the Model

* Flexible document structure.
* Easy scalability.
* Reduced need for joins.
* Faster read operations.
* Suitable for e-commerce workloads.
* Follows MongoDB document-oriented principles.

---

# 👨‍💻 Author

**Miguel Burgos - student of Informatic Engineer - Autumn 2026**
