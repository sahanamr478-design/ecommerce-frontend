const products = [
    {
        id: 1,
        name: "Stylish Sunglasses",
        price: 3000.00,
        category: "Accessories",
        rating: 4.5,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=450&q=80",
        description: "Protect your eyes with style."
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 1500.00,
        oldPrice: 1800.00,
        category: "Clothing",
        rating: 5.0,
        reviews: 5,
        image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=800&q=80",
        description: "Classic denim jacket for any occasion.",
        isOnSale: true
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 2000.00,
        oldPrice: 4000.00,
        category: "Electronics",
        rating: 4.0,
        reviews: 8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=450&q=80",
        description: "High quality sound without wires.",
        isOnSale: true
    },
    {
        id: 4,
        name: "Cotton T-Shirt",
        price: 3000.00,
        category: "Clothing",
        rating: 4.8,
        reviews: 20,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=450&q=80",
        description: "Soft and breathable cotton t-shirt.",
        isPopular: true
    },
    {
        id: 5,
        name: "Leather Wallet",
        price: 2000.00,
        oldPrice: 4000.00,
        category: "Accessories",
        rating: 3.5,
        reviews: 2,
        image: "https://i.etsystatic.com/16697722/r/il/2ac14d/1480315264/il_fullxfull.1480315264_4yws.jpg",
        description: "Genuine leather wallet with multiple card slots.",
        isOnSale: true
    },
    {
        id: 6,
        name: "Smart Watch",
        price: 10000.00,
        category: "Electronics",
        rating: 4.9,
        reviews: 15,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=450&q=80",
        description: "Track your fitness and stay connected."
    },
    {
        id: 7,
        name: "Silk Scarf",
        price: 1500.00,
        oldPrice: 1800.00,
        category: "Clothing",
        rating: 4.2,
        reviews: 7,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=450&q=80",
        description: "Elegant silk scarf to complete your look.",
        isOnSale: true
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 3500.00,
        category: "Electronics",
        rating: 4.6,
        reviews: 18,
        image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=450&q=80",
        description: "Portable speaker with powerful bass.",
        isPopular: true
    },
    {
        id: 9,
        name: "Modern Lamp",
        price: 1200.00,
        category: "Home",
        rating: 4.3,
        reviews: 10,
        image: "https://th.bing.com/th/id/OIP.93ln8T3vUFP_hgOfxlK4PQHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        description: "Light up your room with style."
    },
    {
        id: 10,
        name: "Running Shoes",
        price: 4500.00,
        category: "Sports",
        rating: 4.7,
        reviews: 25,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=450&q=80",
        description: "Run faster and longer with comfort."
    },
    {
        id: 11,
        name: "Lipstick Set",
        price: 999.00,
        category: "Beauty",
        rating: 4.5,
        reviews: 30,
        image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=450&q=80",
        description: "Vibrant colors for a vibrant you."
    },
    {
        id: 12,
        name: "Yoga Mat",
        price: 800.00,
        category: "Sports",
        rating: 4.2,
        reviews: 14,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=450&q=80",
        description: "Non-slip mat for your daily yoga session."
    },
    {
        id: 13,
        name: "Digital Camera",
        price: 45000.00,
        category: "Electronics",
        rating: 4.8,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=450&q=80",
        description: "Capture life's moments in high resolution."
    },
    {
        id: 14,
        name: "Skin Care Set",
        price: 2500.00,
        category: "Beauty",
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=450&q=80",
        description: "Complete set for glowing skin.",
        isOnSale: true,
        oldPrice: 3500.00
    },
    {
        id: 15,
        name: "Dumbbells Pair",
        price: 3000.00,
        category: "Sports",
        rating: 4.5,
        reviews: 33,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=450&q=80",
        description: "Adjustable weights for home workouts."
    },
    {
        id: 16,
        name: "Espresso Maker",
        price: 12000.00,
        category: "Home",
        rating: 4.6,
        reviews: 55,
        image: "https://th.bing.com/th/id/OIP.taN4dhkdd4nf8Lhy3ci-VgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        description: "Barista-quality coffee at home."
    },
    {
        id: 17,
        name: "Gaming Mouse",
        price: 2500.00,
        category: "Electronics",
        rating: 4.4,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=450&q=80",
        description: "Precision control for gamers.",
        isPopular: true
    },
    {
        id: 18,
        name: "Floral Dress",
        price: 2200.00,
        category: "Clothing",
        rating: 4.3,
        reviews: 28,
        image: "https://th.bing.com/th/id/OIP.s0u3W3dFiKVKT2xSinytuQHaNI?w=187&h=332&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        description: "Beautiful floral pattern for summer."
    },
    {
        id: 19,
        name: "Gold Necklace",
        price: 15000.00,
        category: "Accessories",
        rating: 4.9,
        reviews: 8,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=450&q=80",
        description: "Elegant 18k gold plated necklace."
    },
    {
        id: 20,
        name: "Plant Pot",
        price: 500.00,
        category: "Home",
        rating: 4.1,
        reviews: 19,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=450&q=80",
        description: "Minimalist ceramic pot for indoor plants."
    },
    {
        id: 21,
        name: "Tennis Racket",
        price: 5500.00,
        category: "Sports",
        rating: 4.7,
        reviews: 15,
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=450&q=80",
        description: "Professional grade racket for best performance."
    },
    {
        id: 22,
        name: "Perfume",
        price: 3500.00,
        category: "Beauty",
        rating: 4.6,
        reviews: 60,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=450&q=80",
        description: "Long-lasting floral fragrance.",
        isOnSale: true,
        oldPrice: 4500.00
    },
    {
        id: 23,
        name: "Throw Pillow",
        price: 800.00,
        category: "Home",
        rating: 4.2,
        reviews: 25,
        image: "https://th.bing.com/th/id/OIP.CJfHAIREWAW_d7H6jlH7MwHaHa?w=155&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3",
        description: "Soft decorative pillow for your sofa."
    },
    {
        id: 24,
        name: "Laptop Backpack",
        price: 2800.00,
        category: "Accessories",
        rating: 4.5,
        reviews: 90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=450&q=80",
        description: "Water-resistant backpack with laptop compartment."
    },
    {
        id: 25,
        name: "Hoodie",
        price: 1800.00,
        category: "Clothing",
        rating: 4.4,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=450&q=80",
        description: "Cozy fleece hoodie for winter.",
        isPopular: true
    },
    {
        id: 26,
        name: "Hair Dryer",
        price: 1800.00,
        category: "Beauty",
        rating: 4.3,
        reviews: 35,
        image: "https://th.bing.com/th/id/OIP.X6fJYskjXY4QhqTnV7GHvAHaHa?w=170&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        description: "Fast drying with ionic technology."
    },
    {
        id: 27,
        name: "Wall Clock",
        price: 1200.00,
        category: "Home",
        rating: 4.0,
        reviews: 12,
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=450&q=80",
        description: "Vintage style wall clock."
    }
];

