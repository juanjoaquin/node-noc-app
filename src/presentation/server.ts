import { CheckService } from "../domain/use-cases/checks/check-service";
import { ClonService } from "./cron/cron-service"

export class Server {

    static start() {
        console.log('Server started')

        ClonService.createJob(      

                '*/5 * * * * *', // cronTime
                 () => {
                    const url = 'https://google.com';

                    new CheckService(
                        
                        () => console.log(`${url} is online`),
                        (error) => console.log(error),

                    ).execute(url);
                    // new CheckService().execute('http://localhost:3000/');

                },
            );
    }
}

