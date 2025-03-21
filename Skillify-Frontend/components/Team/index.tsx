import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const developers = [
  {
    name: "Chamodya Chirath",
    role: "Full stack Developer & Product Manager",
    image: "/images/team/chirath.jpg",
    linkedIn: "https://www.linkedin.com/in/chirath-abeymanna-990700292",
    instagram: "#!",
  },
  {
    name: "Devmina Ranasinghe",
    role: "Full stack Developer & AI/ML Engineer",
    image: "images/team/Devmina.jpg",
    linkedIn: "https://www.linkedin.com/in/dev-ranasinghe",
    instagram: "#!",
  },
  {
    name: "Renal Perera",
    role: "Full stack Developer & QA Engineer",
    image: "images/team/Renal.jpg",
    linkedIn: "https://www.linkedin.com/in/renal-perera-b880ba295",
    instagram: "#!",
  },
  {
    name: "Sehansa Dilsadi",
    role: "Frontend Developer & UI/UX Designer",
    image: "/images/team/sehansa.jpg",
    linkedIn: "https://www.linkedin.com/in/sehansa-dilsadi-a42633334/",
    instagram: "#!",
  },
  {
    name: "Onel Silva",
    role: "Full stack Developer & Database Administrator",
    image: "/images/team/onel.jpg",
    linkedIn: "https://www.linkedin.com/in/onel-silva-203031290",
    instagram: "#!",
  },
  {
    name: "Nadini Salisha",
    role: "Frontend Developer & Technical Writer",
    image: "images/team/nadini.jpg",
    linkedIn: "http://www.linkedin.com/in/nadini-atugoda-5a06542b3",
    instagram: "#!",
  },
];

const ProfileCard = () => {
  return (
    <div
      id="team"
      className="mx-auto lg:w-max lg:px-32 bg-slate-100 rounded-xl  min-h-screen flex justify-center items-center mb-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((developer, index) => (
          <div
            key={index}
            className="w-full max-w-[300px] shadow-2xl p-8 pb-14 m-4 rounded-xl text-gray-800 dark:text-gray-400 overflow-hidden group hover:shadow-2xl hover:shadow-sky-500/50 motion-safe:transition-all motion-safe:duration-700"
          >
            <figure className="relative w-40 h-40 m-0 mx-auto rounded-full outline outline-offset-4 outline-sky-500 before:content-[''] before:absolute before:block before:pointer-events-none before:rounded-full before:h-full before:w-full before:bg-sky-500 before:-z-[1] group-hover:before:scale-[2.5] motion-safe:before:transition-all motion-safe:transform-gpu motion-safe:before:duration-500 before:origin-center group-hover:outline-sky-400">
              <img
                className="rounded-[50%] w-[10rem] h-[10rem] block bg-sky-500 object-cover z-10 relative"
                src={developer.image}
                alt="Avatar"
              />
            </figure>
            <header className="motion-safe:translate-y-4 group-hover:translate-y-0 motion-safe:transition-transform motion-safe:transform-gpu motion-safe:duration-500">
              <h3 className="font-semibold text-2xl text-center text-sky-500 mt-6 group-hover:text-gray-50 dark:group-hover:text-gray-800 relative">
                {developer.name}
              </h3>
              <p className="text-center group-hover:text-gray-50 dark:group-hover:text-gray-800 relative">
                {developer.role}
              </p>
            </header>

            <footer className="relative mt-14 w-max text-center mx-auto">
              <a
                target="_blank"
                href={developer.linkedIn}
                className="bg-sky-500 flex justify-center space-x-5 text-white py-2 px-6 rounded-full text-lg hover:bg-sky-600"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 mt-1 mr-5" />
                LinkedIn
              </a>
            </footer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
