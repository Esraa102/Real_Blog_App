/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useEditCommentMutation } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
const EditComment = ({
  commentId,
  userId,
  setIsEditing,
  editedContent,
  setEditedContent,
}) => {
  const [editComment, { data, isError, isSuccess, error, isLoading }] =
    useEditCommentMutation();
  const handleEditComment = (e) => {
    e.preventDefault();
    editComment({ commentId, userId, content: editedContent });
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setIsEditing(false);
        toast.success("Comment has been updated successfully");
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [commentId, userId, isSuccess, isError]);
  return (
    <form onSubmit={handleEditComment} className="mt-4 w-full flex-1">
      <textarea
        name="edit-comment"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="form-input h-[70px] resize-none w-full"
      ></textarea>
      <div className="mt-3 flex gap-4 items-center flex-wrap justify-start md:justify-end">
        <button
          type="submit"
          className={`main-btn text-[16px] ${isLoading && "load-btn"}`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-gray-600 rounded-md hover:bg-gray-700 transition py-2 px-3 text-[16px] font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditComment;
