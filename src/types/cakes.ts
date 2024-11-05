interface Image {
    id: number,
    index: number,
    source: string,
    description: string,
    status: "ACTIVE" | "INACTIVE"
}

interface Category {
    id: number,
    name: string,
    description: string,
    categoryImg: string | null,
    status: "ACTIVE" | "INACTIVE"
}

interface Supplier {
    id: number,
    name: string,
    ownerName: string,
    phone: string,
    street: string,
    ward: string,
    district: string,
    province: string,
    openedTime: string,
    closedTime: string
}

interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    discountPrice: number,
    discountExpiry: string,
    calories: number,
    totalRating: number,
    averageStar: number,
    dailyStock: number,
    images: Image[],
    categories: Category[],
    supplier: Supplier,
    quantity?: number
}

interface CakesData {
    totalItems: number,
    items: Item[]
}

export { type CakesData, type Item }
