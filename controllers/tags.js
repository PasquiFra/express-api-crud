const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const errorHandler = require('../middlewares/errorHandler')

const store = async (req, res) => {

    console.log("entrato tags 1")

    const { name } = req.body;

    const data = { name }

    try {
        const tag = await prisma.tag.create({ data });
        res.status(200).send(tag);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

const index = async (req, res) => {

    console.log("entrato tags 2")

    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index
}