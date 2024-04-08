/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PostForm } from "../components";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetPostByIdQuery } from "../features/posts/api/postsApiSlice";
const EditPost = () => {
  const { id } = useParams();
  const [defaultValues, setDefaultValues] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const {
    data: { post },
    isSuccess,
    error,
  } = useGetPostByIdQuery(id);
  useEffect(() => {
    if (isSuccess) {
      setDefaultValues({
        title: post.title,
        content: post.content,
        category: post.category,
      });
      setImgUrl(post.image);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [id]);

  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass px-4 py-6 rounded-md">
        <h1 className="text-3xl font-bold text-main mb-6">Update A Post</h1>
        <PostForm
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          defaultValues={defaultValues}
        />
      </div>
    </section>
  );
};

export default EditPost;
