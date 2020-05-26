# NODEJS - ASSIGNMENT - SMALL SHOPPING APP

This is an assignment task where a small shopping app was created using NodeJS and MongoDB

Note: Postman should be used to test all endpoints
Note: Make sure you have Docker installed since app has been containerized

## How to run

    docker-compose up --build -d

## Tests

    To run the tests you'll have to do it manually from the npm cli 
    Command: npm run test

## Auth

- This application uses JWT for auth purposes
- Every user gets their own token on login
- After token is received, you should put it in the Headers as: Authorization Bearer {token value}

## Register

`POST /register`

     http://localhost:4000/register

- Body

    {
        "email": "user@hotmail.com",
        "password": "test123"
    }

- Success

    {
        "message": "Registration successful please log in."
    }

- Error - missing email 

  [
    {
        "message": "Path `email` is required."
    }
  ]


## Login

`POST /login`

   http://localhost:4000/login

- Body

    {
        "email": "user@hotmail.com",
        "password": "test123"
    }

- Success

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2Q1OTExZWQ3YzUzMzU0NDAwYTVlMCIsImVtYWlsIjoiaGFyYV96dWpvQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNTE4MDYzfQ.Bo3y65mmZvYoj0sEe2VIjneI0xj8LClbwunRYbQRA_I
}

- Error - password

{
    "message": "Password does not match"
}


## Reset Password

### Request

`POST /resetPassword`

   http://localhost:4000/user/update

- Body
{
	"email":"hara_zujo@hotmail.com",
	"currentPassword": "test123",
	"newPassword": "test12"
}
- Success
{
    "message": "Successfully changed password",
    "user": {
        "_id": "5ecd5911ed7c53354400a5e0",
        "email": "hara_zujo@hotmail.com",
        "password": "$2b$12$dSgJ9qFRqKr6nj4V26.u/.J3TBWrneI4dDhWw9Kc2NlhHTOY58Qmq"
    }
}

- 403- Forbidden

   Forbidden

- Current password incorrect

  {
    "message": "Your current password is not correct!"
  }

- Missing body

  {
    "message": "data and hash arguments required"
  }


## Create a Shopping list

- Request

`POST /shoppingList`

    http://localhost:4000/shoppingList

- Body

{
	"title":"testlist4",
	"products": [
		{
            "name":"product1",
			"quantity": 2
		},
		{
		"name":"product2",
		"quantity": 3
		}
	]
}

- Success
{
    "message": "Success",
    "list": "testlist4"
}

- 403 - Forbidden (token modified)

 Forbidden

 - 401 - Unauthorized
 
 Unauthorized



## Get Shopping lists

- Request

`GET /shoppingList`

    http://localhost:4000/shoppingList

- Success

    [
        {
            "_id": "5ecd5e87ca224a453c5aca85",
            "title": "testlist4",
            "products": [
                {
                    "_id": "5ecd5e87ca224a453c5aca86",
                    "name": "product1",
                    "quantity": 2
                },
                {
                    "_id": "5ecd5e87ca224a453c5aca87",
                    "name": "product2",
                    "quantity": 3
                }
            ],
            "userId": "5ecd5911ed7c53354400a5e0",
            "createdAt": "2020-05-26T18:23:03.638Z"
        }
    ]
- Unauthorized

  Unauthorized

## Update a Shopping list

- Request

`PUT /shoppingList/:id`

    http://localhost:4000/shoppingList/5ec92e6204df1d878051c54c

### Body

 {
   "title":"updated list"
 }

- Success

 {
    "_id": "5ecd5e87ca224a453c5aca85",
    "title": "updated list",
    "products": [
        {
            "_id": "5ecd5e87ca224a453c5aca86",
            "name": "product1",
            "quantity": 2
        },
        {
            "_id": "5ecd5e87ca224a453c5aca87",
            "name": "product2",
            "quantity": 3
        }
    ],
    "userId": "5ecd5911ed7c53354400a5e0",
    "createdAt": "2020-05-26T18:23:03.638Z"
}

- Unauthorized

   Unauthorized 

- List not found

  {
    "message": "List could not be found!"
  }



## Delete a Shopping list

### Request

`DELETE /shoppingList/:id`

   http://localhost:4000/shoppingList/5ec92e6204df1d878051c54c


- Success

    204 - No Content

- Unauthorized
 
    Unauthorized


## Report

### Request

`GET /report?from={datetime}&to={datetime}`

   http://localhost:4000/report?from=2020-05-26T18:23:03.638Z&to=2020-05-27T18:23:03.638Z

- Success

[
    {
        "total": 3,
        "product": "product2"
    },
    {
        "total": 2,
        "product": "product1"
    }
]