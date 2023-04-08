const { validationResult } = require("express-validator");
const generator = require("generate-password");
const UserModel = require("../models/User");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authServices");
const sendEmail = require("../services/sendEmail");

// //@route POST /api/register
// //@access Public
// //@desc Create user and return a token
// module.exports.register = async (req, res) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     const { name, email } = req.body;
//     try {
//       const emailExist = await UserModel.findOne({ email });
//       if (emailExist) {
//         return res
//           .status(401)
//           .json({ errors: [{ msg: `${email} is already taken` }] });
//       } else {
//         const password = generator.generate({
//           length: 10,
//           numbers: true,
//           symbols: true,
//           uppercase: true,
//           excludeSimilarCharacters: true,
//         });
//         const hashed = await hashedPassword(password);
//         console.log("data", name, email, password);
//         const user = await UserModel.create({
//           name,
//           email,
//           password: hashed,
//         });
//         console.log(user);
//         const message = `Hello ${name}, your password is ${password}. Please login using this password.`;
//         await sendEmail({ email, subject: "account password", message });
//         return res
//           .status(201)
//           .json({ msg: `Your account has been created! check your ${email}` });
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json("Internal Server Error");
//     }
//   } else {
//     //validation failed
//     return res.status(400).json({ errors: errors.array() });
//   }
// };

// //@route POST /api/login
// //@access Public
// //@desc Login user and return a token

// module.exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     try {
//       const user = await UserModel.findOne({ email });
//       if (user) {
//         if (await comparePassword(password, user.password)) {
//           const token = createToken(user._id, user.name);
//           if (user.admin) {
//             return res.status(201).json({
//               token,
//               admin: true,
//             });
//           } else {
//             return res.status(201).json({
//               token,
//               admin: false,
//             });
//           }
//         } else {
//           res.status(400).json({ errors: [{ msg: `Invalid password` }] });
//         }
//       } else {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: `${email} is not found!` }] });
//       }
//     } catch (error) {
//       return res.status(500).json("Internal Server Error");
//     }
//   } else {
//     return res.status(401).json({ errors: errors.array() });
//   }
// };

class User {
  //@route POST /api/v1/register
  //@access public
  //@desc REGISTER user
  async register(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, email } = req.body;
      try {
        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
          return res
            .status(401)
            .json({ errors: [{ msg: `${email} is already taken` }] });
        } else {
          const password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true,
          });
          const hashed = await hashedPassword(password);
          console.log("data", name, email, password);
          const user = await UserModel.create({
            name,
            email,
            password: hashed,
          });
          console.log(user);
          const message = `Hello ${name}, your password is ${password}. Please login using this password.`;
          await sendEmail({ email, subject: "account password", message });
          return res.status(201).json({
            msg: `Your account has been created! check your ${email}`,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
      }
    } else {
      //validation failed
      return res.status(400).json({ errors: errors.array() });
    }
  }

  //@route POST /api/v1/login
  //@access public
  //@desc login user
  async login(req, res) {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const user = await UserModel.findOne({ email });
        if (user) {
          if (await comparePassword(password, user.password)) {
            const token = createToken(user._id, user.name);
            if (user.admin) {
              return res.status(201).json({
                token,
                admin: true,
              });
            } else {
              return res.status(201).json({
                token,
                admin: false,
              });
            }
          } else {
            res.status(400).json({ errors: [{ msg: `Invalid password` }] });
          }
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: `${email} is not found!` }] });
        }
      } catch (error) {
        return res.status(500).json("Internal Server Error");
      }
    } else {
      return res.status(401).json({ errors: errors.array() });
    }
  }
}

module.exports = new User();
