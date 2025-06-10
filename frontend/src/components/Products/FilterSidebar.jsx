import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function FilterSidebar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category:"",
        gender:"",
        color:[],
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice: 100,
    });
    const [priceRange, setPriceRange] = useState([0, 100]);
    const categories = ["Top Wear","Bottom Wear"];
    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navty",
    ];
    const sizes = ["XS", "S", "M","L","XL","XXL"];
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
        "UrbanVibe"
    ];
    const gender = ["Men","Women","Unisex"];
    const material = ["Cotton","Wool","Denim","Silk","Polyester","Linen","Viscose","Fleece"];
    
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        });
        setPriceRange([0 ,params.maxPrice || 100]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox" || (name === "color" && e.type === "click")) {
            const isSelected = (newFilters[name] || []).includes(value);
            if (checked || !isSelected) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else if (name === "priceRange") {
            const max = Number(value);
            newFilters.minPrice = 0;
            newFilters.maxPrice = max;
            setPriceRange([0, max]);
        } else {
            newFilters[name] = value;
        }

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if(Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            }else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    // Clear handlers for each filter group
    const clearCategory = () => {
        const newFilters = { ...filters, category: "" };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearGender = () => {
        const newFilters = { ...filters, gender: "" };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearColor = () => {
        const newFilters = { ...filters, color: [] };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearSize = () => {
        const newFilters = { ...filters, size: [] };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearMaterial = () => {
        const newFilters = { ...filters, material: [] };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearBrand = () => {
        const newFilters = { ...filters, brand: [] };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };
    const clearPrice = () => {
        const newFilters = { ...filters, minPrice: 0, maxPrice: 100 };
        setFilters(newFilters);
        setPriceRange([0,100]);
        updateURLParams(newFilters);
    };

    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-500 mb-4'>Filter</h3>
            {/* Category Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Category</label>
                    {filters.category && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearCategory}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {categories.map((category) => (
                    <div key={category} className='flex items-center mb-1'>
                        <input 
                            type="radio" 
                            name='category' 
                            value={category}
                            onChange={handleFilterChange} 
                            checked ={filters.category === category}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}
            </div>
            {/* Gender Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Gender</label>
                    {filters.gender && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearGender}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {gender.map((genderItem) => (
                    <div key={genderItem} className='flex items-center mb-1'>
                        <input 
                            type="radio" 
                            name='gender'
                            value={genderItem}
                            onChange={handleFilterChange} 
                            checked ={filters.gender === genderItem} 
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className='text-gray-700'>{genderItem}</span>
                    </div>
                ))}
            </div>
            {/* Color Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='bloc text-gray-500 font-medium mb-2'>Color</label>
                    {filters.color.length > 0 && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearColor}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color) => (
                        <button
                            key={color}
                            name="color"
                            value={color}
                            type="button"
                            onClick={() => {
                                // Simulate event for click (for color selection)
                                handleFilterChange({
                                    target: {
                                        name: "color",
                                        value: color,
                                        type: "button",
                                        // Simulate checked for toggle
                                        checked: !filters.color.includes(color)
                                    },
                                    type: "click"
                                });
                            }}
                            className={`w-7 h-7 rounded-full border cursor-pointer transition hover:scale-105 ${
                                filters.color.includes(color) ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}/>
                    ))}
                </div>
            </div>
            {/* Size Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Size</label>
                    {filters.size.length > 0 && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearSize}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {sizes.map((size) => (
                    <div key={size} className='flex items-center mb-1'>
                        <input 
                            type="checkbox" 
                            name='size' 
                            value={size}
                            onChange={handleFilterChange} 
                            checked={filters.size.includes(size)}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className='text-gray-700'>{size}</span>
                    </div>
                ))}
            </div>
            {/* Material Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Material</label>
                    {filters.material.length > 0 && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearMaterial}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {material.map((materialItem) => (
                    <div key={materialItem} className='flex items-center mb-1'>
                        <input 
                            type="checkbox" 
                            name='material' 
                            value={materialItem}
                            onChange={handleFilterChange} 
                            checked={filters.material.includes(materialItem)}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className='text-gray-700'>{materialItem}</span>
                    </div>
                ))}
            </div>
            
            {/* Brand Filter */}
            <div className='mb-6'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Brand</label>
                    {filters.brand.length > 0 && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearBrand}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {brands.map((brand) => (
                    <div key={brand} className='flex items-center mb-1'>
                        <input 
                            type="checkbox" 
                            name='brand'
                            value={brand}
                            onChange={handleFilterChange}  
                            checked={filters.brand.includes(brand)}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className='text-gray-700'>{brand}</span>
                    </div>
                ))}
            </div>
             {/* Price Range Filter */}
            <div className='mb-8'>
                <div className="flex justify-between items-center">
                    <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Price Range</label>
                    {(filters.minPrice !== 0 || filters.maxPrice !== 100) && (
                        <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={clearPrice}
                            type="button"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <input 
                    type="range" 
                    name="priceRange"
                    min={0}
                    max={100}
                    value={priceRange[1]}
                    onChange={handleFilterChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"/>

                <div className='flex justify-between text-gray-600 mt-2'>
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar;