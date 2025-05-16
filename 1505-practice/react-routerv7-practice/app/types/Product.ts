interface reviews {
    rating: number
    comment: string
    reviewerName: string
    reviewerEmail: string
}

export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    rating: number
    stock: number
    brand: string
    reviews: reviews[]
    images: []
    thumbnail: string
}