const Sale = require('../models/Sale')
const SaleItem = require('../models/SaleItem')

const randomNumber = () => { return Math.floor(Math.random() * 100) }

module.exports = {
    async salesByMonthForYear(year) {
        // const months = {
        //     january: 0,
        //     february: 0,
        //     march: 0,
        //     april: 0,
        //     may: 0,
        //     june: 0,
        //     july: 0,
        //     august: 0,
        //     september: 0,
        //     october: 0,
        //     november: 0,
        //     december: 0,
        // }

        const mocked_months = {
            january: randomNumber(),
            february: randomNumber(),
            march: randomNumber(),
            april: randomNumber(),
            may: randomNumber(),
            june: randomNumber(),
            july: randomNumber(),
            august: randomNumber(),
            september: randomNumber(),
            october: randomNumber(),
            november: randomNumber(),
            december: randomNumber(),
        }

        try {
            const response = mocked_months
            // const sales =  await SaleItem.findAll({
            //     include: [{ model: Sale, as: 'sale' }]
            // })
            // if(Array.isArray(sales) && sales.length) {
            //     console.log(sales)
            // }
            return { successful: true, res: response };
        } catch (error) {
            console.error("\nError in analyticsController trying to get analytics\n\n", error);
            return { successful: false, error: error };
        }
    }
}
