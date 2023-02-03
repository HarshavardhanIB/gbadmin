import { Constructor, MixinTarget } from '@loopback/core';
import { Entity, EntityCrudRepository } from '@loopback/repository';
import { ILogMixin, ILogMixinOptions } from '../logging.types';
export declare function LoggingRepositoryMixin<M extends Entity, ID, Relations extends object, UserID, Username, R extends MixinTarget<EntityCrudRepository<M, ID, Relations>>>(superClass: R, opts: ILogMixinOptions): R & Constructor<ILogMixin<UserID>>;
