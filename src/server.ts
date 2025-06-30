import app from "./app";
import connect_db from "./config/DB";
import logger from "./config/logger";
import config from "config";

const startServer = async () => {
    const PORT: number = config.get("server.port");
    try {
        await connect_db();
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
        logger.info("Connected to database");
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
