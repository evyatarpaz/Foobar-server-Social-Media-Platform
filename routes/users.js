import express from "express";
import {
    getUser,
    getUserByDisplayName,
    createNewUser,
    updateExistingUser,
    removeUser,
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
} from "../controllers/users.js";
import {authorization} from "../controllers/tokens.js";

const router = express.Router();

router.post("/", createNewUser); //create new user

router.get("/:id",authorization ,getUser); //get user id

router.patch("/:id",authorization ,updateExistingUser); //update user id

router.delete("/:id",authorization ,removeUser); //delete user id

router.post("/:id/posts",authorization ,createPost); //create post

router.get("/:id/posts",authorization ,getUserPosts); //get user posts

router.get("/:id/friends",authorization ,getUserFriends); //get friend list

router.post("/:id/friends",authorization ,addFriendRequest); //add friend request

router.get("/:id/friendsRequest",authorization ,getUserFriendRequestList); //get friend request list

router.patch("/:id/friends/:fid",authorization ,addFriend); //accept friend request fid in user id

router.delete("/:id/friends/:fid",authorization ,rejectFriendRequest); //reject friend request fid in user id

router.patch("/:id/posts/:pid",authorization ,updatePostUser); //update post pid

router.delete("/:id/posts/:pid",authorization ,deletePostUser); //delete post pid

router.post("/:id/posts/:pid/comment",authorization ,addComment); //add comment from user id to post pid

router.patch("/:id/posts/:pid/comment",authorization, updateComment); //update comment from user id to post pid

router.delete("/:id/posts/:pid/comment",authorization ,removeComment); //remove comment from user id to post pid

router.patch("/:id/posts/:pid/like",authorization ,addlike); //add like to post pid

router.delete("/:id/posts/:pid/like",authorization ,removeLike); //remove like from post pid

router.get("/:id/posts/:pid/like",authorization ,getLikeList); //get post like list [string -> username1, username2, ...]

router.get("/displayName/:did",authorization ,getUserByDisplayName); //get array of users with this display name(displayName = :did)

export default router;