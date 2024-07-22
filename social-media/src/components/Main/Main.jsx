import React, { useState, useRef, useContext, useEffect, useReducer } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import { AuthContext } from "../AppContext/AppContext";
import { Alert } from "@material-tailwind/react";
import PostCard from "./PostCard";
import avatar from "../../assets/images/avatar.jpg";
import live from "../../assets/images/live.png";
import smile from "../../assets/images/smile.png";
import addImage from "../../assets/images/add-image.png";
import { PostsReducer, postActions, postsStates } from "../AppContext/PostReducer";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    const loadPosts = () => {
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      dispatch({
        type: SUBMIT_POST,
        posts: storedPosts,
      });
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setImage(null);
      setFile(null);
      setProgressBar(0);
    };
    loadPosts();
  }, [SUBMIT_POST]);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        const newPost = {
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL || avatar,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: new Date().toISOString(),
        };
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        storedPosts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(storedPosts));
        dispatch({
          type: SUBMIT_POST,
          posts: storedPosts,
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.error(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const submitImage = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setProgressBar(100);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar size="sm" variant="circular" src={user?.photoURL || avatar} alt="avatar" />
          <form className="w-full" onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`What's on your mind ${
                    user?.displayName?.split(" ")[0] || userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)
                  }`}
                  className="outline-none w-full bg-white rounded-md"
                  ref={text}
                />
              </div>
              <div className="mx-4">
                {image && <img className="h-24 rounded-xl" src={image} alt="previewImage" />}
              </div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span style={{ width: `${progressBar}%` }} className="bg-blue-700 py-1 rounded-md"></span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label htmlFor="addImage" className="cursor-pointer flex items-center">
              <img className="h-10 mr-4" src={addImage} alt="addImage" />
              <input id="addImage" type="file" style={{ display: "none" }} onChange={handleUpload} />
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                Upload
              </Button>
            )}
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={live} alt="live" />
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">Live</p>
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={smile} alt="feeling" />
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">Feeling</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {state.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">Something went wrong, please refresh and try again...</Alert>
          </div>
        ) : (
          <div>
            {state.posts.length > 0 &&
              state.posts.map((post, index) => (
                <PostCard
                  key={index}
                  logo={post.logo}
                  id={post.timestamp}
                  uid={post.uid}
                  name={post.name}
                  email={post.email}
                  image={post.image}
                  text={post.text}
                  timestamp={new Date(post.timestamp).toUTCString()}
                />
              ))}
          </div>
        )}
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Main;
