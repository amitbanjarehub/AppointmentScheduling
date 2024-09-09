import React, { useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Box,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

const questions = [
  {
    id: 1,
    question:
      "Which article is used before a singular noun starting with a consonant sound?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "A",
  },
  {
    id: 2,
    question:
      "Which article is used before a word that starts with a vowel sound?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "B",
  },
  {
    id: 3,
    question: "Which article is used before unique nouns like 'sun' or 'moon'?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "C",
  },
  {
    id: 4,
    question:
      "Which article would you use in this sentence: 'She bought ___ umbrella.'?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "B",
  },
  {
    id: 5,
    question:
      "Which article is appropriate in this sentence: '___ apple a day keeps the doctor away.'?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "B",
  },
  {
    id: 6,
    question:
      "Choose the correct article for the sentence: 'He is ___ honest man.'",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "B",
  },
  {
    id: 7,
    question: "In which sentence is 'the' used correctly?",
    options: {
      A: "'The' books are on the table.",
      B: "'The' cat is sitting in the garden.",
      C: "'The' sun rises in east.",
      D: "'The' children went to the park.",
    },
    correctAnswer: "B",
  },
  {
    id: 8,
    question:
      "Which article is needed in this sentence: 'I need ___ new computer.'?",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "A",
  },
  {
    id: 9,
    question:
      "Choose the correct article: 'He is ___ best player on the team.'",
    options: {
      A: "A",
      B: "An",
      C: "The",
      D: "None",
    },
    correctAnswer: "C",
  },
  {
    id: 10,
    question: "In which sentence is the article usage incorrect?",
    options: {
      A: "I saw a bird in the sky.",
      B: "He is an university professor.",
      C: "She has a car.",
      D: "The earth revolves around the sun.",
    },
    correctAnswer: "B",
  },

  {
    id: 11,
    question: "Which word in the sentence is a noun? 'The dog barked loudly.'",
    options: {
      A: "dog",
      B: "barked",
      C: "loudly",
      D: "The",
    },
    correctAnswer: "A",
  },
  {
    id: 12,
    question: "Identify the noun in the following sentence: 'She went to the market to buy some fruits.'",
    options: {
      A: "went",
      B: "market",
      C: "buy",
      D: "some",
    },
    correctAnswer: "B",
  },
  {
    id: 13,
    question: "Which type of noun is 'New York' in the sentence: 'I visited New York last summer.'?",
    options: {
      A: "Common Noun",
      B: "Proper Noun",
      C: "Abstract Noun",
      D: "Collective Noun",
    },
    correctAnswer: "B",
  },
  {
    id: 14,
    question: "What type of noun is 'happiness' in the sentence: 'Happiness is the key to success.'?",
    options: {
      A: "Abstract Noun",
      B: "Concrete Noun",
      C: "Collective Noun",
      D: "Proper Noun",
    },
    correctAnswer: "A",
  },
  {
    id: 15,
    question: "In the sentence 'The team won the match', the underlined word 'team' is which type of noun?",
    options: {
      A: "Common Noun",
      B: "Proper Noun",
      C: "Collective Noun",
      D: "Abstract Noun",
    },
    correctAnswer: "C",
  },
  {
    id: 16,
    question: "Identify the noun from this sentence: 'The children are playing in the garden.'",
    options: {
      A: "playing",
      B: "children",
      C: "in",
      D: "are",
    },
    correctAnswer: "B",
  },
  {
    id: 17,
    question: "Which type of noun is the underlined word 'kindness' in the sentence: 'Kindness is a virtue.'?",
    options: {
      A: "Abstract Noun",
      B: "Proper Noun",
      C: "Common Noun",
      D: "Concrete Noun",
    },
    correctAnswer: "A",
  },
  {
    id: 18,
    question: "In the sentence 'My father gave me a new book', which word is a common noun?",
    options: {
      A: "father",
      B: "me",
      C: "book",
      D: "new",
    },
    correctAnswer: "C",
  },
  {
    id: 19,
    question: "Which type of noun is the underlined word 'crowd' in the sentence: 'A large crowd gathered at the stadium.'?",
    options: {
      A: "Abstract Noun",
      B: "Collective Noun",
      C: "Proper Noun",
      D: "Common Noun",
    },
    correctAnswer: "B",
  },
  {
    id: 20,
    question: "What type of noun is 'school' in the sentence: 'The school has a large playground.'?",
    options: {
      A: "Common Noun",
      B: "Proper Noun",
      C: "Abstract Noun",
      D: "Collective Noun",
    },
    correctAnswer: "A",
  },
  {
    id: 21,
    question: "Which word is a pronoun in the sentence: 'He is my best friend.'?",
    options: {
      A: "He",
      B: "friend",
      C: "best",
      D: "my",
    },
    correctAnswer: "A",
  },
  {
    id: 22,
    question: "Which pronoun correctly completes the sentence: '___ are going to the park.'?",
    options: {
      A: "He",
      B: "They",
      C: "She",
      D: "It",
    },
    correctAnswer: "B",
  },
  {
    id: 23,
    question: "Identify the pronoun in the sentence: 'She gave me the book.'",
    options: {
      A: "book",
      B: "gave",
      C: "She",
      D: "the",
    },
    correctAnswer: "C",
  },
  {
    id: 24,
    question: "What type of pronoun is 'him' in the sentence: 'I gave him a pen.'?",
    options: {
      A: "Subject Pronoun",
      B: "Object Pronoun",
      C: "Possessive Pronoun",
      D: "Reflexive Pronoun",
    },
    correctAnswer: "B",
  },
  {
    id: 25,
    question: "Which pronoun will replace the noun 'Riya' in the sentence: 'Riya is my sister. ___ loves to dance.'?",
    options: {
      A: "She",
      B: "He",
      C: "They",
      D: "It",
    },
    correctAnswer: "A",
  },
  {
    id: 26,
    question: "What is the correct pronoun for the sentence: 'This book is ___. (belonging to me)'?",
    options: {
      A: "his",
      B: "ours",
      C: "mine",
      D: "yours",
    },
    correctAnswer: "C",
  },
  {
    id: 27,
    question: "In the sentence 'We gave them our toys', what type of pronoun is 'them'?",
    options: {
      A: "Subject Pronoun",
      B: "Object Pronoun",
      C: "Possessive Pronoun",
      D: "Reflexive Pronoun",
    },
    correctAnswer: "B",
  },
  {
    id: 28,
    question: "Which word is a possessive pronoun in the sentence: 'This book is hers.'?",
    options: {
      A: "hers",
      B: "book",
      C: "is",
      D: "This",
    },
    correctAnswer: "A",
  },
  {
    id: 29,
    question: "Which pronoun correctly completes the sentence: 'The dog hurt ___.'?",
    options: {
      A: "him",
      B: "itself",
      C: "them",
      D: "herself",
    },
    correctAnswer: "B",
  },
  {
    id: 30,
    question: "What is the correct pronoun to use in the sentence: 'The teacher told ___ to study hard.'?",
    options: {
      A: "us",
      B: "we",
      C: "I",
      D: "he",
    },
    correctAnswer: "A",
  },
  {
    id: 31,
    question: "Which word is an adjective in the sentence: 'The tall boy won the race.'?",
    options: {
      A: "tall",
      B: "boy",
      C: "won",
      D: "race",
    },
    correctAnswer: "A",
  },
  {
    id: 32,
    question: "Which adjective correctly completes the sentence: 'The flowers are very ___.'?",
    options: {
      A: "beautiful",
      B: "beauty",
      C: "beautifully",
      D: "beauties",
    },
    correctAnswer: "A",
  },
  {
    id: 33,
    question: "Identify the adjective in the sentence: 'She wore a red dress.'",
    options: {
      A: "She",
      B: "wore",
      C: "red",
      D: "dress",
    },
    correctAnswer: "C",
  },
  {
    id: 34,
    question: "What type of adjective is 'five' in the sentence: 'I have five apples.'?",
    options: {
      A: "Descriptive Adjective",
      B: "Quantitative Adjective",
      C: "Demonstrative Adjective",
      D: "Interrogative Adjective",
    },
    correctAnswer: "B",
  },
  {
    id: 35,
    question: "Which adjective will replace the blank in the sentence: 'This is a ___ cake.'?",
    options: {
      A: "sweet",
      B: "quickly",
      C: "slow",
      D: "sweetly",
    },
    correctAnswer: "A",
  },
  {
    id: 36,
    question: "In the sentence 'The old man walks slowly', which word is the adjective?",
    options: {
      A: "old",
      B: "man",
      C: "walks",
      D: "slowly",
    },
    correctAnswer: "A",
  },
  {
    id: 37,
    question: "Choose the correct adjective: 'The ___ building is very tall.'",
    options: {
      A: "huge",
      B: "quickly",
      C: "soft",
      D: "gently",
    },
    correctAnswer: "A",
  },
  {
    id: 38,
    question: "Which type of adjective is 'this' in the sentence: 'This book is mine.'?",
    options: {
      A: "Descriptive Adjective",
      B: "Quantitative Adjective",
      C: "Demonstrative Adjective",
      D: "Possessive Adjective",
    },
    correctAnswer: "C",
  },
  {
    id: 39,
    question: "Identify the adjective in the sentence: 'The large elephant walked slowly.'",
    options: {
      A: "large",
      B: "elephant",
      C: "walked",
      D: "slowly",
    },
    correctAnswer: "A",
  },
  {
    id: 40,
    question: "Which type of adjective is 'his' in the sentence: 'That is his car.'?",
    options: {
      A: "Descriptive Adjective",
      B: "Possessive Adjective",
      C: "Quantitative Adjective",
      D: "Demonstrative Adjective",
    },
    correctAnswer: "B",
  },
  {
    id: 51,
    question: "Choose the correct comparative form: 'She is ___ than her friend.'",
    options: {
      A: "smart",
      B: "smarter",
      C: "smartest",
      D: "most smart",
    },
    correctAnswer: "B",
  },
  {
    id: 52,
    question: "Choose the correct superlative form: 'This is the ___ movie I have ever seen.'",
    options: {
      A: "interesting",
      B: "more interesting",
      C: "most interesting",
      D: "interestingly",
    },
    correctAnswer: "C",
  },
  {
    id: 53,
    question: "Choose the correct positive form: 'She is as ___ as her sister.'",
    options: {
      A: "pretty",
      B: "prettier",
      C: "prettiest",
      D: "more pretty",
    },
    correctAnswer: "A",
  },
  {
    id: 54,
    question: "Choose the correct comparative form: 'This cake is ___ than the one I made last week.'",
    options: {
      A: "good",
      B: "better",
      C: "best",
      D: "more good",
    },
    correctAnswer: "B",
  },
  {
    id: 55,
    question: "Choose the correct superlative form: 'Mount Everest is the ___ mountain in the world.'",
    options: {
      A: "high",
      B: "higher",
      C: "highest",
      D: "more high",
    },
    correctAnswer: "C",
  },
  {
    id: 56,
    question: "Choose the correct comparative form: 'This road is ___ than the one we took yesterday.'",
    options: {
      A: "narrow",
      B: "narrower",
      C: "narrowest",
      D: "more narrow",
    },
    correctAnswer: "B",
  },
  {
    id: 57,
    question: "Choose the correct superlative form: 'She is the ___ student in the class.'",
    options: {
      A: "intelligent",
      B: "more intelligent",
      C: "most intelligent",
      D: "intelligenter",
    },
    correctAnswer: "C",
  },
  {
    id: 58,
    question: "Choose the correct positive form: 'The weather today is as ___ as it was yesterday.'",
    options: {
      A: "hot",
      B: "hotter",
      C: "hottest",
      D: "more hot",
    },
    correctAnswer: "A",
  },
  {
    id: 59,
    question: "Choose the correct comparative form: 'My house is ___ than yours.'",
    options: {
      A: "big",
      B: "bigger",
      C: "biggest",
      D: "most big",
    },
    correctAnswer: "B",
  },
  {
    id: 60,
    question: "Choose the correct superlative form: 'This is the ___ place I've ever visited.'",
    options: {
      A: "beautiful",
      B: "more beautiful",
      C: "most beautiful",
      D: "beautifuller",
    },
    correctAnswer: "C",
  }
  // Add more questions here (total 10 questions)
];

const MCQExam = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({
    attended: 0,
    skipped: 0,
    incorrect: 0,
    marks: 0,
    percentage: 0,
  });

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let attended = 0;
    let incorrect = 0;
    let marks = 0;

    answers.forEach((answer, index) => {
      if (answer) {
        attended++;
        if (answer === questions[index].correctAnswer) {
          marks++;
        } else {
          incorrect++;
        }
      }
    });

    const skipped = questions.length - attended;
    const percentage = (marks / questions.length) * 100;

    setResult({ attended, skipped, incorrect, marks, percentage });
    setSubmitted(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {" "}
      {/* Padding adjusted for mobile */}
      {!submitted ? (
        <>
          {questions.map((q, index) => (
            <Stack
              key={q.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                marginBottom: "20px",
                p: { xs: 2, md: 3 }, // Adjust padding for smaller screens
              }}
            >
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">
                  {index + 1}. {q.question}
                </FormLabel>
                <RadioGroup
                  name={`question-${q.id}`}
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                >
                  <Grid container spacing={2}>
                    {Object.entries(q.options).map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        {" "}
                        {/* Full width on mobile, half width on larger screens */}
                        <FormControlLabel
                          value={key}
                          control={<Radio />}
                          label={`${key}) ${value}`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Stack>
          ))}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: { xs: "100%", md: "auto" }, // Full width button on mobile
              mt: { xs: 2, md: 0 },
            }}
          >
            Submit
          </Button>
        </>
      ) : (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h6">Result Summary</Typography>
          <Typography>Questions Attended: {result.attended}</Typography>
          <Typography>Questions Skipped: {result.skipped}</Typography>
          <Typography>Incorrect Answers: {result.incorrect}</Typography>
          <Typography>
            Marks Obtained: {result.marks} / {questions.length}
          </Typography>
          <Typography>Percentage: {result.percentage}%</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MCQExam;
