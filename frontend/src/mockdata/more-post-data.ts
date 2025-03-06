import { Post } from "./post-data"

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

const post4: Post = {
    title: "Best Route from Cubao to NAIA Terminal 3?",
    body: "Hi everyone! I have an early morning flight from NAIA T3. What’s the best and safest way to get there from Cubao?",
    images: [],
    postDate: new Date("March 12, 2024"),
    tags: ["Airport", "Bus", "Cubao", "NAIA", "Commute"],
    username: "travelerPH",
    comments: [
        {
            id: 1,
            username: "dailycommuter",
            replyTo: "",
            postDate: new Date("March 12, 2024, 9:00 AM"),
            content: "If you don’t have heavy luggage, you can take the EDSA Carousel bus from Cubao to MOA, then ride a P2P bus to NAIA T3.",
            replies: [
                {
                    id: 2,
                    username: "travelerPH",
                    replyTo: "dailycommuter",
                    postDate: new Date("March 12, 2024, 9:10 AM"),
                    content: "That sounds good! How much is the fare?",
                    replies: [
                        {
                            id: 3,
                            username: "dailycommuter",
                            replyTo: "travelerPH",
                            postDate: new Date("March 12, 2024, 9:15 AM"),
                            content: "EDSA Carousel: ₱50, P2P bus: ₱100. Travel time is around 1 hour if no heavy traffic.",
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            username: "midnightflyer",
            replyTo: "",
            postDate: new Date("March 12, 2024, 9:20 AM"),
            content: "If your flight is late at night, taking a Grab might be your best option. Buses are less frequent after 10 PM.",
            replies: []
        }
    ]
};

const post5: Post = {
    title: "Is There a Direct Bus from Laguna to Makati?",
    body: "I just moved to Laguna and need to commute to Makati daily. Is there a direct bus, or do I need multiple rides?",
    images: [],
    postDate: new Date("March 8, 2024"),
    tags: ["Laguna", "Makati", "Bus", "Commute"],
    username: "lagunaworker",
    comments: [
        {
            id: 5,
            username: "workaholic_commuter",
            replyTo: "",
            postDate: new Date("March 8, 2024, 6:45 AM"),
            content: "There’s a P2P bus from Sta. Rosa to Greenbelt. It’s fast but schedules are limited. Best to check online.",
            replies: [
                {
                    id: 6,
                    username: "lagunaworker",
                    replyTo: "workaholic_commuter",
                    postDate: new Date("March 8, 2024, 6:50 AM"),
                    content: "Thanks! What time do the buses start operating?",
                    replies: [
                        {
                            id: 7,
                            username: "workaholic_commuter",
                            replyTo: "lagunaworker",
                            postDate: new Date("March 8, 2024, 6:55 AM"),
                            content: "First trip is at 5:30 AM, last trip is around 9 PM.",
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 8,
            username: "alt_commuter",
            replyTo: "",
            postDate: new Date("March 8, 2024, 7:10 AM"),
            content: "If you miss the P2P, you can take a bus from Calamba to Buendia, then ride a jeep or bus to Makati.",
            replies: []
        }
    ]
};

const post6: Post = {
    title: "Fastest Commute from QC to Alabang?",
    body: "I need to go to Alabang from Quezon City frequently. What’s the fastest route via public transport?",
    images: [],
    postDate: new Date("March 5, 2024"),
    tags: ["Quezon City", "Alabang", "Bus", "MRT"],
    username: "dailycommuterQC",
    comments: [
        {
            id: 9,
            username: "southbound_rider",
            replyTo: "",
            postDate: new Date("March 5, 2024, 8:20 AM"),
            content: "Take MRT from North Ave to Magallanes, then ride a bus to Alabang. This is the fastest if MRT isn't crowded.",
            replies: [
                {
                    id: 10,
                    username: "dailycommuterQC",
                    replyTo: "southbound_rider",
                    postDate: new Date("March 5, 2024, 8:25 AM"),
                    content: "That sounds good! How much time should I allot during rush hour?",
                    replies: [
                        {
                            id: 11,
                            username: "southbound_rider",
                            replyTo: "dailycommuterQC",
                            postDate: new Date("March 5, 2024, 8:30 AM"),
                            content: "Rush hour can add 30–45 minutes to your trip. Try leaving before 6 AM for a smoother ride.",
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 12,
            username: "jeepneylover",
            replyTo: "",
            postDate: new Date("March 5, 2024, 8:40 AM"),
            content: "If you prefer jeepneys, take one from QC to Pasay, then another from Pasay to Alabang. It's cheaper but takes longer.",
            replies: []
        }
    ]
};

export { post1, post2, post3, post4, post5, post6 }