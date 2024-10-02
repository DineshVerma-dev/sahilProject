import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";


// export const signup = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;



//     // Check if all fields are provided
//     if (!username || !email || !password || username === '' || email === '' || password === '') {
//       return next(errorHandler(400, 'All fields are required'));
//     }

//     // Hash the password using bcryptjs
//     const hashedPassword = bcryptjs.hashSync(password, 10);

//     // Create a new user object with the hashed password
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();

//     // Respond with the newly created user (remove sensitive data if needed)
//     res.status(201).json({
//       message: "User created successfully",
//       user: savedUser
//     });

//   } catch (error) {
//     // Log the error and send a response with an error message
//     console.error("Error during signup:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('SignUp successful');
  } catch (error) {
    next(error);
  }
};

// export const signin = async(req, res, next) => {
//   const { email, password } = req.body;

//   if(!email || !password || email === '' || password === ''){
//     next(errorHandler(400, 'All fields are required'));
//   }
//   try {
//     const validUser = await User.findOne({email});
//     if(!validUser){
//       return next(errorHandler(400, 'User not found'))
//     }
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if(!validPassword){
//       return next(errorHandler(400, 'Invalid Password'));
//     }

//     const token = jwt.sign(
//       {
//         id: validUser._id
//       },
//       process.env.JWT_SECRET
//     );

//     const {password: pass, ...rest} = validUser._doc;

//     res.status(200).cookie('access_token', token,{
//       httpOnly: true
//     }).json(rest)

//   } catch (error) {
//     next(error);
//   }
// }