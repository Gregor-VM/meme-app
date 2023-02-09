export function getUniqueListBy<Type>(arr: Type[], key: keyof Type): Type[] {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}