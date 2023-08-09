const express = require('express');
const router = express.Router();
const fs = require('fs');


// Ruta para eliminar una imagen por su nombre de archivo
router.delete('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `./storage/imgs/${imageName}`;
  
    // Verificar si el archivo de imagen existe
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ msg: 'La imagen no existe' });
      }
  
      // Eliminar el archivo de imagen
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Error al eliminar la imagen' });
        }
  
        res.json({ msg: 'Imagen eliminada exitosamente' });
      });
    });
  });
  
  module.exports = router;