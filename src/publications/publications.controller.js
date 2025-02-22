import Publications from "./publications.model.js"
import Category from "../category/category.model.js"

export const crearPublications = async (req, res) => {
    try {
        const { title, category, content } = req.body;

        if (!req.usuario) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado",
            });
        }

        const categoriaExistente = await Category.findById(category);
        if (!categoriaExistente) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        const publication = new Publications({
            title,
            category,
            content,
            user: req.usuario._id 
        });

        await publication.save();

        return res.status(200).json({
            success: true,
            message: "Publicación creada exitosamente",
            publication
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "La publicación fue denegada",
            error: err.message
        });
    }
};

export const editarPublications = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;

        if (!req.usuario) {
            return res.status(401).json({ 
                success: false, 
                message: "Usuario no autenticado" 
            });
        }

        const publication = await Publications.findById(id);
        
        if (!publication) return res.status(404).json({ 
            success: false, 
            message: "Publicación no encontrada" 
        });

        if (publication.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "No tienes permiso para editar esta publicación" 
            });
        }

        Object.assign(publication, { title, category, content });
        await publication.save();

        return res.status(200).json({ 
            success: true, 
            message: "Publicación actualizada", 
            publication 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al actualizar", 
            error: err.message 
        });
    }
};

export const eliminarPublication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.usuario) {
            return res.status(401).json({ 
                success: false, 
                message: "Usuario no autenticado" 
            });
        }

        const publication = await Publications.findById(id);

        if (publication.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "No tienes permiso para eliminar esta publicación" 
            });
        }

        publication.status = false;
        await publication.save();

        return res.status(200).json({ 
            success: true, 
            message: "Publicación eliminada (desactivada)", 
            publication 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al eliminar la publicación", 
            error: err.message 
        });
    }
};

export const getPublications = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publications.findById(id)
        .populate("category", "name")
        .populate({
            path: "comments",
            match: { status: true }, 
        }); 

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            publication
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación con comentarios",
            error: err.message
        });
    }
};
