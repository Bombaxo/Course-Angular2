/** Module to read master objects in memory */
module.exports = (app, path) => {

    // Can answer emitting JSON

    const kinds = [        
        { id: 1, text: 'Income' },
        { id: 2, text: 'Expense' },
        { id: 3, text: 'Extra' }
        
    ];

    const categories = [
        { id: 0,  text: '-- Incomes --', type: 1 },
        { id: 1,  text: 'Paysheet', type: 1 },
        { id: 2,  text: 'Sales', type: 1 },
        { id: 3,  text: 'Bank interest', type: 1 },
        { id: 4,  text: '-- Expenses --', type: 2 },
        { id: 5,  text: 'Mortgage', type: 2 },
        { id: 6,  text: 'Purchases', type: 2 },
        { id: 7,  text: 'Debits', type: 2 },
        { id: 8,  text: 'Taxes', type: 2 },
        { id: 9,  text: 'Insurances', type: 3 },
        { id: 10, text: '-- Extras --', type: 3 },
        { id: 11, text: 'Cinema', type: 3 },
        { id: 12, text: 'Restaurants', type: 3 },
        { id: 13, text: 'Travels', type: 3 },
        { id: 14, text: 'Festivals', type: 3 }
    ];

    /** When get is received in this route, response with this function */
    app.get(`${path}/kinds`, (req, res) =>  res.json(kinds));

    app.get(`${path}/categories`, (req, res) => res.json(categories));
}

