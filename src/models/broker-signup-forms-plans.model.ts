// import {Entity, model, property} from '@loopback/repository';
// //import {BrokerPlanOptions} from './broker-plan-options.model';

// @model({
//   settings: {
//     idInjection: false,
//     foreignKeys: {
//       fk_broker_plans_signup_forms_signup_form_id: {
//         name: 'fk_broker_plans_signup_forms_signup_form_id',
//         entity: 'SignupForms',
//         entityKey: 'id',
//         foreignKey: 'formId',
//       },
//       fk_insurance_plans_broker_plan_plan_id: {
//         name: 'fk_insurance_plans_broker_plan_plan_id',
//         entity: 'InsurancePlans',
//         entityKey: 'id',
//         foreignKey: 'planId',
//       },
//       fk_rebate_id_tiered_rebates_rebate_id: {
//         name: 'fk_rebate_id_tiered_rebates_rebate_id',
//         entity: 'TieredRebates',
//         entityKey: 'id',
//         foreignKey: 'rebateId',
//       },
//     },
//     mysql: {schema: 'group_benefitz', table: 'broker_signup_forms_plans'}
//   }
// })
// export class BrokerSignupFormsPlans extends Entity { //BrokerSignupFormsPlans //BrokerPlans
//   @property({
//     id: true,
//     generated: true,
//     type: 'number',
//   })
//   id?: number;


//   // @property({
//   //   type: 'number',
//   //   required: true,
//   //   precision: 10,
//   //   scale: 0,
//   @property({
//     type: 'number',
//   })
//   form_id?: number;
//   //   mysql: {columnName: 'broker_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   // })
//   // brokerId: number;

//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'form_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   formId: number;

//   @property({
//     type: 'number',
//     required: true,
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'plan_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
//   })
//   planId: number;


//   @property({
//     type: 'number',
//     precision: 10,
//     scale: 0,
//     mysql: {columnName: 'rebate_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
//   })
//   rebateId?: number;

//   @property({
//     type: 'number',
//     precision: 16,
//     mysql: {columnName: 'covered_percentage', dataType: 'float', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'Y'},
//   })
//   coveredPercentage?: number;


//   // @hasMany(() => PlanOptions, {through: {model: () => BrokerPlanOptions, keyFrom: 'broker_plan_id', keyTo: 'plan_option_id'}})
//   // planOptions: PlanOptions[];
//   // Define well-known properties here

//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;

//   constructor(data?: Partial<BrokerSignupFormsPlans>) {
//     super(data);
//   }
// }

// export interface BrokerSignupFormsPlansRelations {
//   // describe navigational properties here
// }

// export type BrokerSignupFormsPlansWithRelations = BrokerSignupFormsPlans & BrokerSignupFormsPlansRelations;
