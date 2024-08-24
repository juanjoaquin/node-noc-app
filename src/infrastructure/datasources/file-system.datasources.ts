import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLongsPath = 'logs/logs-all.log';
    private readonly mediumLongsPath = 'logs/logs-medium.log';
    private readonly highLongsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLongsPath,
            this.mediumLongsPath,
            this.highLongsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    };


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)} \n `

        fs.appendFileSync(this.allLongsPath, logAsJson)

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLongsPath, logAsJson)
        } else {
            fs.appendFileSync(this.highLongsPath, logAsJson)
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLongsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLongsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLongsPath);
            
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}