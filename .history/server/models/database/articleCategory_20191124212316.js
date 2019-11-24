import db from './index';

module.exports = () => {
    const categoriesTable = async () => {
      await db.query(`CREATE TABLE IF NOT EXISTS categories (
              categoryId serial PRIMARY KEY, 
              categoryName VARCHAR (50) UNIQUE NOT NULL)`);
    };
  
    categoriesTable();
  };
  