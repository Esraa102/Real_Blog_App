export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
