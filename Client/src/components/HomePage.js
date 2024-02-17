import React, { useState, useEffect } from 'react';
import cheerLogo from '../assets/olli-cheer-logo.png';
import { Container, Col, Row } from 'react-bootstrap';
import './HomePage.css';
import ModularHeader from './ModularHeader';
const HomePage = () => {
  const [text, setText] = useState('');
  const fullText = "Too be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length - 1) {
        setText((prevText) => prevText + fullText[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 15); // Adjust speed as needed

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <div className="main">
        <Container className="caregiver-dashboard">
          <Row className="text-center">
            <Col>
              <img id="logo-img" src={cheerLogo} alt="CHEER Logo" style={{ width: '10%' }} />
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="cheer-title">
              <h1>CHEER Home</h1>
            </Col>
          </Row>
          <Row>
            <Col className="vision-statement">
              <h2>Our Vision</h2>
              <p>{text}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="about-us">
        <Row><br></br></Row>
        <Row><br></br></Row>

        <Row className="large-row">
          <Col>
            <ModularHeader title="About Us" />
            <p>Cheer Connections is a group of parents and
              caregivers, some have adult children in the
              CHEER group and some don’t, but we are all in
              a similar situation. We meet at least once a
              month to offer each other support and share
              our knowledge. Our winter meetings were
              funded by the Ontario Caregivers Association,
              which provided a relaxing day, a nice lunch,
              and great guest speakers. The Cheer
              Connections regularly gather for various
              workshops so that we may discuss information
              and learn together. We are all concerned
              about ODSP, housing, employment, social
              opportunities, etc. and a lot of our energy is
              given to finding solutions for our loved ones’
              future. This group helps reduce isolation for
              caregivers as well. It is a requirement of the
              CHEER Group that family members become
              involved with Cheer Connections. We are a
              close-knit social group that includes siblings,
              friends, and neighbours who care about
              someone with an intellectual disability. We are
              committed to developing a community of
              inclusion. We are supported by Ontario
              Caregivers Association, Algarva 168
              (Alhambra), and private community member
              donors. We also run various fundraisers and
              donations are accepted on line through
              Canada Helps. Looking for some social fun?…
              we have that too! Respite care is also available
              so you don’t have to worry about your loved
              one while you attend meetings.</p>
          </Col>
        </Row>
        <Row className="why-row">
          <ModularHeader title="Why Choose Cheer?" />
          <Col md={8}>
            <p>CHEER Group consists
              of families caring for an
              adult with higher
              functioning intellectual
              disabilities. We pool
              our resources to share
              in hiring support
              workers on a 4:1 ratio.
              Sharing support worker wages means it costs far less
              than the usual 1:1 ratio. Many of our families feel
              that, while support is definitely required, the level of
              1:1 is not necessary and the 1:4 is plenty of support
              for their person. We have two energetic full time
              support staff, a part-time staff, and some volunteer
              grade 12 students. Currently the rate is $13.50 per
              hour, as more attend the rate goes down. The Cheer
              Group Program can be paid through Passport
              funding!
              The best part is that attendees are spending time
              with their friends in their community! We follow a
              preset calendar of events published in the month
              prior. You sign up and pay for just what you use.
              There are even times when you can request some
              1:1 support if needed.
              We have our club house located at Rock Glen Family
              Resort and the use of their beautiful facilities,
              including an indoor pool, sauna, fitness centre, hall,
              and kitchen. Some of our projects are integrated
              with the wider community and there are planned
              special outings each month. We focus on building
              life skills, social skills, and leisure skills. We aim to
              build in as much community inclusion as possible
              with a focus on the “normal”.
              Attendees must be able to look after their own selfcare needs. Caregivers must be engaged, and
              interested in their person’s success and the success
              of the group as a whole. Family get togethers and
              volunteering is a great part of this group.
            </p>
          </Col>
          <Col md={4}>
            <img src={require('../assets/grouphappy.jpg')} alt="Group Happy" style={{ width: "100%", height: 'auto' }} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
