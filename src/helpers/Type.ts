type ValueOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

export function unionTypeToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>): U =>
    elements;
}
