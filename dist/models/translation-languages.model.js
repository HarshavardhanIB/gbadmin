"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationLanguages = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const language_tokens_model_1 = require("./language-tokens.model");
let TranslationLanguages = class TranslationLanguages extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'description', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TranslationLanguages.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        precision: 10,
        scale: 0,
        generated: 1,
        id: 1,
        mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1 },
    }),
    tslib_1.__metadata("design:type", Number)
], TranslationLanguages.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        precision: 1,
        generated: 0,
        mysql: { columnName: 'is_default', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", Boolean)
], TranslationLanguages.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 45,
        generated: 0,
        mysql: { columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TranslationLanguages.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        length: 5,
        generated: 0,
        mysql: { columnName: 'slug', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0 },
    }),
    tslib_1.__metadata("design:type", String)
], TranslationLanguages.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => language_tokens_model_1.LanguageTokens, { keyTo: 'translationLanguageId' }),
    tslib_1.__metadata("design:type", Array)
], TranslationLanguages.prototype, "languageTokens", void 0);
TranslationLanguages = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            idInjection: false,
            mysql: { schema: 'group_benefitz', table: 'translation_languages' }
        }
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TranslationLanguages);
exports.TranslationLanguages = TranslationLanguages;
//# sourceMappingURL=translation-languages.model.js.map