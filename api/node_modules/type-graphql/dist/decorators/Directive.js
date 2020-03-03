"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function Directive(nameOrDefinition, args = {}) {
    return (targetOrPrototype, propertyKey, descriptor) => {
        const directive = { nameOrDefinition, args };
        if (typeof propertyKey === "symbol") {
            throw new errors_1.SymbolKeysNotSupportedError();
        }
        if (propertyKey) {
            getMetadataStorage_1.getMetadataStorage().collectDirectiveFieldMetadata({
                target: targetOrPrototype.constructor,
                fieldName: propertyKey,
                directive,
            });
        }
        else {
            getMetadataStorage_1.getMetadataStorage().collectDirectiveClassMetadata({
                target: targetOrPrototype,
                directive,
            });
        }
    };
}
exports.Directive = Directive;
