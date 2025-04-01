import express from "express";
var server = express();

import bodyParser from "body-parser";
server.use(bodyParser.json({ limit: '5mb' }));
server.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
import cors from "cors";
server.use(cors());

import customEnv from 'custom-env';
customEnv.env('local', './config');

import net from 'net';
const addresses = process.env.ADDRESSES_TCP_INIT.split(',');
const sendData = (data) => {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(process.env.PORT_TCP, process.env.IP_ADDRESS_TCP, function() {
            client.write(data);
        });

        client.on('error', function(err) {
            console.log('Error: ' + err);
            reject(err);
        });

        client.on('end', function() {
            client.end()
            resolve();
        });
    });
}
// Usage
(async () => {
    await sendData(process.env.TCP_INIT); // Only wait for the first data to be sent
    for(let i = 0; i < addresses.length; i++) {
        sendData(addresses[i]); // Don't wait for the rest of the data to be sent
    }
})();

import mongoose from "mongoose";
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
import postsData from "./Posts.json" assert { type: 'json' };
import usersData from "./Users.json" assert { type: 'json' };
import Post from "./models/posts.js";
import User from "./models/users.js";

try {
    await User.insertMany(usersData);
    await Post.insertMany(postsData);
} catch (error) {
    console.log(error);
}

server.use(express.static('public'));

server.use(express.json());

import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import tokenRouter from "./routes/token.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.use("/api/tokens", tokenRouter);
server.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(process.env.PORT, () => {
    console.log("Server is running on port 8080 ");
});
