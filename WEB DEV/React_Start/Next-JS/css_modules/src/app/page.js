import Image from "next/image";
import style from "./style.module.css";
import profile from "../../public/globe.svg";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});


export default function Page() {
  return (
    <div>
      <h1 className={style.txt}>
        CSS COLORS CHANGE ALL THE TIME?
      </h1>

      {/* <h2 style={{ fontFamily: "Dancing Script, cursive" }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto alias ipsa quaerat!
      </h2> */}

      <h2 className="roboto.className">hello who are you i am fine thank you</h2>
   

      <Image
        src={profile}
        alt="Vercel logo"
        width={500}
        height={200}
      />
    </div>
  );
}