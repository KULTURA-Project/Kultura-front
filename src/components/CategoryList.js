import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <ul>
            {categories.map(category => (
                <li key={category.id}>{category.name}</li>
            ))}
        </ul>
    );
}

export default CategoryList;
