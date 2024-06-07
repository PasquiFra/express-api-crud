const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorHandler = require('../middlewares/errorHandler')

const store = async (req, res) => {

    console.log("entrato posts 1")

    const { title, slug, image, content, categoryId, tags } = req.body

    const data = {
        title,
        slug,
        image,
        content,
        published: req.body.published ? true : false,
        tags: {
            connect: tags.map(id => ({ id }))
        }
    }
    if (categoryId) {
        data.categoryId = categoryId;
    }
    console.log(data)

    try {
        const post = await prisma.post.create({ data })
        res.status(200).send(post);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const showByPublished = (cf) => {
    prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            tags: {
                select: { name: true }
            },
            category: {
                select: { name: true }
            }
        }
    })
        .then(posts => cf(posts))
        .catch(err => console.error(err));
}

const showByString = (string, cf) => {
    prisma.post.findMany({
        where: { content: { contains: string } },
        include: {
            category: {
                select: { name: true }
            },
            tags: {
                select: { name: true }
            }
        }
    })
        .then(posts => cf(posts))
        .catch(err => console.error(err));
}

const index = async (req, res) => {

    console.log("entrato posts 2")

    try {
        if (req.query.string) {
            showByString(query.string, cf);
        } else if (req.query.published) {
            showByPublished(cf);
        } else {
            await prisma.post.findMany({
                include: {
                    tags: {
                        select: { name: true }
                    },
                    category: {
                        select: { name: true }
                    }
                }
            })
            res.json({
                data: posts,
                page: page,
                totalItems,
                totalPages
            });
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {

    console.log("entrato posts 3")

    try {
        const slug = req.params.slug;
        const post = await prisma.post.findUnique({
            where: {
                slug: slug
            },
            include: {
                tags: {
                    select: { name: true }
                },
                category: {
                    select: { name: true }
                }
            }
        })
        if (post) {
            res.json(post)
        } else {
            throw new Error(`Post con slug ${slug} non trovato.`, 404);
        }
    }
    catch (err) {
        errorHandler(err, req, res);
    }

}

const update = async (req, res) => {

    console.log("entrato posts 4")

    try {
        const { title, slug, image, content, categoryId, tags } = req.body

        const data = {
            title,
            slug,
            image,
            content,
            published: req.body.published ? true : false,
            tags: {
                connect: tags.map(id => ({ id }))
            }
        }
        if (categoryId) {
            data.categoryId = categoryId;
        }

        const post = await prisma.post.update({ where: { slug }, data })
        res.json(post);
    }
    catch (err) {
        errorHandler(err, req, res);
    }
}


const destroy = async (req, res) => {

    console.log("entrato posts 5")

    try {
        const slug = req.params.slug
        await prisma.post.delete({ where: { slug } })
        res.json(`Post con slug ${slug} eliminato con successo.`);
    }
    catch {
        err => console.error(err)
    };
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}