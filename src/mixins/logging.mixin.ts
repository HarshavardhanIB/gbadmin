import {Constructor, MixinTarget} from '@loopback/core';
import {
  Count,
  DataObject,
  Entity,
  EntityCrudRepository,
  Where
} from '@loopback/repository';
import {keyBy} from 'lodash';
import moment from 'moment';

import {ILogMixin, ILogMixinOptions, LogOptions} from '../logging.types';
import {Logging} from '../models';
import {LoggingRepository} from '../repositories';

export function LoggingRepositoryMixin<
  M extends Entity,
  ID,
  Relations extends object,
  UserID,
  Username,
  R extends MixinTarget<EntityCrudRepository<M, ID, Relations>>,
>(
  superClass: R,
  opts: ILogMixinOptions,
): R & Constructor<ILogMixin<UserID>> {
  class MixedRepository extends superClass implements ILogMixin<UserID> {
    getLoggingRepository: () => Promise<LoggingRepository>;
    getCurrentUser?: () => Promise<{id?: UserID, name?: Username}>;

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async create(
      dataObject: DataObject<M>,
      options?: LogOptions,
    ): Promise<M> {
      // console.log('this.entityClass')
      // console.log(this.entityClass);

      // console.log('this.entityClass model definiton settings')
      //console.log(this.entityClass.definition.settings.mysql?.table); //name of model or table

      const created = await super.create(dataObject, options);

      if (this.getCurrentUser && !options?.noLogging) {
        const user = await this.getCurrentUser();
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const log = new Logging({
          created: moment().format('YYYY-MM-DD hh:mm:ss'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          changedById: (user?.id as any)?.toString() ?? '0',
          changedByUsername: (user?.name as any)?.toString() ?? '',
          //action: Operation.INSERT_ONE,
          newValue: JSON.stringify(created) || created.toJSON(),
          recordId: created.getId(),
          tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
          //actionKey: opts.actionKey,
          source: options?.source || 'API',
          ...extras,
        });

        try {
          const newLog = await logRepo.create(log);
          //console.log(newLog)
        } catch (error) {
          console.log(error);
          console.error(
            `Logging failed for data => ${JSON.stringify(log.toJSON())}`,
          );
        }
      }
      return created;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async createAll(
      dataObjects: DataObject<M>[],
      options?: LogOptions,
    ): Promise<M[]> {
      const created = await super.createAll(dataObjects, options);
      if (this.getCurrentUser && !options?.noLogging) {
        const user = await this.getCurrentUser();
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logs = created.map(
          data =>
            new Logging({
              created: moment().format('YYYY-MM-DD hh:mm:ss'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              changedByUsername: (user?.id as any).toString() ?? '0',
              //action: Operation.INSERT_MANY,
              newValue: JSON.stringify(data) || data.toJSON(),
              recordId: data.getId(),
              tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
              //actionKey: opts.actionKey,
              source: options?.source || 'API',
              ...extras,
            }),
        );
        logRepo.createAll(logs).catch(() => {
          const logsJson = logs.map(a => a.toJSON());
          console.error(
            `Logging failed for data => ${JSON.stringify(logsJson)}`,
          );
        });
      }
      return created;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async updateAll(
      dataObject: DataObject<M>,
      where?: Where<M>,
      options?: LogOptions,
    ): Promise<Count> {
      if (options?.noLogging) {
        return super.updateAll(dataObject, where, options);
      }
      const toUpdate = await this.find({where});
      const beforeMap = keyBy(toUpdate, d => d.getId());
      const updatedCount = await super.updateAll(dataObject, where, options);
      const updated = await this.find({where});

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logs = updated.map(
          data =>
            new Logging({
              created: moment().format('YYYY-MM-DD hh:mm:ss'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              //changedByUsername: (user?.id as any).toString() ?? '0',
              changedById: (user?.id as any)?.toString() ?? '0',
              changedByUsername: (user?.name as any)?.toString() ?? '',
              //action: Operation.UPDATE_MANY,
              oldValue: (beforeMap[data.getId()] as Entity).toJSON(),
              newValue: JSON.stringify(data) || data.toJSON(),
              recordId: data.getId(),
              tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
              //actionKey: opts.actionKey,
              source: options?.source || 'API',
              ...extras,
            }),
        );
        logRepo.createAll(logs).catch(() => {
          const logsJson = logs.map(a => a.toJSON());
          console.error(
            `Logging failed for data => ${JSON.stringify(logsJson)}`,
          );
        });
      }

      return updatedCount;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async deleteAll(where?: Where<M>, options?: LogOptions): Promise<Count> {
      if (options?.noLogging) {
        return super.deleteAll(where, options);
      }
      const toDelete = await this.find({where});
      const beforeMap = keyBy(toDelete, d => d.getId());
      const deletedCount = await super.deleteAll(where, options);

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logs = toDelete.map(
          data =>
            new Logging({
              created: moment().format('YYYY-MM-DD hh:mm:ss'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              //changedByUsername: (user?.id as any).toString() ?? '0',
              changedById: (user?.id as any)?.toString() ?? '0',
              changedByUsername: (user?.name as any)?.toString() ?? '',
              //action: Operation.DELETE_MANY,
              oldValue: (beforeMap[data.getId()] as Entity).toJSON(),
              recordId: data.getId(),
              tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
              //actionKey: opts.actionKey,
              source: options?.source || 'API',
              ...extras,
            }),
        );
        logRepo.createAll(logs).catch(() => {
          const logsJson = logs.map(a => a.toJSON());
          console.error(
            `Logging failed for data => ${JSON.stringify(logsJson)}`,
          );
        });
      }

      return deletedCount;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async updateById(
      id: ID,
      data: DataObject<M>,
      options?: LogOptions,
    ): Promise<void> {
      if (options?.noLogging) {
        return super.updateById(id, data, options);
      }
      const oldValue = await this.findById(id);
      // loopback repository internally calls updateAll so we don't want to create another log
      if (options) {
        options.noLogging = true;
      } else {
        options = {noLogging: true, source: 'API'};
      }
      await super.updateById(id, data, options);
      const newValue = await this.findById(id);

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
        //console.log(user);
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logLog = new Logging({
          created: moment().format('YYYY-MM-DD hh:mm:ss'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //changedByUsername: (user?.id as any).toString() ?? '0',
          changedById: (user?.id as any)?.toString() ?? '0',
          changedByUsername: (user?.name as any)?.toString() ?? '',
          //action: Operation.UPDATE_ONE,
          oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),
          newValue: JSON.stringify(newValue) || newValue.toJSON(),
          recordId: oldValue.getId(),
          tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
          //actionKey: opts.actionKey,
          source: options?.source || 'API',
          ...extras,
        });

        logRepo.create(logLog).catch(() => {
          console.error(
            `Logging failed for data => ${JSON.stringify(logLog.toJSON())}`,
          );
        });
      }
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async replaceById(
      id: ID,
      data: DataObject<M>,
      options?: LogOptions,
    ): Promise<void> {
      if (options?.noLogging) {
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
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logLog = new Logging({
          created: moment().format('YYYY-MM-DD hh:mm:ss'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //changedByUsername: user ? ((user?.id as any).toString()) : '0',
          changedById: (user?.id as any)?.toString() ?? '0',
          changedByUsername: (user?.name as any)?.toString() ?? '',
          //action: Operation.UPDATE_ONE,
          oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),
          newValue: JSON.stringify(newValue) || newValue.toJSON(),
          recordId: oldValue.getId(),
          tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
          //actionKey: opts.actionKey,
          source: options?.source || 'API',
          ...extras,
        });

        logRepo.create(logLog).catch(() => {
          console.error(
            `Logging failed for data => ${JSON.stringify(logLog.toJSON())}`,
          );
        });
      }
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async deleteById(id: ID, options?: LogOptions): Promise<void> {
      if (options?.noLogging) {
        return super.deleteById(id, options);
      }
      const oldValue = await this.findById(id);
      await super.deleteById(id, options);

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
        const logRepo = await this.getLoggingRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const logLog = new Logging({
          created: moment().format('YYYY-MM-DD hh:mm:ss'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //changedByUsername: (user?.id as any).toString() ?? '0',
          changedById: (user?.id as any)?.toString() ?? '0',
          changedByUsername: (user?.name as any)?.toString() ?? '',
          //action: Operation.DELETE_ONE,
          oldValue: JSON.stringify(oldValue) || oldValue.toJSON(),

          recordId: oldValue.getId(),
          tableName: this.entityClass.definition.settings.mysql?.table || this.entityClass.modelName,
          //actionKey: opts.actionKey,
          source: options?.source || 'API',
          ...extras,
        });

        logRepo.create(logLog).catch(() => {
          console.error(
            `Logging failed for data => ${JSON.stringify(logLog.toJSON())}`,
          );
        });
      }
    }
  }
  return MixedRepository;
}
