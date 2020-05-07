const PhotoKeyword = require('../models/PhotoKeyword')

module.exports = {

  async listAll() {
    try {
        const photoKeywords = await PhotoKeyword.findAll();

        return photoKeywords;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to list all photoKeywords \n\n", error);
    }
  },

  async store(photokeywordData) {
    try {
        const photoKeyword = await PhotoKeyword.create({ 
          photo_id: photokeywordData.photo_id,
          keyword_id: photokeywordData.keyword_id
        });

        return photoKeyword;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to create a photoKeyword \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(photoKeywordId){
    try {
        const status = await PhotoKeyword.destroy({
            where: {
              id: photoKeywordId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to delete a photoKeyword \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(photoKeywordId, photokeywordData){
    try {
        const photoKeyword = await PhotoKeyword.update({
            photo_id: photokeywordData.photo_id,
            keyword_id: photokeywordData.keyword_id
        },{
            where: {
                id: photoKeywordId
            }
        });

        return photoKeyword;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to update a photoKeyword by ID \n\n", error);
    }
  },

}