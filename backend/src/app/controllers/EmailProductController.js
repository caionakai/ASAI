const EmailProduct = require('../models/EmailProduct')

module.exports = {

   async listAll() {
      try {
         const emails = await EmailProduct.findAll();

         return emails;

      } catch (error) {
         console.error("\nError in EmailProductController trying to list all emails \n\n", error);
      }
   },

   async getById(id) {
      try {
         const email = await EmailProduct.findAll({ where: { email_id: id } });
         return email;
      } catch (error) {
         console.error("\nError in EmailProductController trying to get all EmailProducts by a Email ID \n\n", error);
      }
   },

   async store(emailData) {
      try {
         const emailProduct = await EmailProduct.create({
            product_id: emailData.product_id,
            email_id: emailData.email_id,
         });

         return emailProduct;

      } catch (error) {
         console.error("\nError in EmailProductController trying to create a EmailProduct \n\n", error);
      }
   },

}