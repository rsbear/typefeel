import { DescriptionOptions, AbstractClassOptions, ResolveTypeOptions } from "./types";
export declare type InterfaceTypeOptions = DescriptionOptions & AbstractClassOptions & ResolveTypeOptions;
export declare function InterfaceType(): ClassDecorator;
export declare function InterfaceType(options: InterfaceTypeOptions): ClassDecorator;
export declare function InterfaceType(name: string, options?: InterfaceTypeOptions): ClassDecorator;
