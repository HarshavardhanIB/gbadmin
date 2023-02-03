"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingRepositoryMixin = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const models_1 = require("../models");
function LoggingRepositoryMixin(superClass, opts) {
    class MixedRepository extends superClass {
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async create(dataObject, options) {
            // console.log('this.entityClass')
            // console.log(this.entityClass);
            var _a, _b, _c, _d, _e;
            // console.log('this.entityClass model definiton settings')
            //console.log(this.entityClass.definition.settings.mysql?.table); //name of model or table
            const created = await super.create(dataObject, options);
            if (this.getCurrentUser && !(options === null || options === void 0 ? void 0 : options.noLogging)) {
                const user = await this.getCurrentUser();
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const log = new models_1.Logging({
                    created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                    changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    //action: Operation.INSERT_ONE,
                    newValue: JSON.stringify(created) || created.toJSON(),
                    recordId: created.getId(),
                    tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                    //actionKey: opts.actionKey,
                    source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                    ...extras,
                });
                try {
                    const newLog = await logRepo.create(log);
                    //console.log(newLog)
                }
                catch (error) {
                    console.log(error);
                    console.error(`Logging failed for data => ${JSON.stringify(log.toJSON())}`);
                }
            }
            return created;
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async createAll(dataObjects, options) {
            const created = await super.createAll(dataObjects, options);
            if (this.getCurrentUser && !(options === null || options === void 0 ? void 0 : options.noLogging)) {
                const user = await this.getCurrentUser();
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logs = created.map(data => {
                    var _a, _b;
                    return new models_1.Logging({
                        created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        changedByUsername: (_a = (user === null || user === void 0 ? void 0 : user.id).toString()) !== null && _a !== void 0 ? _a : '0',
                        //action: Operation.INSERT_MANY,
                        newValue: JSON.stringify(data) || data.toJSON(),
                        recordId: data.getId(),
                        tableName: ((_b = this.entityClass.definition.settings.mysql) === null || _b === void 0 ? void 0 : _b.table) || this.entityClass.modelName,
                        //actionKey: opts.actionKey,
                        source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                        ...extras,
                    });
                });
                logRepo.createAll(logs).catch(() => {
                    const logsJson = logs.map(a => a.toJSON());
                    console.error(`Logging failed for data => ${JSON.stringify(logsJson)}`);
                });
            }
            return created;
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async updateAll(dataObject, where, options) {
            if (options === null || options === void 0 ? void 0 : options.noLogging) {
                return super.updateAll(dataObject, where, options);
            }
            const toUpdate = await this.find({ where });
            const beforeMap = (0, lodash_1.keyBy)(toUpdate, d => d.getId());
            const updatedCount = await super.updateAll(dataObject, where, options);
            const updated = await this.find({ where });
            if (this.getCurrentUser) {
                const user = await this.getCurrentUser();
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logs = updated.map(data => {
                    var _a, _b, _c, _d, _e;
                    return new models_1.Logging({
                        created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        //changedByUsername: (user?.id as any).toString() ?? '0',
                        changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                        changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                        //action: Operation.UPDATE_MANY,
                        oldValue: beforeMap[data.getId()].toJSON(),
                        newValue: JSON.stringify(data) || data.toJSON(),
                        recordId: data.getId(),
                        tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                        //actionKey: opts.actionKey,
                        source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                        ...extras,
                    });
                });
                logRepo.createAll(logs).catch(() => {
                    const logsJson = logs.map(a => a.toJSON());
                    console.error(`Logging failed for data => ${JSON.stringify(logsJson)}`);
                });
            }
            return updatedCount;
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async deleteAll(where, options) {
            if (options === null || options === void 0 ? void 0 : options.noLogging) {
                return super.deleteAll(where, options);
            }
            const toDelete = await this.find({ where });
            const beforeMap = (0, lodash_1.keyBy)(toDelete, d => d.getId());
            const deletedCount = await super.deleteAll(where, options);
            if (this.getCurrentUser) {
                const user = await this.getCurrentUser();
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logs = toDelete.map(data => {
                    var _a, _b, _c, _d, _e;
                    return new models_1.Logging({
                        created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        //changedByUsername: (user?.id as any).toString() ?? '0',
                        changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                        changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                        //action: Operation.DELETE_MANY,
                        oldValue: beforeMap[data.getId()].toJSON(),
                        recordId: data.getId(),
                        tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                        //actionKey: opts.actionKey,
                        source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                        ...extras,
                    });
                });
                logRepo.createAll(logs).catch(() => {
                    const logsJson = logs.map(a => a.toJSON());
                    console.error(`Logging failed for data => ${JSON.stringify(logsJson)}`);
                });
            }
            return deletedCount;
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async updateById(id, data, options) {
            var _a, _b, _c, _d, _e;
            if (options === null || options === void 0 ? void 0 : options.noLogging) {
                return super.updateById(id, data, options);
            }
            const oldValue = await this.findById(id);
            // loopback repository internally calls updateAll so we don't want to create another log
            if (options) {
                options.noLogging = true;
            }
            else {
                options = { noLogging: true, source: 'API' };
            }
            await super.updateById(id, data, options);
            const newValue = await this.findById(id);
            if (this.getCurrentUser) {
                const user = await this.getCurrentUser();
                //console.log(user);
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logLog = new models_1.Logging({
                    created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    //changedByUsername: (user?.id as any).toString() ?? '0',
                    changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                    changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    //action: Operation.UPDATE_ONE,
                    oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),
                    newValue: JSON.stringify(newValue) || newValue.toJSON(),
                    recordId: oldValue.getId(),
                    tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                    //actionKey: opts.actionKey,
                    source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                    ...extras,
                });
                logRepo.create(logLog).catch(() => {
                    console.error(`Logging failed for data => ${JSON.stringify(logLog.toJSON())}`);
                });
            }
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async replaceById(id, data, options) {
            var _a, _b, _c, _d, _e;
            if (options === null || options === void 0 ? void 0 : options.noLogging) {
                return super.replaceById(id, data, options);
            }
            const oldValue = await this.findById(id);
            await super.replaceById(id, data, options);
            const newValue = await this.findById(id);
            if (this.getCurrentUser) {
                const user = await this.getCurrentUser();
                //console.log(user);
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logLog = new models_1.Logging({
                    created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    //changedByUsername: user ? ((user?.id as any).toString()) : '0',
                    changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                    changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    //action: Operation.UPDATE_ONE,
                    oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),
                    newValue: JSON.stringify(newValue) || newValue.toJSON(),
                    recordId: oldValue.getId(),
                    tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                    //actionKey: opts.actionKey,
                    source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                    ...extras,
                });
                logRepo.create(logLog).catch(() => {
                    console.error(`Logging failed for data => ${JSON.stringify(logLog.toJSON())}`);
                });
            }
        }
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        async deleteById(id, options) {
            var _a, _b, _c, _d, _e;
            if (options === null || options === void 0 ? void 0 : options.noLogging) {
                return super.deleteById(id, options);
            }
            const oldValue = await this.findById(id);
            await super.deleteById(id, options);
            if (this.getCurrentUser) {
                const user = await this.getCurrentUser();
                const logRepo = await this.getLoggingRepository();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const extras = Object.assign({}, opts);
                delete extras.actionKey;
                const logLog = new models_1.Logging({
                    created: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss'),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    //changedByUsername: (user?.id as any).toString() ?? '0',
                    changedById: (_b = (_a = user === null || user === void 0 ? void 0 : user.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                    changedByUsername: (_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    //action: Operation.DELETE_ONE,
                    oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),
                    recordId: oldValue.getId(),
                    tableName: ((_e = this.entityClass.definition.settings.mysql) === null || _e === void 0 ? void 0 : _e.table) || this.entityClass.modelName,
                    //actionKey: opts.actionKey,
                    source: (options === null || options === void 0 ? void 0 : options.source) || 'API',
                    ...extras,
                });
                logRepo.create(logLog).catch(() => {
                    console.error(`Logging failed for data => ${JSON.stringify(logLog.toJSON())}`);
                });
            }
        }
    }
    return MixedRepository;
}
exports.LoggingRepositoryMixin = LoggingRepositoryMixin;
//# sourceMappingURL=logging.mixin.js.map