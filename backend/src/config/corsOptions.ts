import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000", "http://localhost:4173", process.env.FRONTEND_URL!],
    credentials: true
}

export default cors(corsOptions);