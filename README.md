# 🗄️ ComerTech

Repository for the fourth evaluation of the **NoSQL Databases** course at **INACAP (2026)**.

A comprehensive e-commerce platform database solution using MongoDB and Mongoose, demonstrating document-oriented database design principles.

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Getting Started](#getting-started)
- [Current Status](#current-status)
- [Development Roadmap](#development-roadmap)
- [Documentation](#documentation)
- [Author](#author)

---

## 📖 Project Overview

This project presents a fully-designed **NoSQL database** for an e-commerce platform using **MongoDB** and **Mongoose**, with comprehensive TypeScript interfaces and schema definitions.

### Objectives

The project models and implements the following business domains:

- 📦 Product Management (with polymorphic specifications)
- 👥 Customer Information & Authentication
- 🛒 Orders & Order Management
- 💳 Payment Processing
- 📮 Shipment Tracking
- 💬 Customer Support System (Chats & Messages)

---

## 🛠️ Technologies

| Technology | Purpose                           | Version |
| ---------- | --------------------------------- | ------- |
| Node.js    | Runtime Environment               | Latest  |
| MongoDB    | NoSQL Document Database           | -       |
| Mongoose   | MongoDB Object Modeling           | ^9.7.2  |
| Express.js | REST API Framework                | ^5.2.1  |
| TypeScript | Type-Safe JavaScript              | -       |

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── main.ts                      # Application entry point (WIP)
│   ├── controllers/                 # Request handlers (WIP)
│   ├── routes/                      # API route definitions (WIP)
│   ├── models/                      # ✅ Mongoose schemas & interfaces
│   │   ├── person.ts               # Customer/User model
│   │   ├── product.ts              # Product catalog model
│   │   ├── order.ts                # Order model
│   │   ├── payment.ts              # Payment model
│   │   ├── shipment.ts             # Shipment tracking model
│   │   ├── support_chat.ts         # Support chat model
│   │   ├── support_message.ts      # Support message model
│   │   └── README.md               # Models documentation
│   └── database/
│       └── seed/                   # Database seeding scripts (WIP)
├── public/                         # Static files
│   ├── index.html
│   ├── media/                      # Images and media assets
│   └── style/                      # CSS stylesheets
├── database.json                   # Database configuration
├── package.json
└── README.md
```

---

## 📊 Database Models

All 7 collections are fully modeled with TypeScript interfaces and Mongoose schemas:

### Core Collections

| Collection | Model File | Status | Purpose |
|-----------|-----------|--------|---------|
| **Persons** | `person.ts` | ✅ Complete | Customer accounts & authentication |
| **Products** | `product.ts` | ✅ Complete | E-commerce catalog with polymorphic specs |
| **Orders** | `order.ts` | ✅ Complete | Customer purchases |
| **Payments** | `payment.ts` | ✅ Complete | Payment transactions |
| **Shipments** | `shipment.ts` | ✅ Complete | Delivery tracking |

### Support Collections

| Collection | Model File | Status | Purpose |
|-----------|-----------|--------|---------|
| **Support Chats** | `support_chat.ts` | ✅ Complete | Support ticket conversations |
| **Support Messages** | `support_message.ts` | ✅ Complete | Messages within chats |

**For detailed model documentation, see [src/models/README.md](src/models/README.md)**

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Koki-html/DB-NoSQL-4-Evaluation.git
   cd DB-NoSQL-4-Evaluation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---


---

## 📝 Documentation

- **[Models Documentation](src/models/README.md)** - Detailed schema definitions and complete workflow example
- **[Package Configuration](package.json)** - Dependencies and project metadata

---

## 🔧 Scripts

Currently defined npm scripts:

```bash
# Run tests (placeholder)
npm test
```

**Future scripts to add:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run seed` - Seed database with sample data

---

## 📡 API Endpoints

*(To be implemented)*


---

## 💡 Key Features

### Polymorphic Product System
Products support dynamic specifications based on type (cellphone, clothes, videogame). The `specs` field uses MongoDB's Mixed type to store type-specific attributes.

### Relationship Management
Models use Mongoose references (`ref`) to establish relationships between collections, enabling efficient data population and queries.

### Type Safety
All models include TypeScript interfaces ensuring compile-time type checking and IDE autocompletion.

### Comprehensive Validation
Schemas define required fields, unique constraints, and default values for data integrity.

---

## 👨‍💻 Author

**Koki** - Created for INACAP NoSQL Databases Course (2026)

---

**Project Status:** Design Phase incomplete | Implementation In Progress

**Last Updated:** June 2026