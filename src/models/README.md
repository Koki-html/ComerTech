# 📊 Database Models Documentation

Mongoose schema definitions and TypeScript interfaces for the e-commerce platform.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [Models Overview](#models-overview)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)

---

## Quick Reference

| Model | Purpose | Key Fields |
|-------|---------|-----------|
| **Person** | Customer accounts | name, rut, email, address |
| **Product** | Catalog items | model, brand, price, stock, specs |
| **Order** | Purchases | receipt_number, products, total_price |
| **Payment** | Transactions | order_id, amount, method, status |
| **Shipment** | Delivery tracking | tracking_number, company, status |
| **Support Chat** | Support tickets | person_id, order_number, status |
| **Support Messages** | Chat messages | chat_id, sender, content |

---

## Models Overview

### Person Model (`person.ts`)

Customer and user information for authentication and profile management.

```typescript
interface IPerson extends Document {
  name: string
  rut: string  // National ID
  mail: { mail_adress: string; is_verified: boolean }
  phone: string
  alt_phone?: string
  password_hash: string
  birth_date: Date
  gender: string
  adress: { region: string; comune: string; street: string; number: string; apartment?: string }
}
```

---

### Product Model (`product.ts`)

Catalog items with polymorphic specifications based on product type.

```typescript
interface IProduct {
  name: string
  model: string  // SKU
  brand: string
  price: number
  type_product: string  // cellphone, clothes, videogame, etc.
  stock: number
  specs: IFeatureCellPhones | IFeatureClothes | IFeatureVideogames  // Dynamic by type
  description: string
  images: string[]
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface IFeatureCellPhones { ram: number; storage: string }
interface IFeatureClothes { size?: string; color?: string }
interface IFeatureVideogames { platform?: string }
```

---

### Order Model (`order.ts`)

Customer purchases combining multiple products.

```typescript
interface IOrder {
  receipt_number: string  // Unique order ID
  person_id: ObjectId  // Reference to Person
  products: {
    product_id: ObjectId
    amount: number
    unit_price: number
  }[]
  total_price: number
  status: string  // pending, confirmed, etc.
  created_at: Date
  updated_at: Date
}
```

---

### Payment Model (`payment.ts`)

Payment transactions for orders.

```typescript
interface IPayment {
  order_id: ObjectId  // Reference to Order
  amount: number
  payment_method: string  // credit_card, debit_card, etc.
  status: string  // pending, completed, failed
  created_at: Date
}
```

---

### Shipment Model (`shipment.ts`)

Delivery tracking information.

```typescript
interface IShipment {
  company: string  // Shipping carrier
  tracking_number: string  // Unique tracking ID
  receipt_number: string  // Order reference
  mailing_address: string
  status: string  // pending, shipped, delivered
}
```

---

### Support Chat Model (`support_chat.ts`)

Support ticket conversations for customer service.

```typescript
interface ISupportChat {
  person_id: ObjectId  // Reference to Person
  number_order: string  // Related order
  status: string  // open, closed, resolved
  created_at: Date
  updated_at: Date
}
```

---

### Support Messages Model (`support_message.ts`)

Individual messages within support chats.

```typescript
interface ISupportMessages {
  chat_id: ObjectId  // Reference to SupportChat
  sender: string  // customer or support agent
  content: string
  is_read: boolean
  date_time: Date
}
```

---

## Complete Example

Full workflow from customer registration through order fulfillment:

```typescript
import { Person } from './models/person';
import { ProductModel } from './models/product';
import { OrderModel } from './models/order';
import { PaymentModel } from './models/payment';
import { ShipmentModel } from './models/shipment';
import { SupportChatModel } from './models/support_chat';
import { SupportMessagesModel } from './models/support_message';

// 1️⃣ Register a new customer
const customer = await Person.create({
  name: "John Doe",
  rut: "12.345.678-9",
  mail: { mail_adress: "john@example.com", is_verified: false },
  phone: "+56912345678",
  password_hash: await bcrypt.hash("password123", 10),
  birth_date: new Date("1990-01-01"),
  gender: "Male",
  adress: {
    region: "Santiago",
    comune: "Ñuñoa",
    street: "Main Street",
    number: "123",
    apartment: "4B"
  }
});

// 2️⃣ Create products in catalog
const iPhone = await ProductModel.create({
  name: "iPhone 15",
  model: "IPHONE-15-128GB",
  brand: "Apple",
  price: 999,
  type_product: "cellphone",
  stock: 50,
  specs: { ram: 6, storage: "128GB" },
  description: "Latest Apple smartphone",
  images: ["img1.jpg"],
  is_active: true
});

const shirt = await ProductModel.create({
  name: "Cotton Shirt",
  model: "SHIRT-001",
  brand: "Nike",
  price: 49,
  type_product: "clothes",
  stock: 100,
  specs: { size: "L", color: "blue" },
  description: "Comfortable cotton shirt",
  images: ["shirt.jpg"],
  is_active: true
});

// 3️⃣ Create an order
const order = await OrderModel.create({
  receipt_number: "ORD-2026-001",
  person_id: customer._id,
  products: [
    { product_id: iPhone._id, amount: 1, unit_price: 999 },
    { product_id: shirt._id, amount: 2, unit_price: 49 }
  ],
  total_price: 1097,
  status: "pending"
});

// 4️⃣ Process payment
const payment = await PaymentModel.create({
  order_id: order._id,
  amount: 1097,
  payment_method: "credit_card",
  status: "completed"
});

// 5️⃣ Update order status and create shipment
await OrderModel.updateOne({ _id: order._id }, { status: "confirmed" });

const shipment = await ShipmentModel.create({
  company: "DHL",
  tracking_number: "DHL123456789",
  receipt_number: order.receipt_number,
  mailing_address: "123 Main St, Santiago, Chile",
  status: "pending"
});

// 6️⃣ Customer needs support - create chat
const supportChat = await SupportChatModel.create({
  person_id: customer._id,
  number_order: order.receipt_number,
  status: "open"
});

// 7️⃣ Exchange messages
await SupportMessagesModel.create({
  chat_id: supportChat._id,
  sender: "customer@example.com",
  content: "Where is my order?",
  is_read: false
});

await SupportMessagesModel.create({
  chat_id: supportChat._id,
  sender: "support@example.com",
  content: "Your order is on the way. Tracking: DHL123456789",
  is_read: false
});

// 8️⃣ Retrieve order with related data
const orderWithDetails = await OrderModel.findById(order._id)
  .populate('person_id')
  .populate('products.product_id')
  .lean();

console.log(orderWithDetails);
// Output: { receipt_number, person_id: {...}, products: [...], total_price, ... }
```

---

## Best Practices

### Schema Design
- Use TypeScript interfaces for type safety
- Set `required: true` for mandatory fields
- Use `unique: true` for unique constraints (email, RUT, tracking numbers)
- Create indexes on frequently queried fields

### Relationships
- Use `ref` to establish references between collections
- Use `.populate()` to fetch related documents
- Consider denormalization for frequently accessed data

### Security
- Hash passwords with bcrypt before storing
- Validate all input data before saving
- Use unique indexes on sensitive fields (email)
- Implement proper access control checks

### Performance
- Use `.lean()` for read-only queries
- Implement pagination for large result sets
- Add indexes on fields used in queries
- Use aggregation pipelines for complex queries

---
