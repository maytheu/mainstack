import { RequestHandler } from "express";
import AppController from "./App.controller";
import { EditProductDTO, NewProductDTO } from "../model/product.types";
import ProductService from "../service/Product.service";
import AppError from "../config/AppError";



class ProductController extends AppController {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns new product
   */
  newProduct: RequestHandler = async (req, res, next) => {
    try {
      NewProductDTO.parse(req.body);

      const data = await ProductService.newProduct(req.body);
      if (data instanceof AppError || data instanceof Error) return next(data);

      return this.sendCreatedResp(
        res,
        "Product created successfully",
        data as object
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns product detail
   */
  product: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await ProductService.product(id);
      if (data instanceof AppError || data instanceof Error) return next(data);

      return this.sendResp(res, "Product detail", data as object);
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns all products
   */
  allProduct: RequestHandler = async (req, res, next) => {
    try {
      const { sort, filter, page, limit, name, categ, desc } = req.query;
      const search = {
        name: name as string,
        category: categ as string,
        description: desc as string,
      };
      const productPage = page ? +page : 1;
      const productLimit = limit ? +limit : 10;

      const data = await ProductService.allProduct(
        search,
        filter as string,
        sort as string,
        productPage,
        productLimit
      );
      if (data instanceof AppError || data instanceof Error) return next(data);

      this.sendResp(res, "Products", data as object);
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns string
   */
  updateProduct: RequestHandler = async (req, res, next) => {
    try {
      EditProductDTO.parse(req.body);
      const { id } = req.params;

      const data = await ProductService.updateProduct( req.body,id);
      if (data instanceof AppError || data instanceof Error) return next(data);

      return this.sendResp(res, "Product updated", {});
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns string
   */
  deleteProduct: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await ProductService.deleteProduct(id);
      if (data instanceof AppError || data instanceof Error) return next(data);

      return this.sendDelResp(res, "Product deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
