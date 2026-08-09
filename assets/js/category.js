import axios from "axios";
import ratingIcon from "../img/rating.svg";

const params = new URLSearchParams(location.search);
const category = params.get("category");
const categoryTitle = document.querySelector(".category-title");
const productsContainer = document.querySelector(".category-products");
categoryTitle.textContent = category;

const getCategoryProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products;
}

const displayCategoryProducts = async () => {
    const products = await getCategoryProducts();
    const result = products.map(product => {
        return ` <a href="details.html?id=${product.id}" class="product bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1
            transition-all duration-500">
                <div class="bg-primary-2 p-5">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="p-5">
                    <h2 class="text-lg font-bold text-dark">
                        ${product.title}
                    </h2>
                    <div class="flex items-center justify-between mt-4">
                        <span class="text-primary-3 text-lg font-bold">
                            $${product.price}
                        </span>
                        <div class="flex items-center gap-1">
                            <img src="${ratingIcon}" alt="Star Rating">
                            <span class="text-dark">
                                ${product.rating}
                            </span>
                        </div>
                    </div>
                </div>
            </a>`;
    }).join("");

    productsContainer.innerHTML = result;
}

displayCategoryProducts();