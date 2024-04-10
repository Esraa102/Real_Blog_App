import { MdSubscriptions } from "react-icons/md";

const CallToAction = () => {
  return (
    <div className="p-6 flex bg-[#5C4755]/15 flex-col rounded-ss-3xl rounded-ee-3xl lg:flex-row gap-6 items-center  border-2 border-main">
      <div className="flex flex-col items-center  w-full lg:w-1/2 gap-6 ">
        <p className="text-center capitalize text-3xl font-bold">
          If You Can <span className="text-main uppercase">dream</span> it, you
          can <span className="text-main uppercase">become</span> it.
        </p>

        <a href="#" className="mb-8 flex gap-2 items-center  mx-auto main-btn">
          <span>Wanna Join Us</span>
          <MdSubscriptions size={24} />
        </a>
      </div>
      <img
        src="/assets/bg.jpg"
        className="w-full lg:w-1/2 object-cover rounded-lg"
        alt=""
      />
    </div>
  );
};

export default CallToAction;
