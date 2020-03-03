import { MethodAndPropDecorator } from "./types";
export declare function Directive(sdl: string): MethodAndPropDecorator & ClassDecorator;
export declare function Directive(name: string, args?: Record<string, any>): MethodAndPropDecorator & ClassDecorator;
