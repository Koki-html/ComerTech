# 🗄️ ComerTech

Repository for the fourth evaluation of the **NoSQL Databases** course at **INACAP (2026)**.

A comprehensive e-commerce platform database solution using MongoDB and Mongoose, demonstrating document-oriented database design principles.

---

## 📖 Table of Contents

- [🗄️ ComerTech](#️-comertech)
  - [📖 Table of Contents](#-table-of-contents)
  - [📖 Project Overview](#-project-overview)
    - [Objectives](#objectives)
  - [🛠️ Technologies](#️-technologies)
  - [🏗️ Project Structure](#️-project-structure)
  - [📊 Database Model](#-database-model)
    - [Core Collections](#core-collections)
    - [Support Collections](#support-collections)
  - [⚙️ Installation](#️-installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [🚀 Usage](#-usage)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
    - [Testing](#testing)
  - [📡 API Endpoints](#-api-endpoints)
    - [Products](#products)
    - [Customers (Persons)](#customers-persons)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [👨‍💻 Author](#-author)

---

## 📖 Project Overview

This project presents the design of a **NoSQL database** for an e-commerce platform using **MongoDB** and **Mongoose**.

### Objectives

The objective is to model and implement the following business domains while applying document-oriented database principles:

- 📦 Product Management
- 👥 Customer Information & Profiles
- 🛒 Orders & Order Management
- 💳 Payment Processing
- 📮 Shipment Tracking
- 💬 Customer Support System

---

## 🛠️ Technologies

| Technology | Purpose                           | Version |
| ---------- | --------------------------------- | ------- |
| Node.js    | Runtime Environment               | Latest  |
| MongoDB    | NoSQL Document Database           | -       |
| Mongoose   | MongoDB Object Modeling           | ^9.7.2  |
| Express.js | REST API Framework                | ^5.2.1  |
| TypeScript | Type-Safe JavaScript              | -       |
| Vite       | Frontend Build Tool               | ^8.0.16 |

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── main.ts                 # Application entry point
│   ├── controllers/            # Request handlers
│   ├── routes/                 # API route definitions
│   ├── models/                 # Mongoose schemas & interfaces
│   │   ├── person.ts          # Person/Customer model
│   │   └── product.ts         # Product model
│   └── database/
│       └── seed/              # Database seeding scripts
├── public/                    # Static files
│   ├── index.html
│   ├── media/                 # Images and media assets
│   └── style/                 # CSS stylesheets
├── database.json              # Database configuration
├── package.json
└── README.md
```

---

## 📊 Database Model

The database is composed of the following collections:

### Core Collections

| Collection       | Purpose                          |
| --------------- | -------------------------------- |
| **Products**    | E-commerce product catalog       |
| **Persons**     | Customer & user information      |
| **Orders**      | Customer purchases & transactions |
| **Payments**    | Payment transaction records      |
| **Shipments**   | Delivery tracking information    |

### Support Collections

| Collection          | Purpose                          |
| ------------------- | -------------------------------- |
| **Support Chats**   | Customer support conversations   |
| **Support Messages**| Individual messages in chats     |

---

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Koki-html/DB-NoSQL-4-Evaluation.git
   cd DB-NoSQL-4-Evaluation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create a .env file with your MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/db-nosql-evaluation
   PORT=3000
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

---

## 🚀 Usage

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Testing

```bash
npm test
```

---

## 📡 API Endpoints

*(To be documented based on your controllers)*

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers (Persons)
- `GET /api/persons` - List all customers
- `GET /api/persons/:id` - Get customer details
- `POST /api/persons` - Register new customer
- `PUT /api/persons/:id` - Update customer
- `DELETE /api/persons/:id` - Delete customer

---

## 🤝 Contributing

This is an academic project. For improvements or bug reports, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Koki** - Created for INACAP NoSQL Databases Course (2026)

---

**Last Updated:** June 2026