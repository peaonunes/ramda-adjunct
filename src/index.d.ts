declare var RA: RamdaAdjunct.Static;

declare namespace RamdaAdjunct {

    interface Functor<T> {
        map<U>(fn: (t: T) => U): Functor<U>;
    }

    interface Apply<T> extends Functor<T> {
        ap<U>(fn: Apply<(t: T) => U>): Apply<U>;
    }

    interface Catamorphism<T> {
        cata<T1>(leftFn: (v: T1) => T, rightFn: (v: T1) => T): T;
    }

    interface Variadic<T1, T2> {
        (...args: T1[]): T2;
    }

    export interface Static {
        /**
         * Checks if input value is `Array`
         */
        isArray(val: any): val is Array<any>;

        /**
         * Checks if input value is `Boolean
         */
        isBoolean(val: any): val is Boolean;

        /**
         * Returns `true` if the given value is its type's empty value, `null` or `undefined`
         */
        isNilOrEmpty(val: any): boolean;

        /**
         * Checks if input value is complement of `Array`
         */
        isNotArray(val: any): boolean;

        /**
         * Checks if input value is complement of `Boolean`
         */
        isNotBoolean(val: any): boolean;

        /**
         * Returns true if the given value is not its type's empty value; `false` otherwise.
         */
        isNotEmpty(val: any): boolean;

        /**
         * Checks if input value is complement of `null` or `undefined`
         */
        isNotNil(val: any): boolean;

        /**
         * Checks if input value is complement of `null`
         */
        isNotNull(val: any): boolean;

        /**
         * Checks if input value is complement of `String`
         */
        isNotString(val: any): boolean;

        /**
         * Checks if input value is complement `undefined`
         */
        isNotUndefined(val: any): boolean;

        /**
         * Checks if input value is `null`
         */
        isNull(val: any): val is null;

        /**
         * Checks if input value is `String`
         */
        isString(val: any): val is String;

        /**
         * Checks if input value is `undefined`
         */
        isUndefined(val: any): val is undefined;

        /**
         * Tests whether or not an object is similar to an array.
         */
        isNotArrayLike(val: any): boolean;

        /**
         * Checks if input value is `Generator Function`
         */
        isGeneratorFunction(val: any): boolean;

        /**
         * Checks if input value is complement of `Generator Function`
         */
        isNotGeneratorFunction(val: any): boolean;

        /**
         * Checks if input value is `Async Function`
         */
        isAsyncFunction(val: any): boolean;

        /**
         * Checks if input value is complement of `Async Function`
         */
        isNotAsyncFunction(val: any): boolean;

        /**
         * Checks if input value is `Function`
         */
        isFunction(val: any): boolean;

        /**
         * Checks if input value is complement of `Function`
         */
        isNotFunction(val: any): boolean;

        /**
         * Checks if input value is language type of `Object`
         */
        isObject(val: any): val is Object;

        /**
         * Checks if input value is complement of language type of `Object`
         */
        isNotObject(val: any): boolean;

        /**
         * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
         */
        isObjectLike(val: any): boolean;

        /**
         * Checks if value is not object-like. A value is object-like if it's not null and has a typeof result of "object".
         */
        isNotObjectLike(val: any): boolean;

        /**
         * Check to see if an object is a plain object (created using `{}`, `new Object()` or `Object.create(null)`)
         */
        isPlainObject(val: any): boolean;

        /**
         * Check to see if an object is not a plain object (created using `{}`, `new Object()` or `Object.create(null)`)
         */
        isNotPlainObject(val: any): boolean;

        /**
         * Checks if value is `Date` object.
         */
        isDate(val: any): val is Date;

        /**
         * Checks if value is complement of `Date` object
         */
        isNotDate(val: any): boolean;

        /**
         * Checks whether the passed value is `NaN` and its type is `Number`.
         * It is a more robust version of the original, global isNaN().
         */
        isNaN(val: any): boolean;

        /**
         * Checks whether the passed value is complement of `NaN` and its type is not `Number`.
         */
        isNotNaN(val: any): boolean;

        /**
         * Checks if value is a `Number` primitive or object
         */
        isNumber(val: any): val is Number;

        /**
         * Checks if value is a complement of `Number` primitive or object
         */
        isNotNumber(val: any): boolean;

        /**
         * Checks whether the passed value is a finite `Number`.
         */
        isFinite(val: any): boolean;

        /**
         * Checks whether the passed value is complement of finite `Number`.
         */
        isNotFinite(val: any): boolean;

        /**
         * Checks whether the passed value is a an `integer`.
         */
        isInteger(val: any): boolean;

        /**
         * Checks whether the passed value is complement of `integer`.
         */
        isNotInteger(val: any): boolean;

        /**
         * A function that returns `undefined`.
         */
        stubUndefined(): undefined;

        /**
         * A function that returns `null`.
         */
        stubNull():  null;

        /**
         * A function that performs no operations.
         */
        noop(): undefined;

        /**
         * Picks values from list by indexes.
         */
        pickIndexes<T>(indexes: Array<number>, list: Array<T>): Array<T>;
        pickIndexes(indexes: Array<number>): <T>(list: Array<T>) => Array<T>;

        /**
         * Creates a list from from arguments.
         */
        list(...items: any[]): Array<any>;

        /**
         * Set properties only if they don't exist. Useful for passing defaults. Basically this function
         * is the alias of {@link http://ramdajs.com/docs/#merge|merge}.
         */
        defaults(defaultOptions: Object, options: Object): Object
        defaults(defaultOptions: Object): (options: Object) => Object

        /**
         * Reset properties of the object to their default values.
         */
        resetToDefault(defaultOptions: Object, options: Object): Object
        resetToDefault(defaultOptions: Object): (options: Object) => Object

        /**
         * Acts as multiple path: arrays of paths in, array of values out. Preserves order.
         */
        paths(ps: Array<Array<string | number>>, obj: Object): Array<any>
        paths(ps: Array<Array<string | number>>): (obj: Object) => Array<any>

        /**
         * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
         * the Apply spec of fantasy land.
         */
        liftFN<T>(arity: number, fn: Variadic<Apply<T>, T>): Apply<T>

        /**
         * "lifts" a function of arity > 1 so that it may "map over" objects that satisfy
         * the Apply spec of fantasy land.
         */
        liftF<T>(fn: Variadic<Apply<T>, T>): Apply<T>

        /**
         * The catamorphism for either. If the either is right than the right function will be executed with
         * the right value and the value of the function returned. Otherwise the left function
         * will be called with the left value.
         */
        cata<V1, V2, T1, T2>(leftFn: (leftValue: V1) => T1, rightFn: (rightValue: V2) => T2, either: Catamorphism<V1|V2>): T1|T2;
        cata<V1, V2, T1, T2>(leftFn: (leftValue: V1) => T1, rightFn: (rightValue: V2) => T2): {
            (either: Catamorphism<V1|V2>): T1|T2;
        };
        cata<V1, V2, T1, T2>(leftFn: (leftValue: V1) => T1): {
            (rightFn: (rightValue: V2) => T1, either: Catamorphism<V1|V2>): T1|T2;
            (rightFn: (rightValue: V2) => T1): {
                (either: Catamorphism<V1|V2>): T1|T2;
            }
        }

        /**
         * Creates a new object with the own properties of the provided object, but the
         * keys renamed according to the keysMap object as `{oldKey: newKey}`.
         * When some key is not found in the keysMap, then it's passed as-is.
         */
        renameKeys(keysMap: Object, obj: Object): Object
        renameKeys(keysMap: Object): (obj: Object) => Object

        /**
         * Creates a new object with the own properties of the provided object, but the
         * keys renamed according to logic of renaming function.
         */
        renameKeysWith(renameFn: (key: any) => any, obj: Object): Object
        renameKeysWith(renameFn: (key: any) => any): (obj: Object) => Object
    }

}

export = RA;
