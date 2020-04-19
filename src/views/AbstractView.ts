export abstract class AbstractView {
    protected state: any;
    protected targetElement: Element;

    constructor(targetElement: Element) {
        this.targetElement = targetElement;
    }

    /**
     * Setter method for state.
     *
     * When setting the state, onStateChange will be called to update the targetElement with the newly rendered Element.
     */
    public setState(state: any) {
        this.state = state;

        this.onStateChange()
            .then(() => this.targetElement.replaceWith(this.render()));
    }


    /**
     * Hook for state changes.
     *
     * @returns {boolean} Returns true on successful state change.
     */
    public abstract async onStateChange(): Promise<boolean>;

    /**
     * Render function to create new Elements.
     *
     * @returns {Element} Returns the created element.
     */
    public abstract render(): Element;
}