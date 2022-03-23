import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import RCPlusGSocLogo from "/public/rcandgsoclogo.png";
import CirclesSVG from "/public/svg/circles.js";
import RCPlusGSocCompactLogo from "/public/rcandgsoclogocompact.png";
import NowLive from "/public/now-live.png";
import ArrowSVG from "/public/svg/arrow.js";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Infotiles from "../../../components/infotiles";
import { fetchAPI } from "../../../lib/api";
import { useEffect, useState } from "react";

const countdown = new Date("04/06/2022 10:00:00 AM UTC");

const Mainstage = ({ speakers }) => {
  const [timer, setTimer] = useState();
  
  useEffect(() => {
    setInterval(() => {
      const distance = countdown.getTime() - new Date().getTime();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
      if (distance < 0) {
        clearInterval(x);
        setTimer("We are now live!");
      }
    }, 1000);
  }, [timer]);

  return (
    <>
      <Head>
        <title>Conference Mainstage</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <CirclesSVG />
          <div className={styles.topNav}>
            <Link href="/">
              <h3 as="h3" className={styles.headerTitle}>
                Rocket.Chat
              </h3>
            </Link>
            <Image
              src={RCPlusGSocCompactLogo}
              className={styles.rcgsoccompactlogo}
            />
          </div>
          <Container>
            <Row>
              <Col md={6} xs={12}>
                <h2>Rocket.Chat's GSOC Alumni Summit 2022</h2>
                <span className={styles.thinText}>
                  We are pleased to announce our Google Summer of Code Alumni
                  Summit 2022. Our goal is to bring former and new contributors
                  together, among other interested parties to share experiences,
                  insights, and tips on how to get the most out of this amazing
                  program.
                </span>
                <p>{timer}</p>
              </Col>
              <Col md={6} xs={12} className={styles.imageHolders}>
                <Image className={styles.rcgsoclogo} src={RCPlusGSocLogo} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className={styles.liveNow}>
            <Col md={6} xs={12} className={styles.liveNowInnerCol}>
              <h5>
                The date of the summit will be{" "}
                <span className="text-primary">
                  April {countdown.getDate()}th starting at{" "}
                  {countdown.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: 'numeric',
                    hour12: true,
                  })}{" "}
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </span>
              </h5>
              <p className="fw-light fst-italic">
                Open Source is not only about technology. It's about people too!
                Human connections that will expand your network and enable you
                to both learn and teach along the way.
              </p>
              <p className={styles.thinText}>Click here to register</p>
              <button className={styles.btnColor}>
                Register <ArrowSVG />
              </button>
            </Col>
            <Col md={6} xs={12} className={styles.imageHolders}>
              <Image src={NowLive} />
            </Col>
          </Row>
        </Container>
        <Container>
          <h2 className={styles.heading}>
            Speakers
          </h2>
          <div className={styles.speakersContainer}>
            <Infotiles data={speakers} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Mainstage;

export async function getStaticProps({ params }) {
  const speakers = await fetchAPI("/speakers");
  return {
    props: { speakers },
    revalidate: 1,
  };
}
