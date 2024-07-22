import React, { useState, useContext, useReducer } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import like from "../../assets/images/like.png";
import comment from "../../assets/images/comment.png";
import remove from "../../assets/images/delete.png";
import addFriend from "../../assets/images/add-friend.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import CommentSection from "./CommentSection";

const PostCard = ({ uid, id, logo, name, email, text, image, timestamp }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);

  const post = state.posts.find(p => p.timestamp === id) || {};
  const likes = post.likes || [];

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addUser = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = storedUsers.findIndex(u => u.uid === user?.uid);
      if (userIndex !== -1) {
        storedUsers[userIndex].friends.push({ id: uid, image: logo, name: name });
        localStorage.setItem("users", JSON.stringify(storedUsers));
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    try {
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const postIndex = storedPosts.findIndex(p => p.timestamp === id);
      if (postIndex !== -1) {
        const likes = storedPosts[postIndex].likes || [];
        const likeIndex = likes.findIndex(l => l === user?.uid);
        if (likeIndex !== -1) {
          likes.splice(likeIndex, 1); // Remove like
        } else {
          likes.push(user?.uid); // Add like
        }
        storedPosts[postIndex].likes = likes;
        localStorage.setItem("posts", JSON.stringify(storedPosts));
        dispatch({
          type: ADD_LIKE,
          id: id,
          likes: likes,
        });
      }
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
      console.log(err.message);
    }
  };

  const deletePost = (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        let storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        storedPosts = storedPosts.filter(post => post.timestamp !== id);
        localStorage.setItem("posts", JSON.stringify(storedPosts));
        window.location.reload();
      } else {
        dispatch({ type: HANDLE_ERROR });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="py-4">
      <div className="flex flex-col bg-white rounded-3xl shadow-lg w-full">
        <div className="flex justify-between items-center py-2 px-4">
          <div className="flex items-center py-2 px-4">
            <Avatar size="sm" variant="circular" src={logo || avatar} alt="avatar" />
            <div className="flex flex-col">
              <p className="font-medium ml-4">{name}</p>
              <p className="font-normal ml-4">{email}</p>
            </div>
          </div>
          <div className="flex items-center py-2 px-4">
            <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none mr-4">{timestamp}</p>
            <img src={remove} alt="remove" className="cursor-pointer" onClick={deletePost} />
          </div>
        </div>
        <div className="flex flex-col w-full p-4">
          <div className="py-4">
            <p>{text}</p>
          </div>
          <div>
            {image && <img className="rounded-xl" src={image} alt="uploaded" />}
          </div>
          <div className="flex justify-around items-center py-4">
            <div className="flex items-center cursor-pointer" onClick={handleLike}>
              <img src={like} alt="like" className="h-10 mr-4" />
              <p>{likes.includes(user?.uid) ? 'Unlike' : 'Like'} ({likes.length})</p>
            </div>
            <div className="flex items-center cursor-pointer">
              <img src={comment} alt="comment" className="h-10 mr-4" onClick={handleOpen} />
              <p>Comment</p>
            </div>
            <div className="flex items-center cursor-pointer">
              <img src={addFriend} alt="addFriend" className="h-10 mr-4" onClick={addUser} />
              <p>Add friend</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {open && <CommentSection id={id} />}
      </div>
    </div>
  );
};

export default PostCard;
