module.exports = {

  async findContact(request, response){

    const {id} = req.params;

    const contact = await contactsController.findByPk(id);
    
    if(!contact){
      return response.status(400).json({error: "Contact not found"});
    }
    
    return response.json(contact);

  }
}