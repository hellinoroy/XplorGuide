const { bookmarks } = require("../models")
const { ratings } = require("../models")
const { comments } = require("../models")

exports.addBookmark = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id
        const user_id = req.user.id

        if (!tempat_id || !user_id) {
            return res.status(400).json({
                message: "user_id dan tempat_id harus disertakan",
            });
        }

        const existingBookmark = await bookmarks.findOne({
            where: { user_id, tempat_id },
        });

        if (existingBookmark) {
            return res.status(409).json({
                message: "Bookmark sudah ada untuk pengguna dan tempat ini",
            });
        }
        const newBookmark = await bookmarks.create({ user_id, tempat_id });

        return res.status(201).json({
            message: "Bookmark berhasil ditambahkan",
            data: newBookmark,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Terjadi kesalahan saat menambahkan bookmark",
        });
    }
};

exports.addRating = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id
        const user_id = req.user.id
        const { rating } = req.body
        if (!tempat_id || !user_id || !rating) {
            return res.status(400).json({
                message: "user_id, tempat_id, dan rating harus disertakan",
            })
        }
        const existingRating = await ratings.findOne({
            where: { user_id, tempat_id },
        })
        if (existingRating) {
            return res.status(409).json({
                message: "Rating sudah ada untuk pengguna dan tempat ini",
            })
        }
        const createRating = await ratings.create({
            user_id,
            tempat_id,
            rating
        })
        return res.status(201).json({
            message: "Terima Kasih telah memberikan rating :)",
            data: createRating
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Terjadi kesalahan saat menambahkan rating",
        })
    }
}

exports.addComment = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id
        const user_id = req.user.id
        const { comment } = req.body
        if (!tempat_id || !user_id || !comment) {
            return res.status(400).json({
                message: "user_id, tempat_id, dan comment harus disertakan",
            })
        }
        const createComment = await comments.create({
            user_id,
            tempat_id,
            comment
        })
        return res.status(201).json({
            message: "Terima Kasih telah memberikan comment :)",
            data: createComment
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Terjadi kesalahan saat menambahkan comment",
        })
    }
}
