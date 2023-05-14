const { QueryTypes } = require('sequelize');  /// uso RAW QUERIES - replacement from sequelize
const { conn } = require('../db.js')


const getBookByCombinedFilters =  async ( title, genre, author) => {
    let query = `SELECT * FROM "Books" WHERE`;
    let needsAnd = false
    if(title) {
        query += ` title ILIKE %${title}% `
        needsAnd = true;
    }
    if(genre) {
        if(needsAnd) {
            query += ' AND '
        }
        query += ` genre = ${genre}`;
        needsAnd = true;
    }
    if(author) {
        if(needsAnd) {
            query += ' AND '
        }
        query += ` author = ${author}`;
        needsAnd = true;
    }
    const booksByCombinedFilters = await conn.query(
        query,
        {
            type: QueryTypes.SELECT
        }
    );

    if(booksByCombinedFilters.length > 0) {
        return booksByCombinedFilters;
    }
    else {
        throw new Error("There is not books with that title")
    }
}

module.exports = getBookByCombinedFilters;