import { categories } from "../constants";
import { useForm } from "react-hook-form";
import { UploadPostImg } from ".";

const PostForm = ({ imgUrl, setImgUrl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(imgUrl);
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

        <textarea
          id="desc"
          className={`h-[200px] w-full form-input resize-none ${
            errors.description && "input-error"
          }`}
          placeholder="Write what your post talking about"
          {...register("description", {
            required: true,
            minLength: 2,
            maxLength: 1000,
          })}
        ></textarea>
        {errors.description?.type === "required" && (
          <p className="error">Description is required</p>
        )}
        {errors.description?.type === "minLength" && (
          <p className="error">Description Should be at least 2 characters</p>
        )}
        {errors.description?.type === "maxLength" && (
          <p className="error">
            Descrption can&apos;t be more than 1000 characters
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <button type="submit" className="main-btn">
          Create Post
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
