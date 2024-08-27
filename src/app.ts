import { envs } from "./config/plugins/envs.plugins";
import { LogModel } from "./data/mongo";
import { MongoDataBase } from "./data/mongo/init";
import { Server } from "./presentation/server";
import 'dotenv/config';


(async() => {
    main()
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const newLog = await LogModel.create({
        message: 'Test message App',
        origin: 'App.ts',
        level: 'low'
    })

    await newLog.save();

    // console.log(newLog)

    Server.start();
    // console.log(envs);
}

