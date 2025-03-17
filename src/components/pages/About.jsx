import React from "react";
import { useTheme } from "@mui/material/styles";
import "./About.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BounceHeader from "../tools/BounceHeader";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const About = () => {
  const theme = useTheme();

  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };

  return (
    <div>
      <div>
        <BounceHeader text='About As' />
      </div>
      <div className='container_about'>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <Diversity3Icon style={{ fontSize: 80 }} className='about_icons' />
          </span>
          <p>
            Our website is a unique resource where you can find the best
            verified business partners. Here you can find contacts and
            information about companies ready for cooperation and mutually
            beneficial partnerships.
          </p>
        </div>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <HandshakeIcon style={{ fontSize: 80 }} className='about_icons' />
          </span>
          <p>
            We invite you to become a part of our community! Simply sign up on
            our website and gain access to valuable resources that will help you
            develop your business and find new partnerships.
          </p>
        </div>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <PersonAddIcon style={{ fontSize: 80 }} className='about_icons' />
          </span>
          <p>
            Registering on our website is quick and easy. Just go to the
            "SignUp" section and fill in the necessary information. After
            registration, you will have access to the website's functionality,
            which will help you effectively utilize our resources.
          </p>
        </div>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <ExitToAppIcon style={{ fontSize: 80 }} className='about_icons' />
          </span>
          <p>
            Log in to your account through the "Login" section and start using
            all the features of our website. Gain access to partner contacts,
            save favorite offers, and create your business cards to attract new
            clients.
          </p>
        </div>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <SentimentSatisfiedAltIcon
              style={{ fontSize: 80 }}
              className='about_icons'
            />
          </span>
          <p>
            Join our community right now and start using all the advantages of
            our resource to develop your business!
          </p>
        </div>
        <div className='box_about' style={style}>
          <span>
            {" "}
            <ErrorOutlineIcon
              style={{ fontSize: 80, color: "red" }}
              className='about_icons'
            />
          </span>
          <p>
            Please be aware that inappropriate or unpleasant posts, as well as
            complaints from other group members, may result in the admin
            excluding you from the group.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
