"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTokens = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const translation_languages_model_1 = require("./translation-languages.model");
let LanguageTokens = class LanguageTokens extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 45,
        generated: 0,
        mysql: { columnName: 'category', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], LanguageTokens.prototype, "category", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], LanguageTokens.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", Number)
], LanguageTokens.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'item_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], LanguageTokens.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        length: 255,
        generated: 0,
        mysql: { columnName: 'key', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], LanguageTokens.prototype, "key", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 0,
        mysql: { columnName: 'translation_language_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Number)
], LanguageTokens.prototype, "translationLanguageId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 65535,
        generated: 0,
        mysql: { columnName: 'value', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], LanguageTokens.prototype, "value", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => translation_languages_model_1.TranslationLanguages, { name: 'translationLanguages' }),
    tslib_1.__metadata("design:type", Number)
], LanguageTokens.prototype, "translation_language_id", void 0);
LanguageTokens = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            foreignKeys: {
                language_tokens_ibfk_1: {
                    name: 'language_tokens_ibfk_1',
                    entity: 'translationLanguages',
                    entityKey: 'id',
                    foreignKey: 'translationLanguageId',
                }
            },
            mysql: { schema: 'group_benefitz', table: 'language_tokens' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], LanguageTokens);
exports.LanguageTokens = LanguageTokens;
//# sourceMappingURL=language-tokens.model.js.map