const Photo = require('../models/Photo')

module.exports = {

  async listAll() {
    try {
        const photos = await Photo.findAll();

        return photos;

    } catch (error) {
        console.error("\nError in PhotoController trying to list all photos \n\n", error);
    }
  },

  async store(photoData) {
    try {
        const photo = await Photo.create({ 
          likes: photoData.likes,
          comments: photoData.comments,
          product_id: photoData.product_id,
          preferredComunicationMethod: photoData.preferredComunicationMethod
        });

        return photo;

    } catch (error) {
        console.error("\nError in PhotoController trying to create a photo \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(photoId){
    try {
        const status = await Photo.destroy({
            where: {
              id: photoId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in PhotoController trying to delete a photo \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(photoId, photoData){
    try {
        const photo = await Photo.update({
            likes: photoData.likes,
            comments: photoData.comments,
            product_id: photoData.product_id,
            preferredComunicationMethod: photoData.preferredComunicationMethod
        },{
            where: {
                id: photoId
            }
        });

        return photo;

    } catch (error) {
        console.error("\nError in PhotoController trying to update a photo by ID \n\n", error);
    }
  },

}