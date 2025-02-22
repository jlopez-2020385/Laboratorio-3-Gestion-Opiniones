import { categoryExists } from "../helpers/db-validators.js";
import Category from "./category.model.js"
import Publications from "../publications/publications.model.js"

export const crearCategoriaPorDefecto = async () => {
    try {
        let categoriaExist = await Category.findOne({ name: "Otros" });

        if (!categoriaExist) {
            categoriaExist = new Category({ name: "Otros" });
            await categoriaExist.save();
        }

        return categoriaExist; 
    } catch (error) {
        console.error("Error al crear la categoría por defecto:", error.message);
    }
};



export const crearCategoria = async (req, res) => {
    try {
        const { name } = req.body;

        const categoriaExistente = await Category.findOne({ name });

        if (categoriaExistente) {
            return res.status(400).json({
                success: false,
                message: "La categoría ya existe",
            });
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Categoría creada exitosamente",
            category: newCategory,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoría",
            error: error.message,
        });
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const categoria = await Category.findById(id);
        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        const categoriaExistente = await Category.findOne({ name });
        if (categoriaExistente && categoriaExistente._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                message: "Ya existe una categoría con este nombre",
            });
        }

        categoria.name = name;
        await categoria.save();

        return res.status(200).json({
            success: true,
            message: "Categoría actualizada exitosamente",
            category: categoria,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: error.message,
        });
    }
};



export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await categoryExists(id);

        const categoriaOtros = await crearCategoriaPorDefecto();

        await Publications.updateMany(
            { category: id },
            { category: categoriaOtros._id }
        );

        categoria.status = false;
        await categoria.save();

        return res.status(200).json({
            success: true,
            message: "Categoría desactivada y publicaciones reasignadas a 'Otros'",
            category: categoria,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};
