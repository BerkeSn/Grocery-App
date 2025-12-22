const { category } = require('../models/category'); 
const MONGO_DB_CONFIG = require("../config/app.config");

async function createCategory(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category name is required"
        });
    }

    const model = new category(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCategories(params, callback) {
    const categoryName = params.categoryName;
    var condition = categoryName ? {
        categoryName: { $regex: new RegExp(categoryName), $options: "i" }
    } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) - 1;

    category
        .find(condition, "categoryName categoryImage")
        .limit(perPage)
        .skip(page * perPage)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCategoryById(params, callback) {
    const categoryId = params.categoryId;

    category
        .findById(categoryId)
        .then((response) => {
            if (!response) {
                return callback({
                    message: "Category not found with Id " + categoryId
                });
            }
            
            else {
                return callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCategory(params, callback) {
    const categoryId = params.categoryId;

    category
        .findByIdAndUpdate(categoryId, params, { useFindAndModify: false, new: true })
        .then((response) => {
            if (!response) {
                return callback({
                    message: "Category not found with Id " + categoryId
                });
            }
            else {
                return callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteCategory(params, callback) {
    const categoryId = params.categoryId;

    category
        .findByIdAndDelete(categoryId, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                return callback({
                    message: "Category not found with Id " + categoryId
                });
            }
            else {
                return callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}