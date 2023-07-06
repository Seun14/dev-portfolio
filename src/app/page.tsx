"use client";
import React, { useCallback, ReactNode, FC, HTMLAttributes, Children, ReactElement } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles"
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Link as ScrollLink, animateScroll as Scroll} from 'react-scroll'
import { particles as particlesConfig } from "./../../public/particles";
import type { Container, Engine } from "tsparticles-engine";

import styles from './page.module.css';
import { JsxElement } from "typescript";
import App from "next/app";

//Hold all our sections
type PageProps = {
  objs: PageObject[];
}
const Page = ({objs}: PageProps) => {
  return (
    <div className={styles.mainContainer}>
      { objs &&
        objs.map((obj: PageObject) => {
          return (
            <div key={obj.id} id={obj.id}>
              <h1>{obj.header}</h1>
                <div>
                  {obj.component}
                </div>
            </div>
          )
        })
      }
    </div>
    );
}

//Pass in a profile picture and description
type AboutMeProps = {

}
const AboutMe = (props: AboutMeProps) => {  
  return (
    <div>
    </div>
  );
}

//Pass in project name, project description, and snapsyot
type ProjectsProps = {
}
const Projects = (props: ProjectsProps) => {
  return (
    <div>
      Projects
    </div>
  );
}

//Pass in skill, rating out of five, icon?
type SkillsProps = {
}
const Skills = (props: SkillsProps) => {
  return (
    <div>
      Skills
    </div>
  );
}

//Pass in job, description, and snapshot? (Maybe for background?)
type ExperienceProps = {

}
const Experience = (props: ExperienceProps) => {  
  return (
    <div>
      Experience
    </div>
  );
}

//Pass in school, description, image?
type EducationProps = {

}
const Education = (props: EducationProps) => {  
  return (
    <div>
      Education
    </div>
  );
}

//Pass in hobby, icon, description?
type HobbiesProps = {

}
const Hobbies = (props: HobbiesProps) => {  
  return (
    <div>
      Hobbies
    </div>
  );
}

//No props needed...
type ContactMeProps = {}

const ContactMe = (props: ContactMeProps) => {  
  return (
    <div>
      Contact Form
    </div>
  );
}
type PageObject = {
  id: string;
  header: string;
  component: ReactElement
}
const pageObjects: PageObject[] = [
  {id: "projects", header: "Projects", component: <Projects/>},
  {id: "skills", header: "Skills", component: <Skills/>},
  {id: "experience", header: "Experience", component: <Experience/>},
  {id: "education", header: "Education", component: <Education/>},
  {id: "hobbies", header: "Hobbies", component: <Hobbies/>},
  {id: "contact", header: "Contact", component: <ContactMe/>},
  {id: "aboutMe", header: "About Me", component: <AboutMe/>},

]

export default function Home() {
    const particlesInit = useCallback(async(main: Engine )=> {
      await loadFull(main);
    }, []);
    const particlesLoaded = useCallback( async (container: Container | undefined) => {
      await console.log(container);
    }, [])
  const scrollToSection = (sectionId: string) => {
      console.log("Should scroll to: 1 ", sectionId);
    if(document.getElementById(sectionId)) {
      console.log("Should scroll to: 2", sectionId);
      Scroll.scrollTo(document.getElementById(sectionId)!.offsetTop);  
    }
  }
  return (
    <div>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig}/>
      <div style={{display: 'flex', justifyContent: 'center'}}>
            <AppBar color="transparent" position="fixed" elevation={0}>
              <Toolbar style={{display: 'flex', justifyContent: 'space-evenly'}} disableGutters={false}>
                  <ScrollLink className={styles.scrollLink} activeClass="active" to="aboutMe" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("aboutMe")}>About me</ScrollLink>
                  <ScrollLink activeClass="active" to="projects" spy={false} smooth={false} duration={500} offset={0} onClick={() => scrollToSection("projects")}>Projects</ScrollLink>
                  <ScrollLink activeClass="active" to="skills" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("skills")}>Skills</ScrollLink>
                  <ScrollLink activeClass="active" to="experience" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("experience")}>Experience</ScrollLink>
                  <ScrollLink activeClass="active" to="education" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("education")}>Education</ScrollLink>
                  <ScrollLink activeClass="active" to="hobbies" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("hobbies")}>Hobbies</ScrollLink>
                  <ScrollLink activeClass="active" to="contact" spy={false} smooth={false} duration={500} onClick={() => scrollToSection("contact")}>Contact me</ScrollLink>
              </Toolbar>
            </AppBar>
          <div style={{alignSelf: 'center'}}>
              <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height:"500vh"}}>
                <Page objs={pageObjects}/>
              </div>
          </div>
      </div>

    </div>
  );
}
