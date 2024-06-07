const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createTags = (tags, callbackFunction) => {
    prisma.tag.createMany({
        data: tags.map(tag => ({ name: tag }))
    })
        .then(tags => callbackFunction(tags)) // Restituisce un count
        .catch(err => console.error(err));
}

const readTags = (cf) => {
    prisma.tag.findMany()
        .then(tags => cf(tags))
        .catch(err => console.error(err));
}

module.exports = {
    createTags,
    readTags
}