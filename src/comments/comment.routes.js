import { Router } from "express";
import {crearComment,editarComment,eliminarComment} from "./comments.controller.js";
import {createCommentsValidator ,updateCommentsValidator,deleteCommentsValidator} from "../middlewares/comments-validator.js";


const router = Router();

router.post("/commentPublications",createCommentsValidator,crearComment);

router.put("/commentUpdate/:id",updateCommentsValidator,editarComment);

router.delete("/commentDelete/:id",deleteCommentsValidator, eliminarComment);

export default router;

