const Page = require('../models/Page')


module.exports = {

  async listAll() {
    try {
        const pages = await Page.findAll();

        return pages;

    } catch (error) {
        console.error("\nError in Page Controller trying to list all pages \n\n", error);
    }
  },

  async store(PageData) {
    try {
        const page = await Page.create({
          name: PageData.name
        });

        return page;

    } catch (error) {
        console.error("\nError in Page Controller trying to create a page \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(pageId){
    try {
        const status = await Page.destroy({
            where: {
              id: pageId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in Page Controller trying to delete a page \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(pageId, pageData){
    try {
        const page = await Page.update({
            name: pageData.name
        },{
            where: {
                id: pageId
            }
        });

        return page;

    } catch (error) {
        console.error("\nError in Page Controller trying to update a page by ID \n\n", error);
    }
  },

}