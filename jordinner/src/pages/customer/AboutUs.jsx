import React from 'react'
import CustomerNav from './customerNav'
import Image from 'next/image'
import Footer from './Footer'
import Link from 'next/link'
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

function AboutUs() {
  return (
    <div>
        <CustomerNav/>
        <div class="about-section">
        <h1>Meet Our Team</h1>
        <br></br>
        <p>We are a team of aspiring full-stack web developers, passionate about creating innovative solutions to make your culinary experience delightful.</p>
        
        

    <div class="teamCards">
      {/* <Image src="" alt="Rinad"></Image> */}
        <div class="team">
            <h4>Rinad Abu Qauod</h4>
            <h5>Fullstack Web Developer</h5>
            {/* <p>ABA therapist, biomedical scientist,<br></br>
            artist & a design enthusiast</p> */}
            <a href="https://www.linkedin.com/in/rinad-abu-qauod/"><BsLinkedin className='linkedin'/></a>
            <a href="github"><BsGithub /></a>
        </div>
        <div class="team">
            <h4>Hassan Abu Gareeb</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="linkedin"><BsLinkedin className='linkedin'/></a>
            <a href="github"><BsGithub /></a>

        </div>
        <div class="team">
            <h4>Ahmad Mash</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="linkedin"><BsLinkedin className='linkedin'/></a>
            <a href="github"><BsGithub /></a>

        </div>
        <div class="team">
            <h4>Lujain Mansour</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="linkedin"><BsLinkedin className='linkedin'/></a>
            <a href="github"><BsGithub /></a>
        </div>
  </div>
</div>
<Footer/>
</div>
    
  )
}

export default AboutUs