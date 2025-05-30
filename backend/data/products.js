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
        gender: "Men",
        images: [
            {
                url: "https://hummel.net.in/cdn/shop/products/ascon-men-blue-t-shirts-2.jpg?v=1747505400",
                altText: "Image 1"
            },
            {
                url: "https://hummel.net.in/cdn/shop/products/ascon-men-blue-t-shirts-4.jpg?v=1747505400",
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
    name: "Classic White Shirt",
    description: "A timeless white shirt ideal for both formal and casual wear.",
    price: 49.99,
    discountedPrice: 34.99,
    countInStock: 70,
    category: "Top Wear",
    brand: "Elegance",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    collections: ["Formal Collection", "Best Seller"],
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://shapingnewtomorrow.com/cdn/shop/files/ClassicShirt_White_1_5cd5bf10-af18-4d0b-a477-bc3422d8401a.jpg?crop=region&crop_height=1788&crop_left=2&crop_top=0&crop_width=1377&height=1662&v=1729522712&width=1280",
        altText: "Image 1"
      },
      {
        url: "https://shapingnewtomorrow.com/cdn/shop/files/ClassicShirt_White_3_a70c6f4d-33b0-4b2c-9f31-16b8296f082e.jpg?v=1729522711&width=1024&height=1329&crop=center",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.5,
    numReviews: 80,
    tags: ["shirt", "white", "formal"],
    dimensions: {
      length: 12,
      width: 8,
      height: 2
    },
    weight: 0.4,
    sku: "ELG1001"
  },
  {
    name: "Graphic Print Tee",
    description: "Trendy t-shirt featuring a vibrant graphic print. Made from eco-friendly fabric.",
    price: 35.99,
    discountedPrice: 25.99,
    countInStock: 150,
    category: "Top Wear",
    brand: "UrbanVibe",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Yellow"],
    collections: ["Street Style", "New Arrivals"],
    material: "Cotton",
    gender: "Unisex",
    images: [
      {
        url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR10LHhmJNHU9wFktMzqMWSQ3ZKVjPl_snpNtJ7V4z8D-Dgu2o51pKIS13JAnHEhcCcQjch8ArYdDn-N015BD190yOIPK67dCitFSG7xQ4",
        altText: "Image 1"
      },
      {
        url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQIFDdP30e1SelUwHo5ZmFKPmjg-dAUzzA4j5GZKfRg-p13IxGZdyJotkZZFvloh2l-7Pe7ifV6OL-AYWUg4tmhRwGXSLyVRarbtzRG6pYc",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 120,
    tags: ["t-shirt", "graphic", "eco"],
    dimensions: {
      length: 11,
      width: 6,
      height: 2
    },
    weight: 0.45,
    sku: "UVB2025"
  },
  {
    name: "Slim Fit Chinos",
    description: "Modern slim-fit chinos perfect for office or casual outings.",
    price: 59.99,
    discountedPrice: 44.99,
    countInStock: 60,
    category: "Bottom Wear",
    brand: "UrbanVibe",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Navy Blue"],
    collections: ["Workwear", "Essentials"],
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQAch_iFzmkqmnh6Nbbq5C9koGSlk6yIGhHdlJGIGdL2dsuBJXA204BYgsVJ0QlZ7JzIZJuN-d3yZsSjoabcAsuZ5xrG9xqTDl5fKLsZA4C3jUpHvKf0sPwzg",
        altText: "Image 1"
      },
      {
        url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_NpPqulN0kFn1cjZgfZjajvkEAMpVIpmZlde6lWcaGruv9jjWtR85uFzr0a7gP6aOH-_iUul3FhemSni4Z47jsY_5hEPyJcH0520DcWg20dTNRMti2IIz",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.3,
    numReviews: 60,
    tags: ["pants", "chinos", "slim fit"],
    dimensions: {
      length: 40,
      width: 12,
      height: 2
    },
    weight: 0.7,
    sku: "UVB3011"
  },
  {
    name: "Relaxed Fit Jeans",
    description: "Relaxed fit blue jeans with a classic denim wash.",
    price: 69.99,
    discountedPrice: 54.99,
    countInStock: 80,
    category: "Bottom Wear",
    brand: "DenimDays",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    collections: ["Denim Collection", "Casuals"],
    material: "Denim",
    gender: "Unisex",
    images: [
      {
        url: "https://images.bestsellerclothing.in/data/JJ/17-dec-2024/901406401_g6.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto",
        altText: "Image 1"
      },
      {
        url: "https://images.bestsellerclothing.in/data/JJ/17-dec-2024/901403901_g6.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.6,
    numReviews: 102,
    tags: ["pants", "jeans", "denim"],
    dimensions: {
      length: 42,
      width: 14,
      height: 2
    },
    weight: 0.8,
    sku: "DDJ4001"
  },
  {
    name: "Athletic Jogger Pants",
    description: "Lightweight, breathable joggers designed for maximum comfort and flexibility.",
    price: 39.99,
    discountedPrice: 27.99,
    countInStock: 50,
    category: "Bottom Wear",
    brand: "ActivePro",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey"],
    collections: ["Sportswear", "Summer Collection"],
    material: "Polyester",
    gender: "Unisex",
    images: [
      {
        url: "https://americantall.com/cdn/shop/files/American-Tall-Women-Basics-Athletic-Jogger-Black-front.jpg?v=1706735469",
        altText: "Image 1"
      },
      {
        url: "https://assets.ajio.com/medias/sys_master/root/20221015/19O0/634a5eaeaeb269659c47008e/-473Wx593H-469241049-jetblack-MODEL.jpg",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.2,
    numReviews: 38,
    tags: ["pants", "joggers", "athletic"],
    dimensions: {
      length: 39,
      width: 11,
      height: 2
    },
    weight: 0.5,
    sku: "APJ1234"
  },
  {
    name: "Floral Print Shirt",
    description: "Bright floral print shirt ideal for summer outings.",
    price: 44.99,
    discountedPrice: 32.99,
    countInStock: 65,
    category: "Top Wear",
    brand: "TropicStyle",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Pink"],
    collections: ["Summer Collection"],
    material: "Rayon",
    gender: "Men",
    images: [
      {
        url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRclJZ6xCEJpbW_P2_dDcPC2fATVOZ_rOIK2wuim5CCLkus6_ananvitNTNEc7CWKZCuPhk3dpA5j9o6MbistYh3Afiqkl8gm5J87NQjbavQtWmH1-KSX4u",
        altText: "Image 1"
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRjlAu-nr4TknwsSX68V2Gpf92Xsz3Qr8lSeveG3zqAW2dQQmfgd6TyrRPcxGheb4bpVx0ChJu45eF_HMoRfYI3A7LkzNZ9wm0_FSjHuhHF",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.1,
    numReviews: 25,
    tags: ["shirt", "floral", "summer"],
    dimensions: {
      length: 13,
      width: 9,
      height: 2
    },
    weight: 0.35,
    sku: "TSF2024"
  },
  {
    name: "Cargo Utility Pants",
    description: "Multi-pocket cargo pants for functional everyday wear.",
    price: 64.99,
    discountedPrice: 49.99,
    countInStock: 40,
    category: "Bottom Wear",
    brand: "RuggedGear",
    sizes: ["M", "L", "XL"],
    colors: ["Olive", "Khaki"],
    collections: ["Outdoor", "Essentials"],
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqVMjHOPSd4tOUUQ3jjDct75FqoRvRf3YJmi2c319EgQVA4P7oL0xGbgE1dGbev8RaUsvD0Wf9g6ugMcrIrXH52_PqUJsEYESJPX24Co8SK3KNcjNYvbkz",
        altText: "Image 1"
      },
      {
        url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTzqvsU3VCJSmQu6-Au260zAl2u_5LH0hx4oiGaFsoJEFJRk_fOohMOH-uN3R3dO5tJxezTwsYlYOMSTcTk_iAobU6uNdgeyUPrCj2WA2Fk",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.0,
    numReviews: 18,
    tags: ["pants", "cargo", "utility"],
    dimensions: {
      length: 41,
      width: 14,
      height: 3
    },
    weight: 0.9,
    sku: "RGU9999"
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
                url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTlwqcNRRjPHOtVFlasBsZeK7f-5UOk71qMj6UCEOE0Mi45LfT1TKMydUByNSU6Kj8HrydjQBO9MUzSetZvgEeMXuhEx5NV",
                altText: "Image 3"
            },
            {
                url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTeKewtzC0gptEnP2FquOSBQ0gOOLm073ivfDNYzfQNBgRgByCOfU1D9gn2Cdk_2w5K73UZW8qsYJZ43qfh5Rf-eau_Xl8pDT53Mtuh-urDhNMoogxwOnkp",
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
                url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcScobxtTFG0lY2akXWj6NFSJZeIfaUqmyylYaP8vi5oQfjg4IklJDgDFFiR9HuklnwEUw6PaI181MH445-uSkuJo4baudeSl_yNTQGoFzFUr8OemwbfSB8UxA",
                altText: "Image 5"
            },
            {
                url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ47hI0Pgaei_BsaAvQ6JcMsvfCu37SpPSoH1Hq8We90m9lMnZ6xKix_JB1FT65wGCQyquT4iRC33rodXJ67TiCrdS5sQ8tK32nb5RTZg45CWm6k-EC6_MiwA",
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
                url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQuqLkZR-iatfCH1DSqFzZ9WBuvoNp-xlbgJzQZxmepEHKCNaBCckPpn1GfBUoiJ9pIq0Ud_DGUNlrdgBn3NWrQ3cSvMa2G56G0QkHDSPi4E90m1ArBvp2hsg",
                altText: "Image 7"
            },
            {
                url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQY02UoLnZ0eDc2oh9cP4KCm4IPlQHK39iKDAkOWth5yVjVApoH4N-XAWMixiJ8MooBwUc9h0_xi46fSrXc3HJ_m-CNzJGQZEn6nKtmk4my4AgIhKEl_RAW",
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
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRHwBBYlyMe_-ufWV8on3-PlZ0YVmKZ1w7w&s",
                altText: "Image 9"
            },
            {
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRHwBBYlyMe_-ufWV8on3-PlZ0YVmKZ1w7w&s",
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
    },
     {
    name: "Women's Blouse",
    description: "Elegant chiffon blouse with ruffle sleeves, perfect for casual or office wear.",
    price: 39.99,
    discountedPrice: 29.99,
    countInStock: 85,
    category: "Top Wear",
    brand: "FemmeChic",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Peach", "White", "Navy"],
    collections: ["Spring Collection", "Office Wear"],
    material: "Chiffon",
    gender: "Women",
    images: [
      {
        url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12140734/2020/11/18/9e9f1a80-2f4f-4278-aa7a-ae7e9d2a27c01605694778920-Roadster-Women-Shirts-5851605694777221-1.jpg",
        altText: "Image 1"
      },
      {
        url: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12140734/2020/11/18/1c5d8b4b-7b8e-4a6f-9ad5-a68d8f3e15b31605694778899-Roadster-Women-Shirts-5851605694777221-2.jpg",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.3,
    numReviews: 70,
    tags: ["blouse", "top", "women"],
    dimensions: { length: 12, width: 8, height: 1 },
    weight: 0.3,
    sku: "FC1002"
  },
  // Women's Bottom Wear
  {
    name: "Pleated Midi Skirt",
    description: "Graceful pleated skirt with a comfortable elastic waistband.",
    price: 44.99,
    discountedPrice: 34.99,
    countInStock: 60,
    category: "Bottom Wear",
    brand: "FemmeChic",
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Black", "Emerald"],
    collections: ["Spring Collection"],
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://img.ltwebstatic.com/images3_pi/2022/10/17/1665990233a6ec6764b86b5e9c8e6e2a5b6f2c6c96_thumbnail_900x.webp",
        altText: "Image 1"
      },
      {
        url: "https://img.ltwebstatic.com/images3_pi/2022/10/17/166599023399a6d5b73d3d0c9b4e4e8fae6b8ebae3_thumbnail_900x.webp",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 34,
    tags: ["skirt", "pleated", "women"],
    dimensions: { length: 32, width: 12, height: 1 },
    weight: 0.4,
    sku: "FC2001"
  },
  // Women's Footwear
  {
    name: "Beige Heeled Sandals",
    description: "Comfortable heeled sandals for everyday or party wear.",
    price: 59.99,
    discountedPrice: 45.99,
    countInStock: 40,
    category: "Footwear",
    brand: "StepUp",
    sizes: ["5", "6", "7", "8"],
    colors: ["Beige"],
    collections: ["Summer Collection"],
    material: "Synthetic",
    gender: "Women",
    images: [
      {
        url: "https://imagescdn.simons.ca/images/10552/fc/fc9397e5a4c7f3c62e3e5a2e3f7a7a0d9314.jpg",
        altText: "Image 1"
      },
      {
        url: "https://imagescdn.simons.ca/images/10552/fc/fc9397e5a4c7f3c62e3e5a2e3f7a7a0d9315.jpg",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.2,
    numReviews: 25,
    tags: ["sandals", "heeled", "women"],
    dimensions: { length: 10, width: 5, height: 4 },
    weight: 0.7,
    sku: "SU3001"
  },
  // Women's Accessories
  {
    name: "Silk Scarf",
    description: "Elegant silk scarf with floral patterns.",
    price: 24.99,
    discountedPrice: 18.99,
    countInStock: 120,
    category: "Accessories",
    brand: "Scarves&More",
    sizes: ["One Size"],
    colors: ["Red", "Blue"],
    collections: ["Spring Collection"],
    material: "Silk",
    gender: "Women",
    images: [
      {
        url: "https://www.simplyscarvesandaccessories.co.uk/images/floral-silk-scarf-pink-p1820-2764_image.jpg",
        altText: "Image 1"
      },
      {
        url: "https://www.simplyscarvesandaccessories.co.uk/images/floral-silk-scarf-blue-p1819-2762_image.jpg",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 98,
    tags: ["scarf", "accessories", "women"],
    dimensions: { length: 20, width: 20, height: 1 },
    weight: 0.1,
    sku: "SM4001"
  },
  // Unisex Top Wear
  {
    name: "Unisex Graphic Hoodie",
    description: "Trendy oversized hoodie with graphic design for all genders.",
    price: 54.99,
    discountedPrice: 39.99,
    countInStock: 140,
    category: "Top Wear",
    brand: "UrbanVibe",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    collections: ["Street Style", "Winter Collection"],
    material: "Fleece",
    gender: "Unisex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
        altText: "Image 1"
      },
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.5,
    numReviews: 120,
    tags: ["hoodie", "graphic", "unisex"],
    dimensions: { length: 14, width: 10, height: 2 },
    weight: 0.6,
    sku: "UVH5002"
  },
  // Unisex Bottom Wear
  {
    name: "Drawstring Joggers",
    description: "Comfortable joggers with adjustable drawstring for men and women.",
    price: 39.99,
    discountedPrice: 29.99,
    countInStock: 95,
    category: "Bottom Wear",
    brand: "ActivePro",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Black"],
    collections: ["Sportswear", "Essentials"],
    material: "Polyester",
    gender: "Unisex",
    images: [
      {
        url: "https://americantall.com/cdn/shop/files/American-Tall-Women-Basics-Athletic-Jogger-Black-front.jpg?v=1706735469",
        altText: "Image 1"
      },
      {
        url: "https://assets.ajio.com/medias/sys_master/root/20221015/19O0/634a5eaeaeb269659c47008e/-473Wx593H-469241049-jetblack-MODEL.jpg",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.2,
    numReviews: 38,
    tags: ["pants", "joggers", "unisex"],
    dimensions: { length: 39, width: 11, height: 2 },
    weight: 0.5,
    sku: "APJ1234U"
  },
  // Unisex Footwear
  {
    name: "Classic Canvas Sneakers",
    description: "Retro-style canvas sneakers suitable for everyone.",
    price: 34.99,
    discountedPrice: 24.99,
    countInStock: 70,
    category: "Footwear",
    brand: "StreetStep",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White", "Navy", "Red"],
    collections: ["Essentials", "Street Style"],
    material: "Canvas",
    gender: "Unisex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
        altText: "Image 1"
      },
      {
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 75,
    tags: ["sneakers", "canvas", "unisex"],
    dimensions: { length: 11, width: 4, height: 4 },
    weight: 0.7,
    sku: "STS6001"
  },
  // Unisex Accessories
  {
    name: "Classic Beanie",
    description: "Warm, knitted beanie for cold weather, fits all.",
    price: 15.99,
    discountedPrice: 10.99,
    countInStock: 200,
    category: "Accessories",
    brand: "CozyHead",
    sizes: ["One Size"],
    colors: ["Black", "Grey", "Red"],
    collections: ["Winter Collection"],
    material: "Wool Blend",
    gender: "Unisex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
        altText: "Image 1"
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
        altText: "Image 2"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.3,
    numReviews: 180,
    tags: ["beanie", "winter", "unisex"],
    dimensions: { length: 7, width: 7, height: 3 },
    weight: 0.2,
    sku: "CH7001"
  },
  // Men's Accessories
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses for a stylish look.",
    price: 49.99,
    discountedPrice: 39.99,
    countInStock: 100,
    category: "Accessories",
    brand: "SunShades",
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    collections: ["Summer Collection"],
    material: "Metal",
    gender: "Men",
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/0087/1339/0420/products/vintage-aviator-sunglasses-men-polarized-women-brand-designer-metal-sun-glasses-for-men-driving-uv400-male-shades-1_1024x1024.jpg?v=1618576252",
        altText: "Image 1"
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0087/1339/0420/products/vintage-aviator-sunglasses-men-polarized-women-brand-designer-metal-sun-glasses-for-men-driving-uv400-male-shades-2_1024x1024.jpg?v=1618576252",
        altText: "Image 2"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.4,
    numReviews: 75,
    tags: ["sunglasses", "aviator", "men"],
    dimensions: { length: 6, width: 2, height: 2 },
    weight: 0.15,
    sku: "SS5001"
  }
];

module.exports = products;