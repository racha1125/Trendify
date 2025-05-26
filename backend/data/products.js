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
    "name": "Classic White Shirt",
    "description": "A timeless white shirt ideal for both formal and casual wear.",
    "price": 49.99,
    "discountedPrice": 34.99,
    "countInStock": 70,
    "category": "Top Wear",
    "brand": "Elegance",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["White"],
    "collections": ["Formal Collection", "Best Sellers"],
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://example.com/shirt-white1.jpg",
        "altText": "Classic White Shirt Front"
      },
      {
        "url": "https://example.com/shirt-white2.jpg",
        "altText": "Classic White Shirt Back"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "rating": 4.5,
    "numReviews": 80,
    "tags": ["shirt", "white", "formal"],
    "dimensions": {
      "length": 12,
      "width": 8,
      "height": 2
    },
    "weight": 0.4,
    "sku": "ELG1001"
  },
  {
    "name": "Graphic Print Tee",
    "description": "Trendy t-shirt featuring a vibrant graphic print. Made from eco-friendly fabric.",
    "price": 35.99,
    "discountedPrice": 25.99,
    "countInStock": 150,
    "category": "Top Wear",
    "brand": "UrbanVibe",
    "sizes": ["XS", "S", "M", "L", "XL"],
    "colors": ["Black", "Yellow"],
    "collections": ["Street Style", "New Arrivals"],
    "material": "Organic Cotton",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://example.com/graphic-tee1.jpg",
        "altText": "Graphic Tee Front"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "rating": 4.7,
    "numReviews": 120,
    "tags": ["t-shirt", "graphic", "eco"],
    "dimensions": {
      "length": 11,
      "width": 6,
      "height": 2
    },
    "weight": 0.45,
    "sku": "UVB2025"
  },
  {
    "name": "Slim Fit Chinos",
    "description": "Modern slim-fit chinos perfect for office or casual outings.",
    "price": 59.99,
    "discountedPrice": 44.99,
    "countInStock": 60,
    "category": "Bottom Wear",
    "brand": "UrbanVibe",
    "sizes": ["30", "32", "34", "36"],
    "colors": ["Beige", "Navy Blue"],
    "collections": ["Workwear", "Essentials"],
    "material": "Cotton Stretch",
    "gender": "Men",
    "images": [
      {
        "url": "https://example.com/chinos1.jpg",
        "altText": "Slim Fit Chinos"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "rating": 4.3,
    "numReviews": 60,
    "tags": ["pants", "chinos", "slim fit"],
    "dimensions": {
      "length": 40,
      "width": 12,
      "height": 2
    },
    "weight": 0.7,
    "sku": "UVB3011"
  },
  {
    "name": "Relaxed Fit Jeans",
    "description": "Relaxed fit blue jeans with a classic denim wash.",
    "price": 69.99,
    "discountedPrice": 54.99,
    "countInStock": 80,
    "category": "Bottom Wear",
    "brand": "DenimDays",
    "sizes": ["28", "30", "32", "34", "36"],
    "colors": ["Blue"],
    "collections": ["Denim Collection", "Casuals"],
    "material": "Denim",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://example.com/jeans1.jpg",
        "altText": "Relaxed Fit Jeans"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "rating": 4.6,
    "numReviews": 102,
    "tags": ["pants", "jeans", "denim"],
    "dimensions": {
      "length": 42,
      "width": 14,
      "height": 2
    },
    "weight": 0.8,
    "sku": "DDJ4001"
  },
  {
    "name": "Athletic Jogger Pants",
    "description": "Lightweight, breathable joggers designed for maximum comfort and flexibility.",
    "price": 39.99,
    "discountedPrice": 27.99,
    "countInStock": 50,
    "category": "Bottom Wear",
    "brand": "ActivePro",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Black", "Grey"],
    "collections": ["Sportswear", "Summer Collection"],
    "material": "Polyester Blend",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://example.com/joggers1.jpg",
        "altText": "Athletic Jogger Pants"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "rating": 4.2,
    "numReviews": 38,
    "tags": ["pants", "joggers", "athletic"],
    "dimensions": {
      "length": 39,
      "width": 11,
      "height": 2
    },
    "weight": 0.5,
    "sku": "APJ1234"
  },
  {
    "name": "Floral Print Shirt",
    "description": "Bright floral print shirt ideal for summer outings.",
    "price": 44.99,
    "discountedPrice": 32.99,
    "countInStock": 65,
    "category": "Top Wear",
    "brand": "TropicStyle",
    "sizes": ["M", "L", "XL"],
    "colors": ["White", "Pink"],
    "collections": ["Summer Collection"],
    "material": "Rayon",
    "gender": "Men",
    "images": [
      {
        "url": "https://example.com/floral-shirt1.jpg",
        "altText": "Floral Print Shirt"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "rating": 4.1,
    "numReviews": 25,
    "tags": ["shirt", "floral", "summer"],
    "dimensions": {
      "length": 13,
      "width": 9,
      "height": 2
    },
    "weight": 0.35,
    "sku": "TSF2024"
  },
  {
    "name": "Cargo Utility Pants",
    "description": "Multi-pocket cargo pants for functional everyday wear.",
    "price": 64.99,
    "discountedPrice": 49.99,
    "countInStock": 40,
    "category": "Bottom Wear",
    "brand": "RuggedGear",
    "sizes": ["M", "L", "XL"],
    "colors": ["Olive", "Khaki"],
    "collections": ["Outdoor", "Essentials"],
    "material": "Cotton Twill",
    "gender": "Men",
    "images": [
      {
        "url": "https://example.com/cargo1.jpg",
        "altText": "Cargo Utility Pants"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "rating": 4.0,
    "numReviews": 18,
    "tags": ["pants", "cargo", "utility"],
    "dimensions": {
      "length": 41,
      "width": 14,
      "height": 3
    },
    "weight": 0.9,
    "sku": "RGU9999"
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