# DB-NoSQL-4-Evaluation
 The repository for the 4 evaluation of Database NoSQL - Inacap 2026

## Dependencias usadas
> [Express.js](https://www.npmjs.com/package/express)
> 
> [Dotenv](https://www.npmjs.com/package/dotenv)
> 
> [Mongoose](https://www.npmjs.com/package/mongoose)
> 

## Estructura de la Base de datos
> "product" : {
        "model" : "",
        "brand" : "",
        "price" : 0,
        "type_product" : "",
        "created_at" : "",
        "updated_at" : "",
        "stock" : 0,
        "specs" : {     },
        "description" : "",
        "images" : [],
        "is_active" : true
    }


> "person" : {
        "name" : "",
        "rut" : "",
        "mail" : {
            "mail_addres" : "",
            "is_verified" : false
        },
        "phone" : "",
        "alt_phone" : "",
        "password_hash" : "",
        "birth_date" : "",
        "gender" : "",
        "address" : {
            "region" : "",
            "commune" : "",
            "street" : "",
            "number" : "",
            "apartment" : ""
        }
    },
> "order" : {
        "receipt_number" : "",
        "person_id" : "",
        "products" : [
            { "product_id" : "", "amount" : "", "unit_price" : 0 }
        ],
        "total_price" : 0,
        "status" : "",
        "created_at" : "",
        "updated_at" : ""
    }

> "payment" : {
        "order_id" : "",
        "amount" : 0,
        "payment_method" : "",
        "status" : "", 
        "created_at" : ""
    }

> "shipment" : {
    "company" : "",
    "tracking_number" : "",
    "receipt_number" : "",
    "mailing_address" : "",
    "status" : ""
    }

> "support_chat" : { 
        "person_id" : "",
        "number_order" : "",
        "created_at" : "",
        "updated_at" : "",
        "status" : ""
    }

> "support_messages" : {
        "chat_id" : "",
        "sender" : "",
        "content" : "",
        "date_time" : "",
        "is_read" : true
    }