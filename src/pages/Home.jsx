import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import SmallLoader from "../components/SmallLoader";
import { db } from "../firebase";
import { setPost } from "../store/Auth/AuthSlicer";

const Home = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.auth.posts);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    const unsub = onSnapshot(
      collection(db, "posts"),
      (snap) => {
        let list = [];
        snap.docs.forEach((i) => list.push({ id: i.id, ...i.data() }));
        dispatch(setPost(list));
        setLoad(false);
      },
      (error) => {
        console.log(error);
        setLoad(false);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (load) {
    return <SmallLoader/>
  }

  return (
    <div className="md:ml-[25%] md:w-[50%] w-full toCenter md:py-[20px] py-[50px]">
      <div className="w-[90%]">
        {/* <Myday/> */}
        <div className="w-full toCenter">
          <div className="sm:w-[85%] w-[100%] space-y-[40px]">
            {(post?.length && !load) ? (
              post.map((i, index) => <PostCard post={i} key={index} />)
            ) : (
              <div className="w-full toCenter">
                <h1 className="font-pop font-medium text-[30px]">
                  No post to show 🙁🙁
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
