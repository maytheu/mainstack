import { Router } from "express";
import ProductController from "../controller/Product.controller";
import { authorization } from "../controller/authenticate";

const productRouter = Router()

productRouter.get("/", ProductController.allProduct);
productRouter
  .route("/:id")
  .get(ProductController.product)
  .put(
    authorization(["admin", "superadmin"]),
    ProductController.updateProduct
  )
  .delete(
    authorization(["superadmin"]),
    ProductController.deleteProduct
  );
productRouter.post(
  "/new",
  authorization(["admin", "superadmin"]),
  ProductController.newProduct
);


export default productRouter