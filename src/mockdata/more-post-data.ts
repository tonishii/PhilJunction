import { Post, PostComment } from "./post-data"

const post1: Post = {
    title: "How to get to Sm North Edsa From SM South?",
    body: "Just the title",
    images: [],
    postDate: new Date("February 14, 2021"),
    tags: ["Manila", "Jeep", "Tag"],
    username: "klassmagicker",
    comments: []
}

const post2: Post = {
    title: "Commute Summit!",
    body: "hi guys! We at the Commuting Underclassmen Movement are so excited to share with you our first every Commute Summit! It's so strange...",
    images: [],
    postDate: new Date("January 7, 2023"),
    tags: ["National", "Event", "Summit", "Cummuting Underclassmen Movement"],
    username: "klassmagicker",
    comments: []
}

const post3: Post = {
    title: "pano punta quiapo galing pasig",
    body: "morgnig mga mamser, pano po kaya",
    images: [],
    postDate: new Date("January 5, 2024"),
    tags: ["Manila", "Jeep"],
    username: "klassmagicker",
    comments: []
}

export { post1, post2, post3 }