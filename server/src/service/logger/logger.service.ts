export abstract class LoggerService{
    public abstract infoLog(message: string): void
    public abstract errorLog(message: string): void
}