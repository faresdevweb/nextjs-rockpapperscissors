import Button from "@/components/Button";
import logo_img from "@/public/images/logo.png";
import Image from "next/image";
import scissors_right_hand_img from "@/public/images/scissors_right_hand.png";
import rock_left_hand_img from "@/public/images/rock_left_hand.png";
import styles from "./page.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.left}>
        <Image src={logo_img} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <Image
          src={scissors_right_hand_img}
          alt="paper_hand"
          className={styles.paper_hand}
        />
        <Image
          src={rock_left_hand_img}
          alt="rock_hand"
          className={styles.rock_hand}
        />
        <div className={styles.btn_container}>
          <Button name="play with friend" type="friend" />
          <Button name="Play with stranger" type="stranger" />
        </div>
      </div>
    </>
  );
};

export default Home;
