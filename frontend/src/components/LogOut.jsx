const LogOut = ({ full }) => {
  return (
    <button
      type="button"
      className={`main-btn block ${full ? "w-full" : "w-fit"}`}
    >
      Log Out
    </button>
  );
};

export default LogOut;
