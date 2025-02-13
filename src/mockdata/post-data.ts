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
  title: "Las Pinas - DLSU Manila",
  body: "Hello. Can you tell any possible way of commuting from Las Pinas to DLSU-Manila? Also may I know the details of commute such as: complete steps of commuting, price each transpo, and average total duration.",
  tags: ["Manila", "Hololive", "Glasses"],
  datePosted: new Date(),
  username: "Fubuki",
  comments: [
    {
      username: "JamesPH",
      replyTo: "Fubuki",
      id: 1,
      postDate: new Date(),
      content: "Hi, from any part of Las Pinas, go to Zapote side of Alabang-Zapote road. Then go the bus showing \"V. Cruz\" or \"Taft\" sign. There, those guarantee you to head straight to DLSU Manila. Duration and price varies from starting point. Hailing from barangay Pilar, price is p48 per student head and duration takes 1 hour if outside rush hours.",
      replies: [
        {
          username: "Fubuki",
          replyTo: "JamesPH",
          id: 2,
          postDate: new Date(),
          content: "Thanks. What's the price and duration if I start from Perpetual at Times?",
          replies: []
        }
      ]
    },
    {
      username: "RailwayGuy",
      replyTo: "Fubuki",
      id: 3,
      postDate: new Date(),
      content: "You may use bus going to PITX then go to 3rd floor to use train going to Vito Cruz Station. Price from bus varies. PITX to V Cruz takes average ~15min duration and p22 if using beepcard",
      replies: [
        {
          username: "Fubuki",
          replyTo: "RailwayGuy",
          id: 4,
          postDate: new Date(),
          content: "Which side of the train going northwards?",
          replies: [
            {
              username: "RailwayGuy",
              replyTo: "Fubuki",
              id: 5,
              postDate: new Date(),
              content: "Go to the other side from the entry point. Use the bridge that is going to the other side.",
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
      postDate: new Date(),
      content: "Same for the reverse process using bus showing any of these signs: SM Southmall, Pilar, Casimiro, Moonwalk, or Times",
      replies: []
    },
    {
      username: "Fubuki",
      replyTo: "self",
      id: 7,
      postDate: new Date(),
      content: "If from Pitx, which gate am I going to use to go home in Las Pinas",
      replies: [ 
        {
          username: "CavitexUser",
          replyTo: "Fubuki",
          id: 8,
          postDate: new Date(),
          content: "gate 8",
          replies: []
        },
        {
          username: "CavitexUser",
          replyTo: "Fubuki",
          id: 8,
          postDate: new Date(),
          content: "gate 8",
          replies: []
        }
      ]
    }
  ]
}

export default postData;
export type { PostComment };