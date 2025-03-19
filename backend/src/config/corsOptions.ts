import cors from "cors";

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:4173"]
}

export default cors(corsOptions);