import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

// Import the database connection function
import { db_connect } from './db';

// Import models directly to use them for seeding
import { OrderModel } from '../models/order';
import { PaymentModel } from '../models/payment';
import { PersonModel } from '../models/person';
import { ProductModel } from '../models/product';
import { ShipmentModel } from '../models/shipment';
import { SupportChatModel } from '../models/support_chat';
import { SupportMessageModel } from '../models/support_message';

// Configuration: adjust counts as needed
const PERSON_COUNT = 25;
const PRODUCT_COUNT = 40;
const ORDER_COUNT = 60;

/**
 * Generate a valid Chilean RUT with verification digit (dígito verificador).
 * Uses the modulo 11 algorithm as per official standards.
 * Format: XX.XXX.XXX-K (e.g., 12.345.678-9 or 23.456.789-K)
 */
function generateChileanRUT(): string {
	// Generate random 8-digit number (1,000,000 - 99,999,999)
	const rut = faker.number.int({ min: 1000000, max: 99999999 });
	const rutStr = rut.toString().padStart(8, '0');
	
	// Calculate verification digit using modulo 11
	const weights = [2, 3, 4, 5, 6, 7, 2, 3];
	let sum = 0;
	
	for (let i = 0; i < 8; i++) {
		sum += Number(rutStr[i]) * weights[i];
	}
	
	const remainder = sum % 11;
	let verificationDigit: string;
	
	if (remainder === 0) {
		verificationDigit = '0';
	} else if (remainder === 1) {
		verificationDigit = 'K';
	} else {
		verificationDigit = (11 - remainder).toString();
	}
	
	// Format: XX.XXX.XXX-K
	const formatted = `${rutStr.substring(0, 2)}.${rutStr.substring(2, 5)}.${rutStr.substring(5, 8)}-${verificationDigit}`;
	return formatted;
}

/**
 * Generate a valid Chilean mobile phone number.
 * Format: +56 9 XXXX XXXX (e.g., +56 9 2234 5678)
 */
function generateChileanPhone(): string {
	// Chilean mobile numbers: +56 9 [operator: 22-29] [6 random digits]
	const operator = faker.number.int({ min: 22, max: 29 });
	const number = faker.number.int({ min: 100000, max: 999999 });
	return `+56 9 ${operator} ${number}`;
}

/**
 * Create person documents with realistic fake data.
 */
async function seedPersons(count = PERSON_COUNT) {
	const people = [];
	for (let i = 0; i < count; i++) {
		const person = {
			name: faker.person.fullName(),
			rut: generateChileanRUT(),
			mail: { mail_adress: faker.internet.email(), is_verified: faker.datatype.boolean() },
			phone: generateChileanPhone(),
			alt_phone: faker.datatype.boolean() ? generateChileanPhone() : undefined,
			password_hash: faker.internet.password(),
			birth_date: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
			gender: faker.person.sex(),
			adress: {
				region: faker.location.state(),
				comune: faker.location.city(),
				street: faker.location.street(),
				number: faker.number.int({ min: 1, max: 2000 }).toString(),
				apartment: faker.datatype.boolean() ? `${faker.number.int({ min: 1, max: 50 })}` : undefined
			}
		};
		people.push(person);
	}
	const created = await PersonModel.insertMany(people);
	return created;
}

/**
 * Create product documents with category-specific `specs`.
 */
async function seedProducts(count = PRODUCT_COUNT) {
	const products = [];
	const types = ['cellphone', 'clothes', 'videogame'];
	for (let i = 0; i < count; i++) {
		const type = faker.helpers.arrayElement(types);
		let specs: any = {};
		if (type === 'cellphone') {
			specs = { ram: faker.number.int({ min: 2, max: 16 }), storage: `${faker.helpers.arrayElement(['64GB','128GB','256GB','512GB'])}` };
		} else if (type === 'clothes') {
			specs = { size: faker.helpers.arrayElement(['S','M','L','XL']), color: faker.color.human() };
		} else {
			specs = { platform: faker.helpers.arrayElement(['PC','PS5','Xbox','Switch']) };
		}

		products.push({
			model: `${faker.commerce.product()}-${faker.string.alphanumeric(6)}`,
			brand: faker.company.name(),
			price: Number(faker.commerce.price({ min: 5, max: 2000, dec: 2 })),
			type_product: type,
			stock: faker.number.int({ min: 0, max: 200 }),
			specs,
			description: faker.commerce.productDescription(),
			images: [faker.image.url(), faker.image.url()],
			is_active: true
		});
	}
	const created = await ProductModel.insertMany(products);
	return created;
}

/**
 * Create orders referencing persons and products. Computes totals.
 */
async function seedOrders(persons: any[], products: any[], count = ORDER_COUNT) {
	const orders = [];
	for (let i = 0; i < count; i++) {
		const buyer = faker.helpers.arrayElement(persons);
		const productCount = faker.number.int({ min: 1, max: 5 });
		const items = [];
		let total = 0;
		for (let j = 0; j < productCount; j++) {
			const p = faker.helpers.arrayElement(products);
			const amount = faker.number.int({ min: 1, max: 3 });
			const unit_price = p.price;
			items.push({ product_id: p._id, amount, unit_price });
			total += unit_price * amount;
		}

		orders.push({
			receipt_number: faker.string.uuid(),
			person_id: buyer._id,
			products: items,
			total_price: Number(total.toFixed(2)),
			status: faker.helpers.arrayElement(['pending','confirmed','shipped','delivered'])
		});
	}
	const created = await OrderModel.insertMany(orders);
	return created;
}

/**
 * Create payment records for some orders.
 */
async function seedPayments(orders: any[]) {
	const payments = [];
	for (const order of orders) {
		payments.push({
			order_id: order._id,
			amount: order.total_price,
			payment_method: faker.helpers.arrayElement(['credit_card','debit_card','cash','transfer']),
			status: faker.helpers.arrayElement(['pending','completed','failed'])
		});
	}
	const created = await PaymentModel.insertMany(payments);
	return created;
}

/**
 * Create shipment entries for a subset of orders.
 */
async function seedShipments(orders: any[]) {
	const shipments = [];
	for (const order of orders) {
		shipments.push({
			company: faker.company.name(),
			tracking_number: faker.string.uuid(),
			receipt_number: order.receipt_number,
			mailing_address: `${order.person_id ? 'see person address' : 'unknown'}`,
			status: faker.helpers.arrayElement(['pending','shipped','in_transit','delivered'])
		});
	}
	const created = await ShipmentModel.insertMany(shipments);
	return created;
}

/**
 * Create support chats and messages linked to random orders and persons.
 */
async function seedSupportChatsAndMessages(persons: any[], orders: any[]) {
	const chats = [];
	for (let i = 0; i < Math.floor(orders.length / 6); i++) {
		const person = faker.helpers.arrayElement(persons);
		const order = faker.helpers.arrayElement(orders);
		chats.push({ person_id: person._id, number_order: order.receipt_number, status: 'open' });
	}
	const createdChats = await SupportChatModel.insertMany(chats);

	const messages: any[] = [];
	for (const chat of createdChats) {
		const msgCount = faker.number.int({ min: 1, max: 6 });
		for (let m = 0; m < msgCount; m++) {
			messages.push({
				chat_id: chat._id,
				sender: faker.helpers.arrayElement(['customer','agent']),
				content: faker.lorem.sentences({ min: 1, max: 3 }),
				is_read: faker.datatype.boolean()
			});
		}
	}
	const createdMessages = await SupportMessageModel.insertMany(messages);
	return { createdChats, createdMessages };
}

/**
 * Main seeding flow: connect using db_connect(), clear collections, then populate in order.
 */
export async function runSeed() {
	// Use the database connection from db.ts
	await db_connect();
	console.log('Database connection ready for seeding');

	// Clear existing data
	await Promise.all([
		PersonModel.deleteMany({}),
		ProductModel.deleteMany({}),
		OrderModel.deleteMany({}),
		PaymentModel.deleteMany({}),
		ShipmentModel.deleteMany({}),
		SupportChatModel.deleteMany({}),
		SupportMessageModel.deleteMany({})
	]);
	console.log('Cleared collections');

	const persons = await seedPersons();
	console.log('Seeded persons:', persons.length);

	const products = await seedProducts();
	console.log('Seeded products:', products.length);

	const orders = await seedOrders(persons, products);
	console.log('Seeded orders:', orders.length);

	const payments = await seedPayments(orders);
	console.log('Seeded payments:', payments.length);

	const shipments = await seedShipments(orders.slice(0, Math.floor(orders.length / 2)));
	console.log('Seeded shipments:', shipments.length);

	const support = await seedSupportChatsAndMessages(persons, orders);
	console.log('Seeded support chats:', support.createdChats.length, 'messages:', support.createdMessages.length);

	await mongoose.disconnect();
	console.log('Disconnected');
}

// If run directly, execute the seeder
if (require.main === module) {
	runSeed().catch(err => {
		console.error('Seeding failed:', err);
		process.exit(1);
	});
}
