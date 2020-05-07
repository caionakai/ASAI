const Keyword = require('../models/Keyword')

module.exports = {

  async listAll() {
    try {
        const keywords = await Keyword.findAll();

        return keywords;

    } catch (error) {
        console.error("\nError in KeywordController trying to list all keywords \n\n", error);
    }
  },

  async store(keywordData) {
    try {
        const keyword = await Keyword.create({
          word: keywordData.word
        });

        return keyword;

    } catch (error) {
        console.error("\nError in KeywordController trying to create a keyword \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(keywordId){
    try {
        const status = await Keyword.destroy({
            where: {
              id: keywordId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in KeywordController trying to delete a keyword \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(keywordId, keywordData){
    try {
        const keyword = await Keyword.update({
            word: keywordData.word
        },{
            where: {
                id: keywordId
            }
        });

        return keyword;

    } catch (error) {
        console.error("\nError in KeywordController trying to update a keyword by ID \n\n", error);
    }
  },

}