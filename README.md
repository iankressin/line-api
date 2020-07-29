# Line API
 This API is a queue modeling and its main goal is to provide a way to already existing POS systems to quickly implement a virtual line for it's clients.
## Endpoints

 - /user
 - /place
 - /queue
 - /auth

<br>

## USER
> **GET** /user/{userId}
<details>
<summary>Parameters</summary>

*Response:*
```json	 
{
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "birthdate": "date",
    "email": "string",
    "document": "number"
}
```
</details> 
 
 > **POST** /user
<details>
<summary>Parameters</summary>

*Request*:
```json	 
{
    "firstName": "string",
    "lastName": "string",
    "birthdate": "date",
    "email": "string",
    "password": "string",
    "document": "number"
}
```
	 
*Response*: 
```json
 {
	"_id": "string",
    "firstName": "string",
	"lastName": "string",
	"birthdate": "date",
	"email": "string",
	"document": "number"
}
```
</details>

<br>

## PLACE
> **GET** /place
<details>
<summary>Parameters</summary>

*Response:*
```json	 
[
    {
        "open": "boolean",
        "queue": [],
        "_id": "string",
        "name": "string",
        "email": "string",
        "cnpj": "number",
        "createdAt": "date",
        "updatedAt": "date",
        "city": "string",
        "phoneNumber": "number",
        "stateOrProvince": "string",
        "imagePath": "string",
        "address": "string",
    }
]
```
</details> 

> **GET** /place/{placeId}
<details>
<summary>Parameters</summary>

*Response:*
```json	 
{
    {
        "open": "boolean",
        "queue": [],
        "_id": "string",
        "name": "string",
        "email": "string",
        "cnpj": "number",
        "createdAt": "date",
        "updatedAt": "date",
        "city": "string",
        "phoneNumber": "number",
        "stateOrProvince": "string",
        "imagePath": "string",
        "address": "string",
    }
}
```
</details> 


> **POST** /place
<details>
<summary>Parameters</summary>

*Request*:
```json	 
{
    "name": "string",
    "email": "string",
    "cnpj": "number",
    "createdAt": "date",
    "updatedAt": "date",
    "city": "string",
    "phoneNumber": "number",
    "stateOrProvince": "string",
    "imagePath": "string",
    "address": "string",
}
```

*Response:*
```json	 
{
    "open": "boolean",
    "queue": [],
    "_id": "string",
    "name": "string",
    "email": "string",
    "cnpj": "number",
    "createdAt": "date",
    "updatedAt": "date",
    "city": "string",
    "phoneNumber": "number",
    "stateOrProvince": "string",
    "imagePath": "string",
    "address": "string",
}
```
</details> 
 
 <br>

## QUEUE

> **POST** /queue *User Authentication Required*
<details>
<summary>Parameters</summary>

*Request:* 
 
```json
// The user id is not needed, once the user session is handled by the backend.

{
    "placeId": "string"
}
```

*Response:*
```json
{
    "position": "number"
}
```
    
</details> 

> **GET** /queue *Place Authentication Required*
<details>
<summary>Parameters</summary>

*Request:* 
 
```json
// The user id is not needed, once the user session is handled by the backend.

{
    "placeId": "string"
}
```

*Response:*
```json
{
    "position": "number"
}
```    
</details> 

<br>

## AUTH

> **POST** /auth/signin 
<details>
<summary>Parameters</summary>

*Request:* 
 
```json
{
    "email": "string",
    "password": "string"
}
```

*Response*: 
```json
 {
	"_id": "string",
    "firstName": "string",
	"lastName": "string",
	"birthdate": "date",
	"email": "string",
	"document": "number"
}
``` 
</details> 