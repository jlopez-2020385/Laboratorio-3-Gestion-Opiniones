import { body, param } from "express-validator";
import { categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";


export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El category es requerido"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El category es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("El id no ed valido"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];


