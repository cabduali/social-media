import React, { useContext, useRef, useReducer, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const commentInput = useRef("");
  const { user, userData } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = (e) => {
    e.preventDefault();
    if (commentInput.current.value !== "") {
      try {
        const newComment = {
          id: Date.now().toString(),
          comment: commentInput.current.value,
          image: user?.photoURL,
          name:
            userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1) ||
            user?.displayName?.split(" ")[0],
          timestamp: new Date().toISOString(),
        };

        // Retrieve existing comments from localStorage
        const storedComments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
        storedComments.push(newComment);

        // Save updated comments to localStorage
        localStorage.setItem(`comments-${postId}`, JSON.stringify(storedComments));
        
        dispatch({ type: ADD_COMMENT, comments: storedComments });
        commentInput.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    try {
      const storedComments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
      dispatch({ type: ADD_COMMENT, comments: storedComments });
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
      console.log(err.message);
    }
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  return (
    <div className="flex flex-col bg-white w-full py-2 rounded-b-3xl">
      <div className="flex items-center">
        <div className="mx-2">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL || avatar}
          ></Avatar>
        </div>
        <div className="w-full pr-2">
          <form className="flex items-center w-full" onSubmit={addComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="w-full rounded-2xl outline-none border-0 p-2 bg-gray-100"
              ref={commentInput}
            ></input>
            <button className="hidden" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      {state?.comments?.map((comment, index) => (
        <Comment
          key={index}
          image={comment?.image}
          name={comment?.name}
          comment={comment?.comment}
        />
      ))}
    </div>
  );
};

export default CommentSection;
