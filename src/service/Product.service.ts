import { isValidObjectId } from "mongoose";
import { IProduct } from "../model/product.types";
import Product from "../model/product.model";
import { notFoundError } from "../controller/globalError";

class ProductService {
  private readonly regex = /\b(<|>|>=|=|<|>=)\b/g;
  private sortRegex = /[+-]/g;

  newProduct = async (data: IProduct) => {
    try {
      return await Product.create(data);
    } catch (error) {
      return error;
    }
  };

  allProduct = async (
    query: { name: string; description: string; category: string },
    filter: string,
    sort: string,
    limit=10,
    page=1
  ) => {
    try {
      const objQuery: any = {};
      const sortObj: any = {};

      objQuery.isDeleted = false;
      if (query.name) objQuery.name = { $regex: query.name, $options: "i" };
      if (query.description)
        objQuery.description = { $regex: query.description, $options: "i" };
      if (query.category)
        objQuery.category = { $regex: query.category, $options: "i" };

      if (filter) {
        let filters = filter.replace(
          this.regex,
          (match: string) => `-${this.operationMap[match]}-`
        );

        const options = ["price", "quantity"];
        // filters =
        filters
          .split(" ")
          .join()
          .split(",")
          .forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
              objQuery[field] = { [operator]: +value };
            }
          });
      }

      if (sort) {
        const sortOption = ["price", "quantity", "name"];
        let sorts = sort.replace(
          this.sortRegex,
          (match: string) => `${this.operationMap[match]}-`
        );
        //[{price:'asc'}]
        sorts
          .split(" ")
          .join()
          .split(",")
          .forEach((item) => {
            const [value, field] = item.split("-");
            if (sortOption.includes(field)) {
              sortObj[field] = value;
            }
          });
      }
      const total = await Product.countDocuments({ isDeleted: false });
      let product = Product.find(objQuery, "-isDeleted");
      //show pages per page
      const skip = (page - 1) * limit;
      product = product.skip(skip).limit(limit).sort(sortObj);

      const products = await product;

      const allProduct = products.sort(() => 0.5 - Math.random());
      return { total, products: allProduct, page };
    } catch (error) {
      return error;
    }
  };

  product = async (id: string) => {
    try {
      if (!isValidObjectId(id)) {
        return notFoundError("Product");
      }
      const product = await Product.findOne(
        { _id: id, isDeleted: false },
        "-isDeleted"
      );
      if (!product) return notFoundError("Product");

      return product;
    } catch (error) {
      return error;
    }
  };

  updateProduct = async (data: IProduct, id: string) => {
    try {
      if (!isValidObjectId(id)) return notFoundError("Product");

      const product = await Product.findOne(
        { _id: id, isDeleted: false },
        "id"
      );
      if (!product) return notFoundError("Product");

      return await Product.findByIdAndUpdate(id, { data }, { new: true });
    } catch (error) {
      return error;
    }
  };

  deleteProduct = async (id: string) => {
    try {
      if (!isValidObjectId(id)) return notFoundError("Product");

      const product = await Product.findOne(
        { _id: id, isDeleted: false },
        "id"
      );
      if (!product) return notFoundError("Product");

      return await Product.findByIdAndUpdate(id, { isDeleted: true });
    } catch (error) {
      return error;
    }
  };

  private readonly operationMap: any = {
    ">": "$gt",
    ">=": "$gte",
    "<": "$lt",
    "<=": "$lte",
    "=": "$eq",
    "-": "desc",
    "+": "asc",
  };
}

export default new ProductService();
