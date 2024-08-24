import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;


export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly SuccessCallback: SuccessCallback,
        private readonly ErrorCallback: ErrorCallback
    ){}

    public async execute(url: string): Promise<boolean> {

        try{
            const req = await fetch(url);

            if(!req.ok) {
                throw new Error (`check on service ${url}`)
            }

            this.SuccessCallback();

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            return true;
        }

        catch(error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);

            this.logRepository.saveLog(log)

            this.ErrorCallback(errorMessage)

            return false
        }

    }

}