const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createCategories = (categories, callbackFunction) => {
    prisma.category.createMany({
        data: categories.map(categories => ({ name: categories }))
    })
        .then(categories => callbackFunction(categories))
        .catch(err => console.error(err));
}

const readCategories = (cf) => {
    prisma.category.findMany()
        .then(categories => cf(categories)) // Restituisce un count
        .catch(err => console.error(err));
}

module.exports = {
    createCategories,
    readCategories
}