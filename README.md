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
        
        "model" : The model of the Product
        
        "brand" : The Brand of the Product
        
        "price" : Their Price
        
        "type_product" : Their Type (Cellphone, Bathroom, etc.)
        
        "created_at" : date and hour of creation
        
        "updated_at" : date and hour of update
        
        "stock" : Stock
        
        "specs" : {oject for the Specs}
        
        "description" : A description of the Product
        
        "images" : A Array for all object's Image Url's

        "is_active" : The Object show or not in the feed
    }


> "person" : {
        "first_name" : The First Name

        "last_name" : The Last name

        "rut" : Rut of the Client

        "mail" : {
            "mail_addres" : Mail addres from the Client

            "is_verified" : State of verification for the Addres
        }

        "phone" : The numberphone of the Client

        "alt_phone" : Secondary Number

        "password_hash" : The password

        "birth_date" : The Birth date of the user

        "gender" : The Gender (Male, Female, Other)

        "address" : [

            {
            "region" : 

            "commune" : 

            "street" : 

            "number" : 

            "apartment" : 
        }
        ]
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