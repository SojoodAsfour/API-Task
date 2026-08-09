import axios from "axios";
import Swiper from "swiper";
import ratingIcon from "../img/rating.svg";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const productDetailsContainer = document.querySelector(".product-details");
const params = new URLSearchParams(location.search);
const productId = params.get("id");


const getProductDetails = async () => {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    return response.data;
}


const displayProductDetails = async () => {
    const product = await getProductDetails();
    const images = product.images.map(image => {
        return `<div class="swiper-slide">
            <div class="bg-primary-1 rounded-3xl flex items-center justify-center">
                <img src="${image}" alt="${product.title}" class="object-contain">
            </div>
        </div>`;
    }).join("");

    const reviews = product.reviews.map(review => {

        return `<div class="border-b border-gray-200 py-4">
                <div class="flex items-center justify-between gap-3">
                    <h3 class="font-bold text-dark">${review.reviewerName}</h3>
                    <div class="flex items-center gap-2">
                        <img src="${ratingIcon}" alt="Star Rating">
                        <span class="font-bold">${review.rating}</span>
                    </div>
                </div>
                <p class="text-muted mt-2 leading-6">
                    ${review.comment}
                </p>
            </div>`;
    }).join("");


    const result = `<div class="bg-white rounded-4xl shadow-sm p-5 md:p-8">
            <div class = "flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div class="swiper productSwiper overflow-hidden w-full lg:w-1/2 order-1 lg:order-2">
                    <div class="swiper-wrapper">
                        ${images}
                    </div>
                    <div class="swiper-button-prev text-primary-3"></div>
                    <div class="swiper-button-next text-primary-3"></div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="w-full lg:w-1/2 lg:py-3 order-2 lg:order-1">
                    <span class="text-primary-3 font-bold text-lg capitalize">
                        ${product.category}
                    </span>
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mt-4">
                        ${product.title}
                    </h1>
                    <p class="text-muted text-base md:text-lg leading-8 mt-6">
                        ${product.description}
                    </p>
                    <div class="flex items-center gap-5 mt-7">
                        <span class="text-primary-3 text-2xl md:text-3xl font-bold">
                            $${product.price}
                        </span>

                        <div class="flex items-center gap-2">
                            <img src="${ratingIcon}" alt="Star Rating">
                            <span class="font-bold text-lg text-dark">
                                ${product.rating}
                            </span>
                        </div>

                    </div>

                    <div class="bg-primary-1 rounded-2xl p-5 mt-7">
                        <span class="font-bold text-dark">
                            Stock:
                        </span>

                        <span class="text-primary-3 font-bold ml-1">
                            ${product.stock}
                        </span>

                    </div>
                    <div class="mt-9">
                        <h2 class="text-2xl font-bold text-dark">
                            Reviews
                        </h2>
                        <div class="mt-3">
                            ${reviews}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    `;

    productDetailsContainer.innerHTML = result;


    new Swiper(".productSwiper", {

        modules: [Navigation, Pagination],

        slidesPerView: 1,

        spaceBetween: 20,
        loop: true,

        navigation: {

            nextEl: ".swiper-button-next",

            prevEl: ".swiper-button-prev",

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true,

        },

    });

}


displayProductDetails();