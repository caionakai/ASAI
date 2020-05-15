const Email = require('../models/EmailMarketing')
const nodemailer = require('nodemailer');
const Employee = require('../controllers/EmployeeController');
const Client = require('../controllers/ClientController');

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   auth: {
      type: "OAuth2",
      user: 'productsasai@gmail.com',
      clientId: '1058679112155-fhsvbkvt733tg3ehbomoknoj662lk1ls.apps.googleusercontent.com',
      clientSecret: 'Oyc058x8ZUB7H91bnvSpA3x8',
      refreshToken: '1//04TaWB3HpgfkxCgYIARAAGAQSNwF-L9IrjTuqcP09Nn5SuGcI2Y67lYpmMg6ajl2lIjAKQE8rlLoYLSU_O0adFDhPgHiFCMRmdz8'
   }
})

async function sendTo(receiverEmail, emailData) {
   var mailOptions = {
      from: 'ASAI Products <productsasai@gmail.com>',
      to: receiverEmail,
      subject: emailData.subject,
      text: emailData.text,
   }

   transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
         console.log('Error' + err);
      } else {
         console.log('Email sent!');
      }
   })
}

module.exports = {

   async listAll() {
      try {
         const emails = await Email.findAll();

         return emails;

      } catch (error) {
         console.error("\nError in EmailMarketingController trying to list all emails \n\n", error);
      }
   },

   async getById(id) {
      try {
         const email = await Email.findByPk(id);
         return email;
      } catch (error) {
         console.error("\nError in EmailMarketingController trying to get a Email by ID \n\n", error);
      }
   },

   async store(emailData) {
      try {
         const emails = await Email.create({
            receiver: emailData.receiver,
            mail_date: emailData.mail_date,
         });

         return emails;

      } catch (error) {
         console.error("\nError in EmailMarketingController trying to create a email \n\n", error);
      }
   },

   async send(emailData) {
      try {
         if (emailData.receiver == 'everyone') {
            const employees = await Employee.listAll();
            const customers = await Client.listAll();
            const resultemp = await Promise.all(employees.map(item => {
               return sendTo(item.email, emailData);
            }));
            const resultcust = await Promise.all(customers.map(item => {
               return sendTo(item.email, emailData);
            }));
         }

         if (emailData.receiver == 'employees') {
            const employees = await Employee.listAll();

            const result = await Promise.all(employees.map(item => {
               return sendTo(item.email, emailData);
            }));
         }

         if (emailData.receiver == 'customers') {
            const customers = await Client.listAll();

            const result = await Promise.all(customers.map(item => {
               return sendTo(item.email, emailData);
            }));
         }

         return;
      } catch (error) {
         //console.error("\nError in sending email \n\n", error);
         return (send(emailData))
      }

   }

}