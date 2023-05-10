const path = require('path')
const { v4: uuidv4 } = require('uuid')

const uploadDocuments = (files, extensions, folder = '') => {

    return new Promise((resolve, reject) => {
        const { attached } = files
        const nameAttached = attached.name.split('.')
        const extension = nameAttached[nameAttached.length - 1]

        if (!extensions.includes(extension)) {
            return reject('El tipo de archivo no es valido')
        }

        const newName = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', folder, newName)

        attached.mv(uploadPath, (err) => {
            if (err) {
                return reject('No se pudo cargar el archivo')
            }

            resolve(newName)
        });
    })
}

module.exports = { uploadDocuments }