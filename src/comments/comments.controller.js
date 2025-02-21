import Comment from "./comment.model.js"
import Publications from "../publications/publications.model.js"


export const crearComment = async (req, res) => {
    try {
        const { content, publication } = req.body;

        if (!req.usuario) {
            return res.status(401).json({ 
                success: false, 
                message: "Usuario no autenticado" 
            });
        }

        const opinion = new Comment({
            content,
            publication,
            user: req.usuario._id
        });

        await opinion.save();

        await Publications.findByIdAndUpdate(
            publication,
            { $push: { comments: opinion._id } }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Opinión creada exitosamente",
            opinion
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la opinión",
            error: err.message
        });
    }
};

export const editarComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!req.usuario) {
            return res.status(401).json({ 
                success: false, 
                message: "Usuario no autenticado" 
            });
        }

        const opinion = await Comment.findById(id);
        if (!opinion) return res.status(404).json({ 
            success: false, 
            message: "Opinión no encontrada" 
        });

        if (opinion.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "No tienes permiso para editar esta opinión" 
            });
        }

        opinion.content = content || opinion.content;
        await opinion.save();

        return res.status(200).json({ 
            success: true, 
            message: "Opinión actualizada", 
            opinion 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al actualizar la opinión", 
            error: err.message 
        });
    }
};

export const eliminarComment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.usuario) {
            return res.status(401).json({ 
                success: false, 
                message: "Usuario no autenticado" 
            });
        }

        const opinion = await Comment.findById(id);

        if (opinion.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "No tienes permiso para eliminar esta opinión" 
            });
        }

        opinion.status = false; 
        await opinion.save();

        return res.status(200).json({ 
            success: true, 
            message: "Opinión eliminada (desactivada)", 
            opinion });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al eliminar la opinión", 
            error: err.message 
        });
    }
};
