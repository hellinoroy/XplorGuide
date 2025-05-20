const { Op } = require("sequelize")
const { daftar_tempat } = require("../models")
const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")

function uploadToCloudinary(tempatFoto) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "destination_image",
                allowed_formats: ["jpg", "png", "jpeg"],
            },
            (error, result) => {
                if (error) {
                    reject(new Error("Image tidak valid"));
                } else {
                    resolve(result.secure_url)
                }
            }
        );
        streamifier.createReadStream(tempatFoto.buffer).pipe(uploadStream);
    });
};

async function getPublicId(id) {
    const getTempat = await daftar_tempat.findOne({
        where: {
            tempat_id: id
        }
    })
    const getDestination = getTempat.tempat_foto.split("/")[7]
    const getId = getTempat.tempat_foto.split("/")[8].split(".")[0]
    const getPublicId = `${ getDestination }/${ getId }`
    return getPublicId
}

exports.createDestination = async (req, res) => {
    try {
        const { tempat_nama, tempat_deskripsi, tempat_kategori, tempat_kota, tempat_rating, tempat_harga, tempat_lat, tempat_long, tempat_updateTerakhir, tempat_bookmark } = req.body


        if (req.file) {
            const tempat_foto = req.file
            const uploadImg = await uploadToCloudinary(tempat_foto)
        } else {
            const uploadImg = null
        }


        const newDestination = await daftar_tempat.create({
            tempat_nama,
            tempat_deskripsi,
            tempat_kategori,
            tempat_kota,
            tempat_rating,
            tempat_harga,
            tempat_lat,
            tempat_long,
            tempat_updateTerakhir,
            tempat_bookmark,
            tempat_foto: uploadImg
        })
        return res.status(201).json({
            message: "Destination created",
            data: newDestination
        })
    } catch (error) {
        return res.status(500).json({
            message: error.stack
        })
    }
}
exports.deleteDestination = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: "id tidak ditemukan"
            })
        }
        const publicId = await getPublicId(id)
        if (!publicId) {
            return res.status(400).json({
                message: "public id tidak ditemukan"
            })
        }

        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            } else {
                console.log(result)
                console.log(`Deleted Image Public Id : ${ getPublicId }`)
            }
        })

        const deleteDestination = await daftar_tempat.destroy({
            where: {
                tempat_id: id
            }
        })
        return res.status(200).json({
            message: "Destination deleted",
            data: deleteDestination
        })
    } catch (error) {
        return res.status(500).json({
            message: error.stack
        })
    }
}

exports.getDestination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const search = req.query.search || ""
        const offset = (page - 1) * limit

        const notExistTempatNama = await daftar_tempat.findOne({
            where: {
                tempat_nama: {
                    [Op.like]: `%${ search }%`
                }
            }
        })
        if (!notExistTempatNama) {
            return res.status(400).json({
                message: "Tempat destinasi tidak ditemukan"
            })
        }

        if (search) {
            const getDestinationBySearch = await daftar_tempat.findAll({
                where: {
                    tempat_nama: {
                        [Op.like]: `%${ search }%`
                    }
                }
            })
            res.status(200).json({
                message: "Search destination Success",
                limit: 0,
                page: 0,
                data: getDestinationBySearch
            })
        }
        if (!search) {
            const getPaginateData = await daftar_tempat.findAll({
                limit,
                offset,
                order: [
                    ['tempat_id', 'ASC']
                ]
            })
            return res.status(200).json({
                message: "Get all destination Success",
                limit,
                page,
                data: getPaginateData
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

exports.updateDestination = async (req, res) => {
    try {
        const { id } = req.params
        const { tempat_nama, tempat_deskripsi, tempat_kategori, tempat_kota, tempat_rating, tempat_harga, tempat_lat, tempat_long, tempat_bookmark } = req.body
        const tempat_foto = req.file
        if (!id) {
            return res.status(400).json({
                message: "id tidak ditemukan"
            })
        }
        const publicId = await getPublicId(id)
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: error.stack
                })
            }
            else {
                console.log(result)
                console.log(`Deleted Image Public Id : ${ getPublicId }`)
            }
        })
        const uploadImg = await uploadToCloudinary(tempat_foto)
        const updateDestination = await daftar_tempat.update(
            {
                tempat_nama,
                tempat_deskripsi,
                tempat_kategori,
                tempat_kota,
                tempat_rating,
                tempat_harga,
                tempat_lat,
                tempat_long,
                tempat_bookmark,
                tempat_foto: uploadImg
            }, { where: { tempat_id: id } })
        return res.status(200).json({
            message: "Destination updated",
            data: updateDestination
        })
    } catch (error) {
        return res.status(500).json({
            message: error.stack
        })
    }
}