const Photo = require('../models/Photo')

const Page = require('../models/Page')

module.exports = {

  /*async listAll() {
    try {
      
        const photos = await Photo.findAll();

        //console.log(loadJOIN());
        //return loadJOIN();
        return photos;

    } catch (error) {
        console.error("\nError in PhotoController trying to list all photos \n\n", error);
    }
  },*/

  async listAll() {
    try {
        var pages = await Photo.findAll({raw: true, include: [{model: Page, as:'Page'}]});
        pages = JSON.parse(JSON.stringify(pages).split('"Page.id":').join('"page_id":'));
        pages = JSON.parse(JSON.stringify(pages).split('"Page.name":').join('"page_name":'));
        return pages;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to list all photoKeywords \n\n", error);
    }
  },

  async store(photoData) {
    try {
        const photo = await Photo.create({ 
          likes: photoData.likes,
          comments: photoData.comments,
          product_id: photoData.product_id
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
            product_id: photoData.product_id
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