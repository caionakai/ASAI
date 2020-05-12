const PhotoKeyword = require('../models/PhotoKeyword')

const Photo = require('../models/Photo')
const Keyword = require('../models/Keyword')
const Product = require('../models/Product')

module.exports = {

  /*async listAll() {
    try {
        const photoKeywords = await PhotoKeyword.findAll();

        return photoKeywords;

    } catch (error) {
        console.error("\nError in PhotokeywordController trying to list all photoKeywords \n\n", error);
    }
  }, */ 

  async listAll() {
    try {
        var words = await PhotoKeyword.findAll({raw: true, include: [{model: Keyword, as:'Keyword'}, {model: Photo, as:'Photo'}, {model: Product, as:'Product'}]});
        words = JSON.parse(JSON.stringify(words).split('"Photo.id":').join('"photo_id":'));
        words = JSON.parse(JSON.stringify(words).split('"Photo.likes":').join('"photo_likes":'));
        words = JSON.parse(JSON.stringify(words).split('"Photo.comments":').join('"photo_comments":'));
        words = JSON.parse(JSON.stringify(words).split('"Keyword.id":').join('"keyword_id":'));
        words = JSON.parse(JSON.stringify(words).split('"Keyword.word":').join('"word":'));
        words = JSON.parse(JSON.stringify(words).split('"Product.name":').join('"product_name":'));
        return words;

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