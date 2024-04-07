import { PostForm } from "../components";

const CreatePost = () => {
  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass px-4 py-6 rounded-md">
        <h1 className="text-3xl font-bold text-main mb-6">Create New Post</h1>
        <PostForm />
      </div>
    </section>
  );
};

export default CreatePost;
