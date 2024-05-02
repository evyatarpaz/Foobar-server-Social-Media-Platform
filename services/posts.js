import Post from '../models/posts.js';
import User from '../models/users.js';

const createPost = async (username, displayName, date, content, numlikes, likeby, image) => {
    const post = new Post({username, displayName, content});
    if (date) {
        post.date = date;
    }
    if (numlikes) {
        post.numlikes = numlikes;
    }
    if (likeby) {
        post.likeby = likeby;
    }
    if (image) {
        post.image = image;
    }
    return await post.save();
}

const getPosts = async (username) => {
    const user = await User.findOne({ username: username });
    const friends = user.friends;
    
    const friendPosts = await Post.find({ username: { $in: friends } }).sort({ date: -1 }).limit(20);
    const nonFriendPosts = await Post.find({ username: { $nin: friends } }).sort({ date: -1 }).limit(5);
    if (friendPosts.length === 0) {
        return nonFriendPosts;
    }
    const allPosts = [...friendPosts, ...nonFriendPosts];
    allPosts.sort((a, b) => b.date - a.date);
    return allPosts;
}

const getPost = async (id) => {
    return await Post.findOne({ _id: id });
}

const getPostsByUserName = async (username) => {
    return await Post.find({ username : username }).sort({ date: -1});
}

const updatePost = async (id, username, displayName, date, content, numlikes, likeby, image) => {
    const post = await Post.findOne({ _id: id });
    if (username) {
        post.username = username;
    }
    if (displayName) {
        post.displayName = displayName;
    }
    if (date) {
        post.date = date;
    }
    if (content) {
        post.content = content;
    }
    if (numlikes) {
        post.numlikes = numlikes;
    }
    if (likeby) {
        post.likeby = likeby;
    }
    if (image) {
        post.image = image;
    }
    return await post.save();
}

const deletePost = async (id) => {
    await Post
        .findOneAndDelete({ id: id });
}

const getCommentsList = async (postid) => {
    const post = await Post.findOne({ _id: postid }); 
    return post.comments;
}

export default {    
    getPosts,
    getCommentsList
}
