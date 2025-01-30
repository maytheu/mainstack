/**
 * @swagger
 * tags:
 *  name: Product
 *  description: API endpoint for managing product
 */

/**
 * @swagger
 * /api/v1/product/new:
 *  post:
 *      summary: Create new product
 *      description: Admin can create new product
 *      tags: [Product]
 *      security: 
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          description:
 *              <b>name</b><br>Product name</br>
 *              <b>description</b><br>Product description</br>
 *              <b>category</b><br>Product category</br>
 *              <b>price<b><br>Product price in number</br>
 *              <b>quantity</b><br>Product quantity in stock</br>
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          category:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *                      example:
 *                          name: New product
 *                          price: 1000
 *                          quantity: 50
 *                          description: Product description
 *                          category: Product category
 *      responses:
 *          201:
 *              description: New peoduct created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Product created
 *                              data:
 *                                  $ref: '#/components/schemas/Product'
 *          401: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticatedError'
 *          403: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthorizeError'
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
 * /api/v1/product:
 *  get:
 *      summary: All product
 *      description: This API accept filtering and sorting
 *      tags: [Product]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: name
 *            schema:
 *              type: string
 *            description: Filter or search product by name
 *          - in: query
 *            name: categ
 *            schema: 
 *              type: string
 *            description: Filter product by category
 *          - in: query
 *            name: desc
 *            schema:       
 *              type: string
 *            description: Filter product by description
 *          - in: query
 *            name: filter
 *            schema: 
 *              type: string
 *            description: Filter product by price and quantity e.g price>500,quantity=50
 *            example: filter=price>500,quantity=5
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *            description: Sort product by price, quantity and category '- =desc and + = asc' order
 *            example: sort=-price,+quantity
 *      responses:
 *          200: 
 *              description: Return all product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                                  example: Products
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      total: 
 *                                          type: number
 *                                          example: 100
 *                                      products:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Product'
 *          '500':
 *              description: Something bad went wrong
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ServerError'
 */

/**
 * @swagger
 * /api/v1/product/{id}:
 *  get:
 *      tags: [Product]
 *      summary: Product detail
 *      description: View a product by id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Fetch a product by id
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Product detail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:      
 *                                  type: string
 *                                  example: Product detail
 *                              data:
 *                                  $ref: '#/cpmponents/schemas/Product'
 *          404: 
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 *          '500':
 *              description: Something bad went wrong
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ServerError'
 *              
 */

/**
 * @swagger
 * /api/v1/product/{id}:
 *  put:
 *      summary: Update product
 *      description: Admin can update existing product
 *      tags: [Product]
 *      security: 
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Product id
 *            schema:
 *              type: string
 *      requestBody:
 *          description:
 *               All field are optional
 *              <b>name</b><br>Product name</br>
 *              <b>description</b><br>Product description</br>
 *              <b>category</b><br>Product category</br>
 *              <b>price<b><br>Product price in number</br>
 *              <b>quantity</b><br>Product quantity in stock</br>
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          category:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *                      example:
 *                          name: New product
 *                          price: 1000
 *                          quantity: 50
 *                          description: Product description
 *                          category: Product category
 *      responses:
 *          200:
 *              description: peoduct updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Product updated
 *                              data:
 *                                  $ref: '#/components/schemas/Product'
 *          401: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticatedError'
 *          403: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthorizeError'
 *          404: 
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
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
 * /api/v1/product/{id}:
 *  delete:
 *      tags: [Product]
 *      summary: Delete product
 *      description: Only Super Admin can delete a product
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Product id
 *            schema:
 *              type: string
 *      responses:
 *          204: 
 *              description: product deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                                  example: product deleted
 *          401: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticatedError'
 *          403: 
 *              description: Unauthentucated user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthorizeError'
 *          404: 
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundError'
 *          '500':
 *              description: Something bad went wrong
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ServerError'                     
 */