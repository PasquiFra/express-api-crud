const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const errorHandler = require('../middlewares/errorHandler')

const store = async (req, res) => {

    console.log("entrato categories 1")

    const { name } = req.body;

    const data = { name }

    try {
        const category = await prisma.category.create({ data });
        res.status(200).send(category);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

const index = async (req, res) => {

    console.log("entrato categories 2")

    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index
}