import postService from '../services/posts.js';
import jwt from 'jsonwebtoken';

const getPosts = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'foo');
        const username = decodedToken.username;
        const posts = await postService.getPosts(username);
        res.json(posts);
    }
    catch (error) {
        res.status(401).send('Invalid token');
    }
}

const getCommentsList = async (req, res) => {
    try {
        const postid = req.params.pid;
        const commentsList = await postService.getCommentsList(postid);
        res.status(200).json(commentsList);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export {
    getPosts,
    getCommentsList
}

