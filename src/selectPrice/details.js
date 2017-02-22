
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
   description: `Includes top graduates/students with good track record or exceptional teachers from regular schools. `,
    portfolio: [
        "Experienced Teachers (1 - 5 years)",
        "Curriculum: Nigerian Only",
        "Nur/Pry: Non-Montessori",
        "Exams: Local (Entrance, JSCE, WAEC, UME etc.)",
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
      description: `Includes top graduates or expert teachers from notable schools in Lagos with relevant training & experience.`,
      portfolio: [
          "Experienced Teachers (2 - 6 years)",
          "Curriculum: Nigerian, British or American",
          "Nur/Pry: Montessori or KeyStages",
          "Exams: Local & Foreign (IGCSE, Checkpoints etc.)",
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
    description: `Includes highly experienced and very seasoned teachers from the topmost schools in Lagos.`,
    portfolio: [
        "Experienced Teachers (3 - 15 years)",
        "Curriculum: Nigerian, British or American",
        "Nur/Pry: Montessori or KeyStages",
        "Exams: Local & Foreign (IGCSE, Checkpoints etc.)",
    ],    
  }
}

export const getFullDetails = (type, subject) => {
    switch(type){
        case "Plan 2":
            return expertDetails(subject);
        case "Plan 3":
            return eliteDetails(subject);
        default:
            return regularDetails(subject);
    }
}
export const getCssStyle = (type) => {
    switch(type){
        case "Plan 2":
            return "two";
        case "Plan 3":
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