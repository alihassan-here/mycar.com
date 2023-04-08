const { validationResult } = require("express-validator");
const CategoryModel = require("../models/Category");

class Category {
  //@route POST /api/v1/create-category
  //@access Private
  //@desc CREATE category
  async create(req, res) {
    const errors = validationResult(req);
    const { name, description } = req.body;
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({
          name,
          description,
          user: req.id,
        });
        return res
          .status(201)
          .json({ msg: "category has created successfully" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exist` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  //@route POST /api/v1/categories/:page
  //@access Private
  //@desc FETCH ALL category
  async getAllCategories(req, res) {
    const page = req.params.page || 1;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
      const count = await CategoryModel.find({}).countDocuments();
      const response = await CategoryModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ categories: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  //@route POST /api/v1/fetch-category/:id
  //@access Private
  //@desc FETCH category
  async fetchCategory(req, res) {
    const { id } = req.params;
    try {
      const resp = await CategoryModel.findOne({ _id: id });
      return res.status(200).json({ category: resp });
    } catch (error) {
      console.log(error.message);
    }
  }
  //@route POST /api/v1/update-category/:id
  //@access Private
  //@desc UPDATE category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const exist = await CategoryModel.findOne({ name });
        if (!exist) {
          const resp = await CategoryModel.updateOne(
            { _id: id },
            { $set: { name } }
          );
          return res.status(200).json({
            message: "Your category has been updated!",
          });
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: `${name} category is already exist` }] });
        }
      } else {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //@route POST /api/v1/delete-category/:id
  //@access Private
  //@desc DELETE category
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      await CategoryModel.deleteOne({ _id: id });
      return res.status(200).json({
        message: "Category has been deleted successfully!!",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal Server Error!");
    }
  }
  //@route POST /api/v1//allcategories
  //@access Private
  //@desc GET ALL categories
  async allCategories(req, res) {
    try {
      const categories = await CategoryModel.find({});
      return res.status(200).json({
        categories,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal Server Error!");
    }
  }
}

module.exports = new Category();
