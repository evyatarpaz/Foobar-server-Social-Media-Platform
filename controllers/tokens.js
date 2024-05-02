import { generateToken, verifyToken} from '../models/tokens.js';
import User from '../models/users.js';

const getToken = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({username});
        // Check if the user exists
        if (!user) {
            throw new Error("User not found");
        }
        // Check if the password is correct
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        // Generate the token
        const token = generateToken(username);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const authorization = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Authorization not found" });
        }
        const authorizations = req.headers.authorization.split(" ");
        if (authorizations[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid authorization" });
        }
        const token = authorizations[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        if (!verifyToken(token)) {
            return res.status(401).json({ message: "Invalid token" });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export {
    getToken,
    authorization
}