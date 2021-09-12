const fs = require('fs');
const path = require('path');

module.exports = {
    products: JSON.parse(fs.readFileSync(path.join(__dirname, '/productsDataBase.json'), "utf-8")),
    writeJSON: (dataBase) => {
        fs.writeFileSync("./src/data/productsDataBase.json", JSON.stringify(dataBase), "utf-8")
    },
    users: JSON.parse(fs.readFileSync(path.join(__dirname, '/userDataBase.json'), "utf-8")),
    writeUsersJSON: (dataBase) => {
        fs.writeFileSync("./src/data/userDataBase.json", JSON.stringify(dataBase), "utf-8")
    }
}