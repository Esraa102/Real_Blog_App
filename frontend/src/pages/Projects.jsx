import { CallToAction } from "../components";

const Projects = () => {
  return (
    <section className="container min-h-screen mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass p-6 rounded-md">
        <h1 className="text-4xl font-bold text-main mt-8 mb-4 text-center">
          Projects
        </h1>
        <p className="text-center text-gray-400">
          Discover our blog and share others you interests and talents
        </p>
        <div className="my-10 w-full mx-auto max-w-4xl">
          <CallToAction />
        </div>
      </div>
    </section>
  );
};

export default Projects;
