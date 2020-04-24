const contacts = [];

module.exports = {

  async store(request, response){

    const {name, adress, phone, email, preferredCommunicationMethod, isAssociate} = request.body;
  
    const contact = {
      name,
      adress,
      phone,
      email,
      preferredCommunicationMethod,
      isAssociate,
    }

    const emailExist = contacts.find(contact=> contact.email===email);
    if(emailExist){
      return response.json({message: "Email already exists"});
    }

    contacts.push(contact);
    // const client = await contactsController.create({name, adress, phone, email, preferredCommunicationMethod, isAssociate});
    return response.json(contact);

  },

  async index(request, response){
    // const contatcs = await contatcsController.findAll();
    return response.json(contacts);
  },

  async delete(request, response){
    // const {id} = request.params;
    // const contact = await contatcsController.destroy({where: {id}});
    return response.json({ok: true});
  },

  update(request, response){
    // const {id} = request.params;
    // const {name, adress, phone, email, preferredCommunicationMethod, isAssociate} = request.body;
    // const contact = await worldController.update({name, adress, phone, email, preferredCommunicationMethod, isAssociate},
    // {
    //   where: {
    //       id: worldId
    //   }
    // });
    // if(!contact){
    //   return response.status(400).json({error: "Contact not found"});
    // }
    return response.json({ok: true});
  }

}