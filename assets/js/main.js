import axios from "axios";

const categoriesContainer = document.querySelector(".categories");

const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/category-list");
    return response.data;
}

const displayCategories = async () => {
    const categories = await getCategories();
    const result = categories.map(category => {
        return `<a href="category.html?category=${category}" class="category min-w-35 text-center bg-white text-primary-4 border border-primary-2 px-2 md:px-5 py-3 rounded-xl
        text-sm md:text-lg lg:text-xl shadow-sm cursor-pointer hover:bg-primary-3 hover:text-white hover:border-primary-3 hover:-translate-y-1 hover:shadow-md transition-all duration-500">
            ${category}
        </a>`;
    }).join("");
    categoriesContainer.innerHTML = result;
}

displayCategories();
