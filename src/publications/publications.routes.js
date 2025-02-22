import { Router } from "express";
import {crearPublications,editarPublications,eliminarPublication,getPublications} from "./publications.controller.js";
import {createPublicationValidator,updatePublicationValidator,deletePublicationValidator} from "../middlewares/publications-validator.js";

const router = Router();

/**
 * @swagger
 * /publications:
 *   post:
 *     summary: Create a new publication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePublication'
 *     responses:
 *       201:
 *         description: Publication created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/publicacion", createPublicationValidator, crearPublications);

/**
 * @swagger
 * /publications/{id}:
 *   put:
 *     summary: Edit a publication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePublication'
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/publicacionEditar/:id", updatePublicationValidator, editarPublications);

/**
 * @swagger
 * /publications/{id}:
 *   delete:
 *     summary: Delete a publication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/publicacionDelete/:id", deletePublicationValidator, eliminarPublication);

/**
 * @swagger
 * /publications/{id}:
 *   get:
 *     summary: Get a publication by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: A publication object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       404:
 *         description: Publication not found
 */
router.get("/publications/:id", getPublications);

export default router;
