import Container, { ContainerInstance } from "typedi";

/**
 * This facilitates dependency injection + inversion
 * You can obtain an available implementation from the name of an interface
 */
export default class ReadOnlyDIContainer {
    private instancesContainer: ContainerInstance;

    constructor(
        private container: ContainerInstance,
    ) {
        this.instancesContainer = Container.of('instances');
    }

    /**
     * Obtains a class instance
     * If a constructor is injected, then the object will only be created once
     * 
     * @param name Name of the object
     * @returns Implementation
     */
    public get = <T>(name: string): T => {
        if (!this.container.has(name)) {
            throw new Error(`${name} does not exist in container`);
        }

        const element = this.container.get(name);

        if (element instanceof Function) {
            if (this.instancesContainer.has(name)) {
                return this.instancesContainer.get<T>(name);
            } else {
                const instance = element(this) as T;

                this.instancesContainer.set<T>(name, instance);

                return instance;
            }
        }

        return element as T;
    }
}