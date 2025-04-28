import React from "react";
import "./About.scss";
import Button from "../Button/Button";

const aboutMeData = {
  one: {
    name: "Andrew Woan",
    imageUrl: "/images/me.webp",
    externalLink: "https://www.youtube.com/@andrewwoan",
    content: [
      {
        header: "About Me",
        paragraphs: [
          "Hey there👋! Thanks for stopping by <3!!! My name is Andrew and I'm just a random guy who creates things.",
          "As much as I love technology, I also love nature. I love being in the woods for hours and sometimes I will spend the entire day on top of a mountain.",
          "When I'm not in nature or wandering around I'm probably just doing something in my room. My favorite hobbies are making funny things, hiking, gaming, piano, dancing, and photography.",
        ],
      },
      {
        header: "Fun Facts",
        paragraphs: [
          " - I am obsessed with cute things. In particular, I really love pandas because they are sooooo adorable and cute. I have a stuffed animal panda that I take with me to places I go as a companion 🐼❤️.",
          " - I love creating things, every single art is super fascinating to me, from music, ceramics, crochet, to painting etc. Not good at many, but still love all of them haha.",
          " - I love teaching. Teaching means others get to create more things and those things make more people happy and that makes me really happy.",
          " - I love wandering. I will often take random paths in the middle of cities or nature to see how far it takes me and where it takes me.",
        ],
      },
    ],
  },
};

const About = () => {
  const data = aboutMeData["one"];

  if (!data) {
    return <div>Data not found</div>;
  }

  return (
    <div className="data-container">
      <div className="image-wrapper">
        <img src={data.imageUrl} alt={data.name} className="data-image" />
      </div>

      <Button href={data.externalLink} type={"link"}>
        View my channel!
      </Button>

      {data.content.map((section, index) => (
        <div key={index} className="data-section">
          <h2 className="about-section-header">{section.header}</h2>
          {section.paragraphs.map((paragraph, pIndex) => (
            <p key={`${index}-${pIndex}`} className="section-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      <div className="image-wrapper-two">
        <img
          src="/images/inprogress.webp"
          alt={"Crochet Mr. Cloud in progress"}
          className="data-image-two"
        />
      </div>
      <p className="section-paragraph">
        - - Mr. Cloud in progress (looks like a fish haha 🐟) - -
      </p>

      <div className="image-wrapper-two">
        <img
          src="/images/crochet.webp"
          alt={"Crochet Mr. Cloud"}
          className="data-image-two"
        />
      </div>
      <p className="section-paragraph">- - Mr. Cloud - -</p>

      <div className="image-wrapper-3">
        <img
          src="/images/partner.webp"
          alt={"Partner in Crime"}
          className="data-image"
        />
      </div>
      <p className="section-paragraph">- - My partner in crime - -</p>
    </div>
  );
};

export default About;
