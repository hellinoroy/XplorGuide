const cron = require('node-cron');
const { sequelize } = require('../models');



exports.updateRatingOtomatis = () => {
    cron.schedule('0 2 * * *', async () => {
        try {
            await sequelize.query(`UPDATE daftar_tempat
           SET tempat_rating = (
               SELECT SUM(ratings.rating) / COUNT(ratings.tempat_id)
               FROM ratings
               WHERE ratings.tempat_id = daftar_tempat.tempat_id
           )`)
            console.log('Rating tempat berhasil diupdate');
        } catch (error) {
            console.log(error);
        }
    });
}

exports.updateBookmarksOtomatis = () => {
    cron.schedule('20 15 * * *', async () => {
        try {
            await sequelize.query(`UPDATE daftar_tempat
            SET daftar_tempat.tempat_bookmark = (
            SELECT COUNT(bookmarks.tempat_id)
            FROM bookmarks
                WHERE bookmarks.tempat_id = daftar_tempat.tempat_id
            )`)
            console.log('Bookmark tempat berhasil diupdate');
        } catch (error) {
            console.log(error);
        }
    })
}

