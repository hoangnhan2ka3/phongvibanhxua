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

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    discountPrice: number,
    discountExpiry: string,
    calories: number,
    totalRating: number,
    averageStar: number,
    dailyStock: number | null,
    images: Image[],
    categories: Category[],
    supplier: Supplier
}

interface Item {
    quantity: number,
    product: Product
}

interface SetItem {
    id: number,
    name: string,
    description: string,
    price: number,
    discountPrice: number,
    discountExpiry: string,
    totalRating: number,
    averageStar: number,
    dailyStock: number,
    items: Item[],
    quantity?: number
}

interface CombosData {
    totalItems: number,
    items: SetItem[],
    totalPages: number,
    currentPage: number
}

export { type CombosData, type Item, type SetItem }
