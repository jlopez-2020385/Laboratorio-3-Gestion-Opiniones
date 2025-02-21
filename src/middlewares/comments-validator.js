import { body, param } from "express-validator";
import { commetExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validate-jwt.js"

export const createCommentsValidator = [
    validateJWT,
    body("content").notEmpty().withMessage("El content es requerido"),
    validarCampos,
    handleErrors
];


export const updateCommentsValidator = [
    validateJWT,
    body("content").notEmpty().withMessage("El content es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCommentsValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("El id no ed valido"),
    param("id").custom(commetExists),
    handleErrors
];
