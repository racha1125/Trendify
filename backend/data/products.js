const products = [
    {
        name: "Blue T-Shirt",
        description: "A comfortable blue t-shirt made from 100% cotton.",
        price: 29.99,
        discountedPrice: 19.99,
        countInStock: 100,
        category: "Top Wear",
        brand: "Sample Brand",
        sizes: ["S", "M", "L"],
        colors: ["Red", "Blue", "Green"],
        collections: ["Summer Collection", "New Arrivals"],
        material: "Cotton",
        gender: "Unisex",
        images: [
            {
                url: "https://example.com/image1.jpg",
                altText: "Image 1"
            },
            {
                url: "https://example.com/image2.jpg",
                altText: "Image 2"
            }
        ],
        isFeatured: true,
        isPublished: true,
        rating: 4,
        numReviews:45,
        tags: ["clothing", "t-shirt", "blue"],
        dimensions: {
            length: 10,
            width: 5,
            height: 2
        },
        weight: 0.5,
        sku: "SP12345"
    },
    {
        name: "Red Hoodie",
        description: "A warm red hoodie perfect for winter.",
        price: 49.99,
        discountedPrice: 39.99,
        countInStock: 50,
        category: "Top Wear",
        brand: "Sample Brand",
        sizes: ["M", "L", "XL"],
        colors: ["Red"],
        collections: ["Winter Collection"],
        material: "Polyester",
        gender: "Unisex",
        images: [
            {
                url: "https://example.com/image3.jpg",
                altText: "Image 3"
            },
            {
                url: "https://example.com/image4.jpg",
                altText: "Image 4"
            }
        ],
        isFeatured: false,
        isPublished: true,
        rating:4.5,
        numReviews:50,
        tags: ["clothing", "hoodie", "red"],
        dimensions: {
            length: 12,
            width: 6,
            height: 3
        },
        weight: 0.8,
        sku: "SP12346"
    },
    {
        name: "Black Sneakers",
        description: "Stylish black sneakers for everyday wear.",
        price: 89.99,
        discountedPrice: 79.99,
        countInStock: 75,
        category: "Footwear",
        brand: "Sample Brand",
        sizes: ["8", "9", "10"],
        colors: ["Black"],
        collections: ["Footwear Collection"],
        material: "Leather",
        gender: "Unisex",
        images: [
            {
                url: "https://example.com/image5.jpg",
                altText: "Image 5"
            },
            {
                url: "https://example.com/image6.jpg",
                altText: "Image 6"
            }
        ],
        isFeatured: true,
        isPublished: true,
        rating:4,
        numReviews:100,
        tags: ["footwear", "sneakers", "black"],
        dimensions: {
            length: 11,
            width: 4,
            height: 4
        },
        weight: 1.2,
        sku: "SP12347"
    },
    {
        name: "White Cap",
        description: "A stylish white cap for sunny days.",
        price: 19.99,
        discountedPrice: 14.99,
        countInStock: 200,
        category: "Accessories",
        brand: "Sample Brand",
        sizes: ["One Size"],
        colors: ["White"],
        collections: ["Summer Collection"],
        material: "Cotton",
        gender: "Unisex",
        images: [
            {
                url: "https://example.com/image7.jpg",
                altText: "Image 7"
            },
            {
                url: "https://example.com/image8.jpg",
                altText: "Image 8"
            }
        ],
        isFeatured: false,
        isPublished: true,
        rating:4.5,
        numReviews:510,
        tags: ["accessories", "cap", "white"],
        dimensions: {
            length: 7,
            width: 7,
            height: 4
        },
        weight: 0.2,
        sku: "SP12348"
    },
    {
        name: "Leather Wallet",
        description: "A premium leather wallet with multiple card slots.",
        price: 39.99,
        discountedPrice: 29.99,
        countInStock: 150,
        category: "Accessories",
        brand: "Sample Brand",
        sizes: ["One Size"],
        colors: ["Brown", "Black"],
        collections: ["Accessories Collection"],
        material: "Leather",
        gender: "Unisex",
        images: [
            {
                url: "https://example.com/image9.jpg",
                altText: "Image 9"
            },
            {
                url: "https://example.com/image10.jpg",
                altText: "Image 10"
            }
        ],
        isFeatured: true,
        isPublished: true,
        rating:4.5,
        numReviews:50,
        tags: ["accessories", "wallet", "leather"],
        dimensions: {
            length: 4,
            width: 3,
            height: 1
        },
        weight: 0.3,
        sku: "SP12349"
    }
];

module.exports = products;