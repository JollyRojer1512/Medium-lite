export type ParamDeclaration<Type> = {
  type: PickConstructor<Type>;
  validate?: ((value: any) => boolean) | RegExp | any[];
  coerce?: (value: any) => any;
  convert?: (value: any) => any;
  default?: any;
};

export type ParamsDeclaration<Params> = {
  [P in keyof Params]: Params[P] extends SimpleObject[] | Primitives[]
    ? Params[P][number] extends SimpleObject
      ? {
          type: typeof Array;
          element: { type: ParamsDeclaration<Params[P][number]> };
          default?: any;
        }
      : Params[P][number] extends Primitives[]
      ? {
          type: typeof Array;
          element: ParamsDeclaration<Params[P][number]>;
        }
      : { type: typeof Array; element: ParamDeclaration<Params[P][number]> }
    : Params[P] extends SimpleObject
    ? { type: ParamsDeclaration<Params[P]>; default?: any }
    : Params[P] extends Primitives[]
    ? { type: typeof Array; element: ParamsDeclaration<Params[P]> }
    : ParamDeclaration<Params[P]>;
};

export type Primitives = string | number | boolean;

export type SimpleObject = {
  [key: string | number | symbol]:
    | Primitives
    | Primitives[]
    | SimpleObject
    | SimpleObject[];
};

export type PickConstructor<T> = T extends number
  ? typeof Number
  : T extends string
  ? typeof String
  : T extends boolean
  ? typeof Boolean
  : T extends { [key: string]: any }
  ? { [key: string]: any }
  : T extends { [key: number]: any }
  ? typeof Array
  : T;
