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
            <a href="https://www.linkedin.com/in/rinad-abu-qauod/"><BsLinkedin className='linkedin'/></a>
            <a href="https://github.com/rinadaq"><BsGithub /></a>
        </div>
        <div class="team">
            <h4>Hassan Abu Gareeb</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="https://www.linkedin.com/in/hassan-abu-gareeb-a13b1126a/"><BsLinkedin className='linkedin'/></a>
            <a href="https://github.com/Hassan-AbuGareeb"><BsGithub /></a>

        </div>
        <div class="team">
            <h4>Ahmad Almashagbah</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="https://www.linkedin.com/in/ahmad-almashagbah-4293b3166?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><BsLinkedin className='linkedin'/></a>
            <a href="https://github.com/Shwarzar"><BsGithub /></a>

        </div>
        <div class="team">
            <h4>Lujain Mansour</h4>
            <h5>Fullstack Web Developer</h5>
            <a href="https://jo.linkedin.com/in/lujain-mansour-b17390219   "><BsLinkedin className='linkedin'/></a>
            <a href="https://github.com/luj00 "><BsGithub /></a>
        </div>
  </div>
</div>
<Footer/>
</div>
    
  )
}

export default AboutUs