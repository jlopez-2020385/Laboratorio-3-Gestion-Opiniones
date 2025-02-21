import { body, param } from "express-validator";
import { publicationExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validate-jwt.js"

export const createPublicationValidator = [
    validateJWT,
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("category").notEmpty().withMessage("El category es requerido"),
    body("content").notEmpty().withMessage("El content es requerido"),
    validarCampos,
    handleErrors
];

export const updatePublicationValidator = [
    validateJWT,
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("category").notEmpty().withMessage("El category es requerido"),
    body("content").notEmpty().withMessage("El content es requerido"),
    validarCampos,
    handleErrors
];

export const deletePublicationValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("El id no ed valido"),
    param("id").custom(publicationExists),
    validarCampos,
    handleErrors
];