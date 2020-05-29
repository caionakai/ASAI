const LeadItem = require('../models/LeadItem')

module.exports = {

    async listAll() {
        try {
            const leads = await LeadItem.findAll();
    
            return leads;
    
        } catch (error) {
            console.error("\nError in LeadItemController trying to list all leads \n\n", error);
        }
      },

    async store(leadData) {
        try {
            const lead = await LeadItem.create({ 
                lead: leadData.lead,
                company: leadData.company,
                person: leadData.person,
                age: leadData.age,
                gender: leadData.gender,
                phone: leadData.phone,  
                description: leadData.description
             });

            return lead;

        } catch (error) {
            console.error("\nError in LeadItemController trying to create a leadItem \n\n", error);
        }
    }
}
