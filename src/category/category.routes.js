import { Router } from "express";
import {crearCategoria,editarCategoria,eliminarCategoria} from "./category.controller.js";
import {createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} from "../middlewares/validator-cateagory.js";


const router = Router();

router.post("/category",createCategoryValidator,crearCategoria);

router.put("/categoryUpdate/:id",updateCategoryValidator,editarCategoria);

router.delete("/categoryDelete/:id",deleteCategoryValidator, eliminarCategoria);

export default router;
