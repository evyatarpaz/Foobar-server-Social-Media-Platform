import { url } from 'inspector';
import userServices from '../services/users.js';
import jwt from 'jsonwebtoken';
import net from 'net';
import customEnv from 'custom-env';
customEnv.env('local', './config');

const getUser = async (req, res) => {
    try {
        const user = await userServices.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserByDisplayName = async (req, res) => {
    try {
        const user = await userServices.getUserByDisplayName(req.params.did);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const createNewUser = async (req, res) => {
    try {
        const { username, password, displayName, profilePic, friends, friendsRequest } = req.body;
        const user = await userServices.createUser(username, password, displayName, profilePic, friends, friendsRequest);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateExistingUser = async (req, res) => {
    try {
        const { password, displayName, profilePic, friends, friendsRequest } = req.body;
        const username = req.params.id;
        const user = await userServices.updateUser(username, password, displayName, profilePic, friends, friendsRequest);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const removeUser = async (req, res) => {
    try {
        const user = await userServices.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const removeFriend = async (req, res) => {
    try {
        await userServices.removeFriend(req.params.id, req.params.fid);
        res.status(200).json({ message: "Friend removed successfully" });
    }
    catch (error) {
        if (error.message === "FriendUser is not your friend") {
            res.status(408).json({ message: error.message });
        }
        res.status(409).json({ message: error.message });
    }
}

const addFriendRequest = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, 'foo');
        const fromUser = decodedData.username;
        const toFriend = req.params.id;
        await userServices.addFriendRequest(fromUser, toFriend);
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        if (error.message === "You can't send friend request to yourself") {
            res.status(408).json({ message: error.message });
        } else {
            res.status(409).json({ message: error.message });
        }
    }
}

const rejectFriendRequest = async (req, res) => {
    try {
        await userServices.rejectFriendRequest(req.params.id, req.params.fid);
    } catch (error) {
        if (error.message === "friend request not found") {
            try {
                await userServices.removeFriend(req.params.id, req.params.fid)
            } catch (error) {
                res.status(408).json({ message: error.message });
            }
        } else {
            res.status(409).json({ message: error.message });
        }
    }
    res.status(200).json({ message: "Friend request removed successfully" });
}

const addFriend = async (req, res) => {
    try {
        await userServices.acceptFriendRequest(req.params.id, req.params.fid);
        res.status(200).json({ message: "Friend added successfully" });
    }
    catch (error) {
        if (error.message === "friend request not found") {
            res.status(408).json({ message: error.message });
        } else {
            res.status(409).json({ message: error.message });
        }
    }
}
const checkUrl = async (url) => {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(process.env.PORT_TCP, process.env.IP_ADDRESS_TCP, function () {
            console.log('Connected to the TCP server.');
            client.write(("2" + " " + url));
        });
        client.on('data', function (data) {
            console.log('Received: ' + data);
            client.end();
            if (data.toString() === 'true true') {
                console.log(data.toString());
                resolve({ malicious: true, message: "The content contains a malicious URL" });
            } else {
                console.log(data.toString());
                resolve({ malicious: false });
            }
        });
        client.on('error', function (err) {
            console.log('Error: ' + err);
            reject(err);
        });
    });
}

const updatePostUser = async (req, res) => {
    try {
        const { content, image } = req.body;
        const postid = req.params.pid;
        const username = req.params.id;
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
        const websiteAddresses = content.match(urlRegex) || [];
        if (websiteAddresses.length > 0) {
            for (const url of websiteAddresses) {
                try {
                    const result = await checkUrl(url);
                    if (result.malicious) {
                        return res.status(410).json({ message: result.message });
                    }
                    // Continue with your logic if the URL is not malicious
                } catch (error) {
                    // Handle error
                }
            }
        }
        const post = await userServices.updatePostUser(username, postid, content, image);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deletePostUser = async (req, res) => {
    try {
        const username = req.params.id;
        const postid = req.params.pid;
        const user = await userServices.deletePostUser(username, postid);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUserFriends = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, 'foo');
        const userFriendList = await userServices.getFriendList(req.params.id, decodedData.username);
        res.status(200).json(userFriendList);
    } catch (error) {
        if (error.message === "User not found") {
            res.status(408).json({ message: error.message });
        } else {
            res.status(409).json({ message: error.message });
        }
    }
}
const createPost = async (req, res) => {
    try {
        const { username, displayName, profilePic, date, content, numlikes, likeby, image, comments, numComments } = req.body;
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
        const websiteAddresses = content.match(urlRegex) || [];
        if (websiteAddresses.length > 0) {
            for (const url of websiteAddresses) {
                try {
                    const result = await checkUrl(url);
                    if (result.malicious) {
                        return res.status(410).json({ message: result.message });
                    }
                } catch (error) {
                    // Handle error
                }
            }
        }
        const post = await userServices.createPost(username, displayName, profilePic, date, content, numlikes, likeby, image, comments, numComments);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, 'foo');
        const username = decodedData.username;
        const friend = req.params.id;
        const userPosts = await userServices.getUserPosts(friend, username);
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const addlike = async (req, res) => {
    try {
        const postid = req.params.pid;
        const username = req.params.id;
        const post = await userServices.addlike(username, postid);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const removeLike = async (req, res) => {
    try {
        const postid = req.params.pid;
        const username = req.params.id;
        const post = await userServices.removeLike(username, postid);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const getLikeList = async (req, res) => {
    try {
        const postid = req.params.pid;
        const likeList = await userServices.getLikeList(postid);
        res.status(200).json(likeList);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const addComment = async (req, res) => {
    try {
        const postid = req.params.pid;
        const username = req.params.id;
        const content = req.body.content;
        const post = await userServices.addComment(username, postid, content);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const removeComment = async (req, res) => {
    try {
        const postid = req.params.pid;
        const username = req.params.id;
        const commentId = req.body.commentId;
        const post = await userServices.removeComment(commentId, username, postid);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const postid = req.params.pid;
        const username = req.params.id;
        const commentId = req.body.commentId;
        const content = req.body.content;
        const post = await userServices.updateComment(username, postid, commentId, content);
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUserFriendRequestList = async (req, res) => {
    try {
        const user = req.params.id;
        const userFriendList = await userServices.getUserFriendRequestList(user);
        res.status(200).json(userFriendList);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export {
    getUser,
    getUserByDisplayName,
    createNewUser,
    updateExistingUser,
    removeUser,
    removeFriend,
    addFriendRequest,
    rejectFriendRequest,
    addFriend,
    updatePostUser,
    deletePostUser,
    getUserFriends,
    createPost,
    getUserPosts,
    addlike,
    removeLike,
    getLikeList,
    addComment,
    removeComment,
    getUserFriendRequestList,
    updateComment
}
