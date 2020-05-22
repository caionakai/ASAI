const World = require('../models/World')

module.exports = {
    async listById(worldId) {
        try {
            const world = await World.findByPk(worldId);

            return world;

        } catch (error) {
            console.error("\nError in worldController trying to list a world by ID \n\n", error);
        }
    },

    async listAll() {
        try {
            const world = await World.findAll();

            return world;

        } catch (error) {
            console.error("\nError in worldController trying to list all worlds \n\n", error);
        }
    },

    async store(name) {
        try {
            const world = await World.create({ name });

            return world;

        } catch (error) {
            console.error("\nError in worldController trying to create a world \n\n", error);
        }
    },

    //Return an array with 0 on error or 1 in sucess
    async update(worldId, newName){
        try {
            const world = await World.update({
                name: newName
            },{
                where: {
                    id: worldId
                }
            });

            return world;

        } catch (error) {
            console.error("\nError in worldController trying to update a world by ID \n\n", error);
        }
    },

    //Return 0 on error or 1 in sucess
    async delete(worldId){
        try {
            const status = await World.destroy({
                where: {
                  id: worldId
                }
            });

            return status;

        } catch (error) {
            console.error("\nError in worldController trying to delete a world \n\n", error);
        }
    }
}