const { Rating, Bookmark, Comment } = require("../models");

exports.putBookmark = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id;
        const user_id = req.user.user_id;

        if (!tempat_id || !user_id) {
            return res.status(400).json({
                message: "user_id dan tempat_id harus disertakan",
            });
        }

        const existingBookmark = await Bookmark.findOne({
            where: { user_id, tempat_id },
        });

        if (existingBookmark) {
            await existingBookmark.destroy();
            return res.status(200).json({
                message: "Bookmark berhasil dihapus",
            });
        } else {
            const newBookmark = await Bookmark.create({ user_id, tempat_id });
            return res.status(201).json({
                message: "Bookmark berhasil ditambahkan",
                data: newBookmark,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:
                error.message || "Terjadi kesalahan saat mengelola bookmark",
        });
    }
};

exports.putRating = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id;
        const user_id = req.user.user_id;
        const rating_rating = req.body.rating;

        console.log(tempat_id, user_id, rating_rating);

        if (!tempat_id || !user_id || !rating_rating) {
            return res.status(400).json({
                message: "user_id, tempat_id, dan rating harus disertakan",
            });
        }

        let ratingRecord = await Rating.findOne({
            where: {
                user_id,
                tempat_id,
            },
        });

        if (ratingRecord) {
            // console.log(ratingRecord)
            const result = await ratingRecord.update({
                rating_rating: rating_rating,
            });
            console.log("Update result:", result);
        } else {
            ratingRecord = await Rating.create({
                user_id,
                tempat_id,
                rating_rating: rating_rating,
            });
        }

        return res.status(201).json({
            message: "Terima Kasih telah memberikan rating :)",
            data: ratingRecord,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error.message || "Terjadi kesalahan saat menambahkan rating",
        });
    }
};

exports.postComment = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id;
        const user_id = req.user.user_id;
        const comment = req.body.comment;

        if (!tempat_id || !user_id || !comment) {
            return res.status(400).json({
                message: "user_id, tempat_id, dan comment harus disertakan",
            });
        }
        const createComment = await Comment.create({
            user_id,
            tempat_id,
            comment_comment: comment,
        });
        return res.status(201).json({
            message: "Terima Kasih telah memberikan comment :)",
            data: createComment,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error.message || "Terjadi kesalahan saat menambahkan comment",
        });
    }
};

exports.getAttributes = async (req, res) => {
    try {
        const tempat_id = req.params.tempat_id;
        const user_id = req.user.user_id;
        const attribute = { rating: 0, bookmark: false };

        const existingRating = await Rating.findOne({
            where: {
                user_id,
                tempat_id,
            },
        });

        if (existingRating) {
            attribute["rating"] = existingRating.rating_rating;
        }
        const existingBookmark = await Bookmark.findOne({
            where: { user_id, tempat_id },
        });

        if (existingBookmark) {
            attribute["bookmark"] = true;
        }

        return res.status(200).json({
            message: "Berhasil mendapatkan atribut pengguna",
            data: attribute,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error.message || "Terjadi kesalahan saat menambahkan rating",
        });
    }
};
