
const regularDetails = (subject) => {
  if (subject){
    return {
      description: `You get a normal ${subject} teacher with about 1-3 years experience, coupled with a good trackrecord from teaching other students.`,
      portfolio: [
          "Experience: 1-3 years",
          "Proficiency: Non-Expert Level",
      ],
    }
  }
  return  {
   description: `You get undergraduates or graduates with excellent trackrecord or brilliant teachers 
            from a normal school. `,
    portfolio: [
        "Experience: 1-3 years teaching",
        "Curriculum: Nigerian mostly",
        "Nursery/Primary: Non-Montessori",
        "Local: Entrance, JSCE, WAEC, NECO & UTME",
        "Foreign: Not Applicable"
    ],
      
  } 
}

const expertDetails = (subject)=>{
  if(subject){ 
    return {
        description: `You get an expert teacher from a notable institution, school or organisation with relevant training, about 2-6 years experience and an extensive knowledge of ${subject} tutoring.`,
        portfolio: [
            "Experience: 2-6 years",
            "Proficiency: Expert Level",
        ],
    }
  }return {
      description: `You get expert teachers or graduates from 
          notable schools in Lagos with relevant training & experience. `,
      portfolio: [
          "Experience: 2-6 years teaching",
          "Curriculum: Nigerian, British or American",
          "Nursery/Primary: Montessori or KeyStages",
          "Local: Entrance, JSCE, WAEC, NECO & UTME",
          "Foreign: IGCSE, Checkpoints, BECE, IB, SAT, IELTS",
      ],
    }
}

const eliteDetails = (subject) => {
  if(subject){
    return {
      description: `You get a top, specialist teacher with about 3-15 years experience from a notable institution, who has a proven trackrecord
                  and an advanced knowledge of ${subject} tutoring.`,
      portfolio: [
          "Experience: 2-6 years",
          "Proficiency: Expert/Advanced Level",
      ],
    }
  }
  return {
    description: `You get well-trained and seasoned teachers 
        from the topmost schools in Lagos with proven trackrecord.`,
    portfolio: [
        "Experience: 3-15 years teaching",
        "Curriculum: Nigerian, British or American",
        "Nursery/Primary: Montessori or KeyStages",
        "Local: Entrance, JSCE, WAEC, NECO & UTME",
        "Foreign: IGCSE, Checkpoints, BECE, IB, SAT, IELTS",
    ],    
  }
}

export const getFullDetails = (type, subject) => {
    switch(type){
        case "Expert":
            return expertDetails(subject);
        case "Elite":
            return eliteDetails(subject);
        default:
            return regularDetails(subject);
    }
}
export const getCssStyle = (type) => {
    switch(type){
        case "Expert":
            return "two";
        case "Elite":
            return "four";
        default:
            return "one";
    }
}
export const noOfWeeksDisplay = (no) => {
    if(no < 4){
        return `for ${no} week${no === 1 ? '': "s"}`; 
    }
    return "/month"
}