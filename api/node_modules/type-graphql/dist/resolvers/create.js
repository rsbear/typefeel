"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const types_1 = require("../helpers/types");
const build_context_1 = require("../schema/build-context");
const isPromiseLike_1 = require("../utils/isPromiseLike");
function createHandlerResolver(resolverMetadata) {
    const { validate: globalValidate, authChecker, authMode, pubSub, globalMiddlewares, container, } = build_context_1.BuildContext;
    const middlewares = globalMiddlewares.concat(resolverMetadata.middlewares);
    helpers_1.applyAuthChecker(middlewares, authMode, authChecker, resolverMetadata.roles);
    return (root, args, context, info) => {
        const resolverData = { root, args, context, info };
        const targetInstance = container.getInstance(resolverMetadata.target, resolverData);
        return helpers_1.applyMiddlewares(container, resolverData, middlewares, () => {
            const params = helpers_1.getParams(resolverMetadata.params, resolverData, globalValidate, pubSub);
            if (isPromiseLike_1.default(params)) {
                return params.then(resolvedParams => targetInstance[resolverMetadata.methodName].apply(targetInstance, resolvedParams));
            }
            else {
                return targetInstance[resolverMetadata.methodName].apply(targetInstance, params);
            }
        });
    };
}
exports.createHandlerResolver = createHandlerResolver;
function createAdvancedFieldResolver(fieldResolverMetadata) {
    if (fieldResolverMetadata.kind === "external") {
        return createHandlerResolver(fieldResolverMetadata);
    }
    const targetType = fieldResolverMetadata.getObjectType();
    const { validate: globalValidate, authChecker, authMode, pubSub, globalMiddlewares, container, } = build_context_1.BuildContext;
    const middlewares = globalMiddlewares.concat(fieldResolverMetadata.middlewares);
    helpers_1.applyAuthChecker(middlewares, authMode, authChecker, fieldResolverMetadata.roles);
    return async (root, args, context, info) => {
        const resolverData = { root, args, context, info };
        const targetInstance = types_1.convertToType(targetType, root);
        return helpers_1.applyMiddlewares(container, resolverData, middlewares, async () => {
            const handlerOrGetterValue = targetInstance[fieldResolverMetadata.methodName];
            // method
            if (typeof handlerOrGetterValue === "function") {
                const params = await helpers_1.getParams(fieldResolverMetadata.params, resolverData, globalValidate, pubSub);
                return handlerOrGetterValue.apply(targetInstance, params);
            }
            // getter
            return handlerOrGetterValue;
        });
    };
}
exports.createAdvancedFieldResolver = createAdvancedFieldResolver;
function createBasicFieldResolver(fieldMetadata) {
    const { authChecker, authMode, globalMiddlewares, container } = build_context_1.BuildContext;
    const middlewares = globalMiddlewares.concat(fieldMetadata.middlewares);
    helpers_1.applyAuthChecker(middlewares, authMode, authChecker, fieldMetadata.roles);
    return (root, args, context, info) => {
        const resolverData = { root, args, context, info };
        return helpers_1.applyMiddlewares(container, resolverData, middlewares, () => root[fieldMetadata.name]);
    };
}
exports.createBasicFieldResolver = createBasicFieldResolver;
