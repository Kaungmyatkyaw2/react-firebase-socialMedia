import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {FiEdit} from 'react-icons/fi'
import { BiChat } from "react-icons/bi";
import { BsHandThumbsUp, BsShare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import EditPost from "../pages/EditPost";

const PostCard = ({ post }) => {
  const nav = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const id = useSelector((state) => state.auth.userId);
  const [showCom, setShowCom] = useState(false);
  const [show, setShow] = useState(false);



  const handleDeletePost = async () => {
    if (id === post.authorId) {
      deleteDoc(doc(db, "posts", post.id))
        .then((s) => console.log(s))
        .catch((e) => console.log(e));
    } else {
      toast.error("You don't have access");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      updateDoc(doc(db, "posts", post.id), {
        comment: [
          ...post.comment,
          {
            displayName: userInfo?.displayName,
            userId: userInfo?.id,
            body: e.target[0].value,
            created: Date.now(),
            profilePhoto: userInfo?.photoUrl,
          },
        ],
      })
        .then((res) => console.log(res))
        .catch((error) => toast.error(error));
    } else {
      toast.error("Input Must Be Filled");
    }

    e.target[0].value = null;
  };

  const handleDeleteComment = async (comment) => {
    if (id === comment.userId) {
      updateDoc(doc(db, "posts", post.id), {
        comment: post.comment.filter((i) => i.created !== comment?.created),
      })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    } else {
      toast.error("You don't have access");
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-[5px] border">
        <div className="flex items-center justify-between  px-[20px] pt-[20px]">
          <div
            className="flex items-center space-x-[10px] cursor-pointer"
            onClick={() => nav(`/main/profile/${post?.authorId}`)}
          >
            <img
              className="rounded-btn object-cover"
              src={post?.authorImage}
              alt=""
            />
            <div>
              <h1 className="font-bold text-[17px]">{post?.author}</h1>
                    <span className="text-[12px]">{post?.create_time}</span>
            </div>

          </div>
          <div className="cursor-pointer relative group space-x-[20px]">
            <button onClick={handleDeletePost} className="text-[17px px-[8px] py-[7px] rounded-[3px] text-white bg-red-500 bg-opacity-90"><AiOutlineDelete/></button>
            <button onClick={() => setShow(true)} className="text-[17px px-[8px] py-[7px] rounded-[3px] text-white bg-primary bg-opacity-90"><FiEdit/></button>
      
          </div>
        </div>
        <div className="px-[20px] py-[15px]">
          <p className="text-[13px]">{post.description}</p>
        </div>
        <div className="w-full">
          <img src={post.image} alt="" />
        </div>
        <div className="flex justify-between px-[20px] py-[10px]">
          <div className="toCenter space-x-[5px]">
            <BsHandThumbsUp className="text-[15px]" />
            <span className="font-pop font-medium text-[13px] text-gray-600">
              Like
            </span>
          </div>
          <div
            className="toCenter space-x-[5px] cursor-pointer"
            onClick={() => setShowCom(!showCom)}
          >
            <BiChat className="text-[15px]" />
            <span className="font-pop font-medium text-[13px] text-gray-600">
              {post?.comment.length} Comments
            </span>
          </div>
          <div className="toCenter space-x-[5px]">
            <BsShare className="text-[15px]" />
            <span className="font-pop font-medium text-[13px] text-gray-600">
              Share
            </span>
          </div>
        </div>
        <form
          onSubmit={handleComment}
          className={`w-full py-[10px] px-[20px] ${
            showCom ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            className="w-full px-[20px] py-[10px] outline-none text-[15px] bg-gray-100 rounded-[5px] placeholder:text-[12px] font-pop tracking-wider focus:border-primary focus:border focus:border-opacity-40"
            placeholder="Express your though"
          />
        </form>
        <div
          className={`w-full py-[5px] px-[20px] hideScroll space-y-[20px] pb-[25px] ${
            showCom ? "block" : "hidden"
          }`}
        >
          {post.comment.map((i, index) => (
            <div
              key={index}
              className="w-full px-[20px] py-[10px] outline-none text-[15px] bg-gray-100 hover:bg-black hover:bg-opacity-10 cursor-pointer rounded-[5px] space-y-[5px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-[10px]">
                  <img
                    className="rounded-btn object-cover"
                    src={i.profilePhoto}
                    alt=""
                  />
                  <div className="text-[14px] font-bold">
                    <span>{i.displayName}</span>
                  </div>
                </div>
                <div
                  className="text-red-500 cursor-pointer"
                  onClick={handleDeleteComment.bind(null, i)}
                >
                  <AiOutlineDelete />
                </div>
              </div>
              <p className="text-[13px]">{i.body}</p>
            </div>
          ))}
        </div>
      </div>

      {show &&
        (post.authorId === id ? (
          <EditPost post={post} setShow={setShow} />
        ) : (
          (() => {
            toast.error("You dont't have access");
            setShow(false);
          })()
        ))}
    </>
  );
};

export default PostCard;
