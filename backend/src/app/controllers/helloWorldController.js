async function introduction(){
    try {
        return {msg: "Hello World"};
    } catch (error) {
        console.error("Error in helloWorldController trying to say the introduction \n", error);
    }
}

module.exports = {
    introduction
}