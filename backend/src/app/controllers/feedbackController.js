const Feedback = require('../models/Feedback')

module.exports = {
    async getById(feedbackId) {
        try {
            return { successful: true, res: await Feedback.findByPk(feedbackId) };
        } catch (error) {
            console.error("\nError in feedbackController trying to get a feedback by ID \n\n", error);
            return { successful: false, error: error };
        }
    },


    async getAll() {
        try {
            const feedbacks = await Feedback.findAll();
            
            return feedbacks;
    
        } catch (error) {
            console.error("\nError in feedbackController trying to get all feedbacks \n\n", error);
        }
    },

    async save(feedback) {
        try {
            return { successful: true, res: await Feedback.create(feedback) };
        } catch (error) {
            console.error("\nError in FeedbackController trying to create a Feedback \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(feedbackId, newFeedback){
        try {
            await Feedback.update(newFeedback, {
                where: {
                    id: feedbackId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in FeedbackController trying to update a feedback by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(feedbackId){
        try {
            await Feedback.destroy({
                where: {
                  id: feedbackId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in feedbackController trying to delete a feedback \n\n", error);
            return { successful: false, error: error };
        }
    }
}
