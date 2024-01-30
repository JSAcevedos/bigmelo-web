import Base from "../components/Base/Base";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/tokenSlice";
import { motion} from "framer-motion";

export default function Profile() {
  const subTitleClass = "text-title text-2xl";
  const textClass = "text-white text-4xl";
  const [userData, setUserData] = useState(false);
  const [error, setError] = useState(false);
  const token = useSelector(selectToken);
  const variants = {
    hidden: {
      y: "-10%",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4
      }
    }
  };

  const throwError = (err) => {
    throw new Error(err.message);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_LOCAL_API_URL + "/v1/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  error && throwError(error);

  return (
    <>
      <Base backButton={true}>
        <motion.div 
        className="flex flex-col items-center justify-center text-center space-y-10 m-28 relative grow responsive:min-h-[50vh] h-fit border-button border-y-2 shadow-xl shadow-indigo-900/60 responsive:py-3 py-8"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
          {userData && (
            <>
              <h2 className={subTitleClass}>Hasta hoy tienes:</h2>
              <p className="text-white text-6xl">
                {userData["remaining_messages"] === "Ilimitado"
                  ? "Mensajes Ilimitados"
                  : userData["remaining_messages"] + " Mensajes"}
              </p>
              <div className="flex responsive:flex-row flex-col responsive:space-x-12 space-x-0 responsive:space-y-0 space-y-12">
                {userData["remaining_messages"] != "Ilimitado" && (
                  <div>
                    <h3 className={subTitleClass}>Mensajes Usados</h3>
                    <p className={textClass}>{userData["used_messages"]}</p>
                  </div>
                )}
                <div>
                  <h3 className={subTitleClass}>
                    Limite de mensajes mensuales
                  </h3>
                  <p className={textClass}>{userData["message_limit"]}</p>
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                className="opacity-10 absolute z-10 w-auto min-w-fit min-h-fit max-w-none "
              >
                <source src="/public/video.mp4" type="video/mp4" />
              </video>
            </>
          )}
        </motion.div>
      </Base>
    </>
  );
}
