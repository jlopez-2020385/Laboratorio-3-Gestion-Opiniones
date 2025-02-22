import { Router } from "express";
import {crearComment,editarComment,eliminarComment} from "./comments.controller.js";
import {createCommentsValidator ,updateCommentsValidator,deleteCommentsValidator} from "../middlewares/comments-validator.js";

const router = Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateComment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/commentPublications",createCommentsValidator,crearComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Edit a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateComment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/commentUpdate/:id",updateCommentsValidator,editarComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/commentDelete/:id",deleteCommentsValidator, eliminarComment);

export default router;

