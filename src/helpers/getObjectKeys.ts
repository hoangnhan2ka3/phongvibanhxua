export const getObjectKeys = <OBJ extends object>(obj: OBJ): (keyof OBJ)[] => {
    return Object.keys(obj) as (keyof OBJ)[]
}
