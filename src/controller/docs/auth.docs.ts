/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API endpoint for managing authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *      summary: Register new user
 *      description: Register to have access to endless possibilities
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          required: true
 *          description:
 *              <b>name</b><br>New user fullname</br>
 *              <b>email</b><br>User email address</br>
 *              <b>password</b><br>Password must be equal or gretaer than 6 xters</br>
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: User email address
 *                          name:
 *                              type: string
 *                              description: User full name
 *                          password:
 *                              type: string
 *                              format: password
 *                              description: User's password
 *                      example:
 *                          email: user@example.com
 *                          name: Example Name
 *                          password: examplePass
 *      responses:
 *          201:
 *              description: Account created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Account created
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGRmMzdkYWEzNWIzOGJkY2EzNTcwZiIsInVzZXJuYW1lIjoiRG9yY2FzMiIsImVtYWlsIjoiZG9yY2FzQDJnbWFpbC5jb20iLCJyb2xlIjoyLCJpYXQiOjE2OTIyNjg4NDUsImV4cCI6MTY5MjQ0MTY0NX0.iFUz_p4amVek47sOcOYcSBL95BhRdDfa3xGJgFt38
 *                                      user:
 *                                          type: object
 *                                          properties:
 *                                              name:
 *                                                  type: string
 *                                              email:
 *                                                  type: string
 *          404:
 *              description: Role not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 *          '409':
 *              description: Account already exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: number
 *                                  example: 409
 *                              message:
 *                                  type: string
 *                                  example: Account already exist
 *          422:
 *              description: Validation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ValidationError'

 *          '500':
 *              description: Something bad went wrong
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ServerError'
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *      tags: [Auth]
 *      summary: User login
 *      description: Login to your account 
 *      security: []
 *      requestBody:
 *          required: true
 *          description:
 *              <b>email</b><br>User email address</br>
 *              <b>password</b><br>User password</br>
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: User email address
 *                          password:
 *                              type: string
 *                              format: password
 *                              description: User's password
 *                      example:
 *                          email: user@example.com
 *                          password: examplePass
 *      responses:
 *          200:
 *              description: Login successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User login
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      token:
 *                                          type: string
 *                                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGRmMzdkYWEzNWIzOGJkY2EzNTcwZiIsInVzZXJuYW1lIjoiRG9yY2FzMiIsImVtYWlsIjoiZG9yY2FzQDJnbWFpbC5jb20iLCJyb2xlIjoyLCJpYXQiOjE2OTIyNjg4NDUsImV4cCI6MTY5MjQ0MTY0NX0.iFUz_p4amVek47sOcOYcSBL95BhRdDfa3xGJgFt38
 *          401: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticatedError'
 *          422:
 *              description: Validation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ValidationError'
 *          '500':
 *              description: Something bad went wrong
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ServerError'
 */