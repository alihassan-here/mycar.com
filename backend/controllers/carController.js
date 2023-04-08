const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const CarModel = require("../models/Car");
const { validationResult } = require("express-validator");
class Car {
  //@route POST /api/v1/create-car
  //@access Private
  //@desc CREATE car
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.color.length === 0) {
          errors.push({ msg: "Color is required!" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Price should be above $1!" });
        }
        if (parsedData.model.trim().length === 0) {
          errors.push({ msg: "Model is required!" });
        }
        if (parsedData.make.trim().length === 0) {
          errors.push({ msg: "Make is required!" });
        }
        if (parseInt(parsedData.mileage) < 0) {
          errors.push({ msg: "mileage should not be negative!" });
        }
        if (parsedData.category.trim().length === 0) {
          errors.push({ msg: "Category is required!" });
        }
        if (parsedData.registerationNo.trim().length === 0) {
          errors.push({ msg: "registerationNo is required!" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: "Description is required!" });
        }

        if (errors.length === 0) {
          if (!files["image"]) {
            errors.push({ msg: "Image is required" });
          }
          if (errors.length === 0) {
            const image = {};
            const mimeType = files[`image`].mimetype;
            const extension = mimeType.split("/")[1].toLowerCase();
            if (
              extension === "jpeg" ||
              extension === "jpg" ||
              extension === "png"
            ) {
              const imageName = uuidv4() + `.${extension}`;
              const __dirname = path.resolve();
              const newPath =
                __dirname + `/../frontend/public/images/${imageName}`;
              image[`image`] = imageName;
              fs.copyFile(files[`image`].filepath, newPath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            } else {
              const error = {};
              error["msg"] = `image  has invalid ${extension} type`;
              errors.push(error);
            }

            if (errors.length === 0) {
              try {
                const response = await CarModel.create({
                  category: parsedData.category,
                  price: parsedData.price,
                  color: parsedData.color,
                  model: parsedData.model,
                  year: parseInt(parsedData.year),
                  make: parsedData.make,
                  mileage: parsedData.mileage,
                  registerationNo: parsedData.registerationNo,
                  image: image["image"],
                  description: fields.description,
                  user: req.id,
                });
                return res
                  .status(201)
                  .json({ msg: "Car has been created", response });
              } catch (error) {
                console.log(error);
                return res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      }
    });
  }
  //@route POST /api/v1/cars/:page
  //@access Private
  //@desc FETCH ALL car
  async getAll(req, res) {
    console.log(req.id);
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await CarModel.find({}).countDocuments();
      const response = await CarModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ cars: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  //@route POST /api/v1/fetch-car/:id
  //@access Private
  //@desc FETCH car
  async fetchCar(req, res) {
    const { id } = req.params;
    try {
      const resp = await CarModel.findOne({ _id: id });
      return res.status(200).json(resp);
    } catch (error) {
      console.log(error.message);
    }
  }
  //@route POST /api/v1/update-car
  //@access Private
  //@desc UPDATE car
  async updateCar(req, res) {
    console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          price,
          color,
          model,
          year,
          make,
          mileage,
          registerationNo,
          description,
          category,
        } = req.body;
        const response = await CarModel.updateOne(
          { _id },
          {
            $set: {
              price,
              color,
              model,
              year,
              make,
              mileage,
              registerationNo,
              description,
              category,
            },
          }
        );
        return res.status(200).json({ msg: "Car has been updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  //@route POST /api/v1/delete-car/:id
  //@access Private
  //@desc DELETE car
  async deleteCar(req, res) {
    const { id } = req.params;
    try {
      const car = await CarModel.findOne({ _id: id });
      if (car) {
        await CarModel.findByIdAndDelete(id);
        return res
          .status(200)
          .json({ msg: "Car has been deleted successfully" });
      } else {
        return res.status(401).json({ msg: "Car deletion failed" });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new Car();
