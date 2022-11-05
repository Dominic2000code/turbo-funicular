import { data } from "./data.js";

const categoriesContainer = document.querySelector(".categories");
const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
// console.log(searchInput);

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="lg:w-1/3 sm:w-1/2 p-4">
                <div class="flex relative">
                  <img
                    loading="lazy"
                    alt="gallery"
                    class="absolute inset-0 w-full h-full object-cover object-center"
                    src=${product.img}
                  />
                  <div
                    class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100"
                  >
                    <h2
                      class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1"
                    >
                      ${product.category}
                    </h2>
                    <h1
                      class="title-font text-lg font-medium text-gray-900 mb-3"
                    >
                      ${product.name}
                    </h1>
                    <p class="leading-relaxed">
                      You can reach out to any of our socials and order some of our fine products.
                    </p>
                  </div>
                </div>
              </div>
    `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (event) => {
  const value = event.target.value.toLowerCase();
  //   console.log(value);

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCategories = data.map((item) => item.category);
  const uniqueCategories = new Set(allCategories);
  const finalCategories = ["All", ...uniqueCategories];
  //   console.log(finalCategories);

  categoriesContainer.innerHTML = finalCategories.map(
    (category) => `
        <option>${category}</option>
    `
  );
  categoriesContainer.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    selectedCategory === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((item) => item.category === selectedCategory)
        );
  });
};

setCategories();
