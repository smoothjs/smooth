export abstract class Provider {
    public abstract register(): void | Promise<void>
    public abstract boot(): void | Promise<void>
}