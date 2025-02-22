import { Router } from "express";
import {crearCategoria,editarCategoria,eliminarCategoria} from "./category.controller.js";
import {createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} from "../middlewares/validator-cateagory.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/category", createCategoryValidator, crearCategoria);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Edit a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/categoryUpdate/:id", updateCategoryValidator, editarCategoria);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/categoryDelete/:id", deleteCategoryValidator, eliminarCategoria);

export default router;
