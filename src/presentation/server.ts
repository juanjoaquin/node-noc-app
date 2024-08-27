import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { ClonService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
)

//Mandar email
const emailService = new EmailService();

export class Server {

    static start() {
        console.log('Server started')

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['demworksjoaquim@gmail.com'])


        // emailService.SendEmailWithFileSystemLogs(['demworksjoaquim@gmail.com'])


        // emailService.sendEmail({
        //     to: 'demworksjoaquim@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `<h3> Logs de sistema NOC </h3>
        //     <p>Lorem vit lorem vit lorem vit lorem vit </p>
        //     <p>Ver los adjuntos</p>`
        // })

        ClonService.createJob(      

                '*/5 * * * * *', // cronTime
                 () => {
                    // const url = 'http://localhost:3000';
                    const url = 'http://google.com';
                    new CheckService(
                        
                        logRepository,
                        () => console.log(`${url} is online`),
                        (error) => console.log(error),

                    ).execute(url);
                    // new CheckService().execute('http://localhost:3000/');

                },
            );
    }
}

