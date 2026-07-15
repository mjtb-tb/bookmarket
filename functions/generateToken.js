import { sign , verify} from "jsonwebtoken";

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privatekey, {
    // algorithm: ''
    expiresIn: "24h",
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const validationResult =  verify(token, process.env.privateKey);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Error =>", err);
    return false;
  }
};


export {generateToken ,verifyToken };