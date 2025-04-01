import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000", "http://localhost:4173"],
    credentials: true
}

export default cors(corsOptions);