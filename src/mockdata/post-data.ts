interface PostComment {
  username: string;
  replyTo: string;
  postDate: Date;
  id: number;
  content: string;
  replies: PostComment[];
}

interface Post {
  title: string;
  body: string;
  tags: string[];
  datePosted: Date;
  username: string;
  comments: PostComment[];
}

const postData: Post = {
<<<<<<< HEAD
  title: "Glasses",
  body: "Glasses are really versatile. First, you can have glasses-wearing girls take them off and suddenly become beautiful, or have girls wearing glasses flashing those cute grins, or have girls stealing the protagonist's glasses and putting them on like, \"Haha, got your glasses!\" That's just way too cute! Also, boys with glasses! I really like when their glasses have that suspicious looking gleam, and it's amazing how it can look really cool or just be a joke. I really like how it can fulfill all those abstract needs. Being able to switch up the styles and colors of glasses based on your mood is a lot of fun too! It's actually so much fun! You have those half rim glasses, or the thick frame glasses, everything! It's like you're enjoying all these kinds of glasses at a buffet. I really want Luna to try some on or Marine to try some on to replace her eyepatch. We really need glasses to become a thing in hololive and start selling them for HoloComi. Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Glasses?",
  tags: ["Manila", "Hololive", "Glasses", "Trains", "MRT"],
=======
  title: "Las Pinas - DLSU Manila",
  body: "Hello. Can you tell any possible way of commuting from Las Pinas to DLSU-Manila? Also may I know the details of commute such as: complete steps of commuting, price each transpo, and average total duration.",
  tags: ["Manila", "Hololive", "Glasses"],
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
  datePosted: new Date(),
  username: "Fubuki",
  comments: [
    {
      username: "JamesPH",
      replyTo: "Fubuki",
      id: 1,
<<<<<<< HEAD
      postDate: new Date(),
      content: "I like glasses too!",
=======
      content: "Hi, from any part of Las Pinas, go to Zapote side of Alabang-Zapote road. Then go the bus showing \"V. Cruz\" or \"Taft\" sign. There, those guarantee you to head straight to DLSU Manila. Duration and price varies from starting point. Hailing from barangay Pilar, price is p48 per student head and duration takes 1 hour if outside rush hours.",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
      replies: [
        {
          username: "Fubuki",
          replyTo: "JamesPH",
          id: 2,
<<<<<<< HEAD
          postDate: new Date(),
          content: "I'm glad you like them too!",
=======
          content: "Thanks. What's the price and duration if I start from Perpetual at Times?",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
          replies: []
        }
      ]
    },
    {
      username: "RailwayGuy",
      replyTo: "Fubuki",
      id: 3,
<<<<<<< HEAD
      postDate: new Date(),
      content: "I think glasses are cute!",
=======
      content: "You may use bus going to PITX then go to 3rd floor to use train going to Vito Cruz Station. Price from bus varies. PITX to V Cruz takes average ~15min duration and p22 if using beepcard",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
      replies: [
        {
          username: "Fubuki",
          replyTo: "RailwayGuy",
          id: 4,
<<<<<<< HEAD
          postDate: new Date(),
          content: "I'm glad you think so!",
=======
          content: "Which side of the train going northwards?",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
          replies: [
            {
              username: "RailwayGuy",
              replyTo: "Fubuki",
              id: 5,
<<<<<<< HEAD
              postDate: new Date(),
              content: "ha ha ha",
=======
              content: "Go to the other side from the entry point. Use the bridge that is going to the other side.",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
              replies: []
            }
          ]
        }
      ]
    },
    {
      username: "AngkasIsLife",
      replyTo: "Fubuki",
      id: 6,
<<<<<<< HEAD
      postDate: new Date(),
      content: "I think glasses are cool!",
=======
      content: "Same for the reverse process using bus showing any of these signs: SM Southmall, Pilar, Casimiro, Moonwalk, or Times",
>>>>>>> 35571c26e11eeb7f2d97b35ed941e1a07d7a1097
      replies: []
    },
    {
      username: "Fubuki",
      replyTo: "self",
      id: 7,
      content: "If from Pitx, which gate am I going to use to go home in Las Pinas",
      replies: [ 
        {
          username: "CavitexUser",
          replyTo: "Fubuki",
          id: 8,
          content: "gate 8",
          replies: []
        }
      ]
    }
  ]
}

export default postData;
export type { PostComment };