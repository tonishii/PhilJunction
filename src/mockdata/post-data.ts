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
  title: "Glasses",
  body: "Glasses are really versatile. First, you can have glasses-wearing girls take them off and suddenly become beautiful, or have girls wearing glasses flashing those cute grins, or have girls stealing the protagonist's glasses and putting them on like, \"Haha, got your glasses!\" That's just way too cute! Also, boys with glasses! I really like when their glasses have that suspicious looking gleam, and it's amazing how it can look really cool or just be a joke. I really like how it can fulfill all those abstract needs. Being able to switch up the styles and colors of glasses based on your mood is a lot of fun too! It's actually so much fun! You have those half rim glasses, or the thick frame glasses, everything! It's like you're enjoying all these kinds of glasses at a buffet. I really want Luna to try some on or Marine to try some on to replace her eyepatch. We really need glasses to become a thing in hololive and start selling them for HoloComi. Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Glasses?",
  tags: ["Manila", "Hololive", "Glasses", "Trains", "MRT"],
  datePosted: new Date(),
  username: "Fubuki",
  comments: [
    {
      username: "Mio",
      replyTo: "Fubuki",
      id: 1,
      postDate: new Date(),
      content: "I like glasses too!",
      replies: [
        {
          username: "Fubuki",
          replyTo: "Mio",
          id: 2,
          postDate: new Date(),
          content: "I'm glad you like them too!",
          replies: []
        }
      ]
    },
    {
      username: "Marine",
      replyTo: "Fubuki",
      id: 3,
      postDate: new Date(),
      content: "I think glasses are cute!",
      replies: [
        {
          username: "Fubuki",
          replyTo: "Marine",
          id: 4,
          postDate: new Date(),
          content: "I'm glad you think so!",
          replies: [
            {
              username: "Marine",
              replyTo: "Fubuki",
              id: 5,
              postDate: new Date(),
              content: "ha ha ha",
              replies: []
            }
          ]
        }
      ]
    },
    {
      username: "Aqua",
      replyTo: "Fubuki",
      id: 6,
      postDate: new Date(),
      content: "I think glasses are cool!",
      replies: []
    }
  ]
}

export default postData;
export type { PostComment };