import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { Attachment } from 'nodemailer/lib/mailer';
// import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string
    attachments?: Attachment[];
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,

        }

    });

    // constructor(
    //     private readonly logRepository: LogRepository
    // ){}  No la necesitamos porque usamos el UseCase

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sendEmailInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            // console.log(sendEmailInformation)
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)

            return true
        }
        catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email was not sent',
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)

            return false;
        }

    }

    async SendEmailWithFileSystemLogs( to: string | string[]) {

        const subject = 'Logs del servidor'
        const htmlBody = `<h3> Logs de sistema NOC </h3>
        <p>Lorem vit lorem vit lorem vit lorem vit </p>
        <p>Ver los adjuntos</p>`;

        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'}

        ];

        return this.sendEmail({
        to, subject, htmlBody, attachments
        })
    }

}