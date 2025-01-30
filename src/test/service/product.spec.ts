import mongoose from "mongoose";
import Product from "../../model/product.model";
import { IProduct } from "../../model/product.types";
import ProductService from "../../service/Product.service";

jest.mock("../../model/product.model");

const mockedProduct = jest.mocked(Product);

describe("ProductService()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("newProduct()", () => {
    const sut = ProductService.newProduct;
    const actual: IProduct = {
      name: "Product test",
      category: "Test",
      description: "Test product",
      price: 100,
      quantity: 4,
    };

    it("Should created new product", async () => {
      const mockProduct: any = {
        id: "",
        ...actual,
        updatedAt: new Date(),
        createdAt: new Date(),
        isDeleted: false,
      };

      mockedProduct.create.mockResolvedValue(mockProduct);

      const expected = await sut(actual);

      expect(expected).toEqual(mockProduct);
    });

    it("Should return error in catch {}", async () => {
      const error = new Error("Error occured");

      mockedProduct.create.mockRejectedValueOnce(error);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Error occured");
    });
  });

  describe("product()", () => {
    const sut = ProductService.product;
    const actual = "productId";

    it("Should return not found if mongooseid is not valid", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(false as never);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Product not found");
    });

    it("Should return product not found", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockResolvedValue(null);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Product not found");
    });

    it("Should return product detail", async () => {
      const mockProduct = {
        id: "productId",
        name: "Product test",
        category: "Test",
        description: "Test product",
        price: 100,
        quantity: 4,
        updated_at: new Date(),
        created_at: new Date(),
        deleted: false,
      };

      mockedProduct.findOne.mockResolvedValueOnce(mockProduct);

      const expected: any = await sut(actual);

      expect(expected).toEqual(mockProduct);
    });

    it("Should return error in catch {}", async () => {
      const error = new Error("Error occured");

      mockedProduct.findOne.mockRejectedValueOnce(error);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Error occured");
    });
  });

  describe("allProduct()", () => {
    const sut = ProductService.allProduct;
    const mockProducts = [
      {
        id: "productid1",
        name: "Product test",
        category: "Test",
        description: "Test product",
        price: 100,
        quantity: 4,
        updated_at: new Date(),
        created_at: new Date(),
        deleted: true,
      },
      {
        id: "productid2",
        name: "Product test2",
        category: "Test",
        description: "Test product2",
        price: 1000,
        quantity: 6,
        updated_at: new Date(),
        created_at: new Date(),
        deleted: true,
      },
    ];
    it("Should return products if query is not passed", async () => {
      mockedProduct.countDocuments.mockResolvedValue(2);
      mockedProduct.find = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            sort: jest.fn().mockResolvedValue(mockProducts),
          })),
        })),
      }));

      const expected: any = await sut(
        { name: "", description: "", category: "" },
        "",
        ""
      );

      expect(expected.products).toEqual(mockProducts);
      expect(expected.total).toBe(2);
    });

    it("Should return products if query is  passed", async () => {
      mockedProduct.countDocuments.mockResolvedValue(2);
      mockedProduct.find = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            sort: jest.fn().mockResolvedValue(mockProducts),
          })),
        })),
      }));

      const expected: any = await sut(
        { name: "test", description: "test", category: "test" },
        "price>=100",
        "-quantity"
      );

      expect(expected.products).toEqual(mockProducts);
      expect(expected.total).toBe(2);
    });

    it("Should return error in catch {}", async () => {
      const error = new Error("Error occured");

      mockedProduct.find = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockImplementation(() => ({
          limit: jest.fn().mockImplementation(() => ({
            sort: jest.fn().mockRejectedValueOnce(error),
          })),
        })),
      }));

      const expected: any = await sut(
        { name: "", description: "", category: "" },
        "",
        ""
      );

      expect(expected.toString()).toBe("Error: Error occured");
    });
  });

  describe("EditProduct()", () => {
    const sut = ProductService.updateProduct;
    const actual: IProduct = {
      name: "Product test",
      category: "Test",
      description: "Test product",
      price: 100,
      quantity: 4,
    };
    const actualId = "productId";

    it("Should return not found if mongooseid is not valid", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(false as never);

      const expected: any = await sut(actual, actualId);

      expect(expected.toString()).toBe("Error: Product not found");
    });

    it("Should return product not found", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockResolvedValue(null);

      const expected: any = await sut(actual, actualId);

      expect(expected.toString()).toBe("Error: Product not found");
    });

    it("Should update product", async () => {
      const mockProduct = {
        ...actual,
        id: 1,
        updated_at: new Date(),
        created_at: new Date(),
        deleted: false,
      };

      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockResolvedValue(mockProduct);
      mockedProduct.findByIdAndUpdate.mockResolvedValue(mockProduct);

      const expected: any = await sut(actual, actualId);

      expect(expected).toEqual(mockProduct);
    });

    it("Should return error in catch {}", async () => {
      const error = new Error("Error occured");

      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockRejectedValueOnce(error);

      const expected: any = await sut(actual, actualId);

      expect(expected.toString()).toBe("Error: Error occured");
    });
  });

  describe("deleteProduct()", () => {
    const sut = ProductService.deleteProduct;
    const actual = "productid";
    
    it("Should return product not found", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(false as never);
      mockedProduct.findOne.mockResolvedValue(null);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Product not found");
    });

    it("Should delete product", async () => {
      const mockProduct = {
        id: 1,
        name: "Product test",
        category: "Test",
        description: "Test product",
        price: 100,
        quantity: 4,
        updated_at: new Date(),
        created_at: new Date(),
        deleted: true,
      };
      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockResolvedValue(mockProduct);

      mockedProduct.findByIdAndUpdate.mockResolvedValue(mockProduct);

      const expected: any = await sut(actual);

      expect(expected).toEqual(mockProduct);
    });

    it("Should return error in catch {}", async () => {
      const error = new Error("Error occured");

      jest.spyOn(mongoose, "isValidObjectId").mockResolvedValue(true as never);
      mockedProduct.findOne.mockRejectedValueOnce(error);

      const expected: any = await sut(actual);

      expect(expected.toString()).toBe("Error: Error occured");
    });
  });
});
