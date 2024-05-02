import User from '../models/users.js';
import Post from '../models/posts.js';

//get user by username
const getUser = async (username) => {
    const user = await User.findOne({ username: username });
    return { username: user.username, displayName: user.displayName, profilePic: user.profilePic,
         friends: user.friends, friendsRequest: user.friendsRequest };
}

//get user by display name
const getUserByDisplayName = async (displayName) => {
    return await User.findMany({ displayName: displayName });
}

//create new user
const createUser = async (username, password, displayName, profilePic, friends, friendsRequest) => {
    if (await User.findOne({ username: username })) {
        throw new Error("Username already exists");
    }
    const user = new User({ username, password, displayName, profilePic });
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    return await user.save();
}

//update user by username
const updateUser = async (username, password, displayName, profilePic, friends, friendsRequest) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error("User not found");
    }
    if (password) {
        user.password = password;
    }
    if (profilePic) {
        user.profilePic = profilePic;
    }
    if (displayName) {
        user.displayName = displayName;
    }
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    //update user's posts
    const userPosts = await Post.find({ username: username });
    userPosts.forEach(async (post) => {
        //the only thing that can be updated in a post is the display name and profile pic
        if (displayName) {
            post.displayName = displayName;
        }
        if (profilePic) {
            post.profilePic = profilePic;
        }
        await post.save();
    });
    return await user.save();
}

//delete user by username
const deleteUser = async (username) => {
    //find user in db
    if (!await User.findOne({ username: username })) {
        throw new Error("User not found");
    }
    //delete user's posts
    await Post.deleteMany({ username: username })
    //find all posts in db
    const post = await Post.find({})
    //for each post, remove the user from the likeby list and comments list and
    //decrement the numlikes and numComments by 1 if the user has liked the post or commented on it
    var index;
    post.forEach(async (post) => {
        index = post.likeby.indexOf(username);
        if (index !== -1) {
            post.likeby.splice(index, 1);
            post.numlikes -= 1;
            await post.save();
        }
        post.comments.forEach(async (comment) => {
            if (comment.username === username) {
                index = post.comments.indexOf(comment);
                post.comments.splice(index, 1);
                post.numComments -= 1;
                await post.save();
            }
        });
    });
    //get all users from db
    const users = await User.find({});
    //for each user, remove the user from their friends list and friends request list
    users.forEach(async (user) => {
        index = user.friends.indexOf(username);
        if (index !== -1) {
            user.friends.splice(index, 1);
            await user.save();
        }
        index = user.friendsRequest.indexOf(username);
        if (index !== -1) {
            user.friendsRequest.splice(index, 1);
            await user.save();
        }
    });
    //finally, delete the user
    return await User.findOneAndDelete({ username: username });
}

//remove friend from user's friend list
const removeFriend = async (username, friend) => {
    //find user and friend in db
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend })

    //if user or friend not found, throw error
    if (!user || !friendUser) {
        throw new Error("User or friend not found");
    }
    //if friend is not in user's friend list, throw error
    var index = user.friends.indexOf(friend);
    if (index !== -1) {
        //remove friend from user's friend list
        user.friends.splice(index, 1);
    } else {
        throw new Error("FriendUser is not your friend")
    }
    index = friendUser.friends.indexOf(username)
    if (index !== -1) {
        //remove user from friend's friend list
        friendUser.friends.splice(index, 1)
    }
    await friendUser.save();
    return await user.save();
}

//add friend request to user's friend request list
const addFriendRequest = async (username, friend) => {
    //find user and friend in db
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend });
    //if user or friend not found, throw error
    if (!user || !friendUser) {
        throw new Error("user not found or friend not found")
    }
    //if user and friend are the same, throw error
    if (username === friend) {
        throw new Error("You can't add yourself as a friend")
    }
    if (!friendUser.friendsRequest.includes(username)) {
        //add user to friend's friend request list
        friendUser.friendsRequest.push(username);
    }
    return await friendUser.save();
}

//accept friend request
const acceptFriendRequest = async (username, friend) => {
    //find user and friend in db
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend });
    //if user or friend not found, throw error
    if (!user || !friendUser) {
        throw new Error("user not found")
    }
    //if friend is not in user's friend request list, throw error
    const index = user.friendsRequest.indexOf(friend);
    if (index !== -1) {
        //remove friend from user's friend request list
        user.friendsRequest.splice(index, 1);
        //add friend to user's friend list
        user.friends.push(friend);
        //add user to friend's friend list
        friendUser.friends.push(username);
    } else {
        throw new Error("friend request not found")
    }
    await friendUser.save();
    return await user.save();
}

//reject friend request
const rejectFriendRequest = async (username, friend) => {
    //find user db
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error("user not found")
    }
    //if friend is not in user's friend request list, throw error
    const index = user.friendsRequest.indexOf(friend);
    if (index !== -1) {
        //remove friend from user's friend request list
        user.friendsRequest.splice(index, 1);
    } else {
        throw new Error("friend request not found")
    }
    return await user.save();
}

//update post by post id
const updatePostUser = async (username, postid, content, image) => {
    //find post in db
    const post = await Post.findOne({ _id: postid });
    //if post not found, throw error
    if (!post) {
        throw new Error("Post not found");
    }
    //if user is not the author of the post, throw error
    if (post.username !== username) {
        throw new Error("You can only update your own post");
    }
    //update post
    post.content = content;
    post.image = image;
    return await post.save();
}

//delete post by post id
const deletePostUser = async (username, postid) => {
    //find post in db
    const post = await Post.findOne({ _id: postid });
    //if post not found, throw error
    if (!post) {
        throw new Error("Post not found");
    }
    //if user is not the author of the post, throw error
    if (post.username !== username) {
        throw new Error("You can only delete your own post");
    }
    //delete post
    return await Post.findOneAndDelete({ _id: postid });
}

//get friend list
const getFriendList = async (friend, username) => {
    //find friend in db
    const user = await User.findOne({ username: friend });
    //if friend not found, throw error
    if (!user) {
        throw new Error("User not found");
    }
    //if user is not friends with friend or user is not the same as friend, throw error
    if (user.friends.includes(username) || user.username === username) {
        //return friend's friend list
        return user.friends;
    } else {
        throw new Error("You are not friends with this user");
    }
}

//create post
const createPost = async (username, displayName, profilePic, date, content, numlikes, likeby, image, comments, numComments) => {
    const post = new Post({ username, displayName, profilePic, content });
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
    if (comments) {
        post.comments = comments;
    }
    if (numComments) {
        post.numComments = numComments;
    }
    return await post.save();
}

//get user posts
const getUserPosts = async (friend, username) => {
    const friendUser = await User.findOne({ username: friend });
    const user = await User.findOne({ username: username });
    if (!friendUser) {
        throw new Error("User not found");
    }
    if (friendUser.friends.includes(username) || friendUser.username === username) {
        return await Post.find({ username: friend });
    } else {
        throw new Error("You are not friends with this user");
    }
}

const addlike = async (username, postid) => {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.likeby.includes(username)) {
        throw new Error("You have already liked this post");
    }
    post.numlikes += 1;
    post.likeby.push(username);
    return await post.save();
}

const removeLike = async (username, postid) => {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    const index = post.likeby.indexOf(username);
    if (index === -1) {
        throw new Error("You have not liked this post");
    }
    post.numlikes -= 1;
    post.likeby.splice(index, 1);
    return await post.save();
}

const getLikeList = async (postid) => {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    return post.likeby;
}

const addComment = async (username, postid, content) => {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    post.comments.push({ username: username, content: content });
    post.numComments += 1;
    return post.save();
}

const removeComment = async (commentId, username, postid) => {
    const post = await Post.findOne({ _id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    const index = post.comments.findIndex((comment) => comment._id.toString() === commentId);
    if (index === -1) {
        throw new Error("Comment not found");
    }
    if (post.comments[index].username !== username) {
        throw new Error("You can only delete your own comment");
    }
    post.comments.splice(index, 1);
    post.numComments -= 1;
    return await post.save();
}

const updateComment = async (username, postid, commentId, content) => {
    const post = await Post.findOne({ _id: postid })
    if (!post) {
        throw new Error("Post not found")
    }
    const index = post.comments.findIndex((comment) => comment._id.toString() === commentId)
    if (index === -1) {
        throw new Error("Comment not found")
    }
    if (post.comments[index].username !== username) {
        throw new Error("You can only update your own comment")
    }
    post.comments[index].content = content
    return await post.save()
}

const getUserFriendRequestList = async (username) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error("User not found");
    }
    return user.friendsRequest;
}

export default {
    getUser,
    getUserByDisplayName,
    createUser,
    updateUser,
    deleteUser,
    removeFriend,
    addFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    updatePostUser,
    deletePostUser,
    getFriendList,
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