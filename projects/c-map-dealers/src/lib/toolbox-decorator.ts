export interface IToolboxComponent {
  desc: String,
  icon: String,
  dragImage?: String,
  componentName: String,
  component?: any
}

export function ToolboxComponent(toolBoxDefinition: IToolboxComponent): ClassDecorator {
  return function (customComponent) {
    // Name of the component
    toolBoxDefinition.componentName = customComponent.name;
    console.log(customComponent);
    // Component itself
    toolBoxDefinition.component = customComponent;

    // Adds a property "ToolboxComponent"
    Object.defineProperty(customComponent, ToolboxComponent.name, {
      value: toolBoxDefinition
    })
  }
}