import { Router } from "express";
import {crearPublications,editarPublications,eliminarPublication,getPublications} from "./publications.controller.js";
import {createPublicationValidator,updatePublicationValidator,deletePublicationValidator} from "../middlewares/publications-validator.js";

const router = Router();

router.post("/publicacion",createPublicationValidator,crearPublications);

router.put("/publicacionEditar/:id",updatePublicationValidator,editarPublications);

router.delete("/publicacionDelete/:id", deletePublicationValidator, eliminarPublication);

router.get("/publications/:id", getPublications)

export default router;
