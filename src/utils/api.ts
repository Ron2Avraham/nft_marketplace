export const getMotorcycles = async (skip: number) => {
    return await fetch('https://dummyjson.com/products/category/motorcycle?limit=10' + skip)
        .then(res => res.json())
}

export const getAutomotives = async (skip: number) => {
    return await fetch('https://dummyjson.com/products/category/automotive?limit=10&skip=' + skip)
        .then(res => res.json())
}

