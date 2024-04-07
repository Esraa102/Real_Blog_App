import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import { UploadPostImg } from ".";
import { categories } from "../constants";

const PostForm = ({ imgUrl, setImgUrl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const onSubmit = (data) => {
    console.log(data);

  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full md:w-[80%]"
    >
      <div className="field-container">
        <label className="label text-lg md:text-xl" htmlFor="title">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input  ${errors.title && "input-error"}`}
          placeholder="What is the title of your post?"
          {...register("title", {
            required: true,
            maxLength: 100,
            minLength: 2,
          })}
        />
        {errors.title?.type === "required" && (
          <p className="error">Title is required</p>
        )}
        {errors.title?.type === "minLength" && (
          <p className="error">Title Should be at least 2 characters</p>
        )}
        {errors.title?.type === "maxLength" && (
          <p className="error">Title can&apos;t be more than 100 characters</p>
        )}
      </div>
      <div className="field-container">
        <label className="label text-lg md:text-xl" htmlFor="category">
          Post Category
        </label>
        <select
          name="category"
          className="form-input cursor-pointer"
          id="category"
          {...register("category")}
        >
          {categories.map((category) => (
            <option
              className="bg-[#5C4755]"
              key={category}
              value={category.toLowerCase()}
            >
              {category}
            </option>
          ))}
        </select>
      </div>
      <UploadPostImg imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <div className="field-container">
        <label htmlFor="desc" className="label text-lg md:text-xl">
          Post Description
        </label>
        <ReactQuill
          id="desc"
          value={content}
          onChange={setContent}
          placeholder="Write Something..."
        />
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <button type="submit" className="main-btn">
          Publish
        </button>
        <button
          type="button"
          className="main-btn opacity-80 bg-gray-700 border-gray-700 hover:bg-gray-800 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
