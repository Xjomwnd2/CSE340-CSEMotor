const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 *************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error: " + error);
  }
}

module.exports = { getClassifications, getInventoryByClassificationId };

/* **********************************************************************************
 *  This model will handle the insertion of the new classification into the database
 * ******************************************************************************** */
// In inventoryModel.js
const db = require('../database/connection'); // Your database connection

// Function to insert classification into the database
exports.insertClassification = async (classificationName) => {
  const sql = 'INSERT INTO classifications (classification_name) VALUES (?)';
  return db.query(sql, [classificationName]);
};
