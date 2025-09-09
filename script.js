
const showSpinner = () => document.getElementById("spinner").classList.remove("hidden");
const hideSpinner = () => document.getElementById("spinner").classList.add("hidden");

let totalCost = 0;

const addchart = (item) => {
    const cartContainer = document.getElementById("cart");
    const cartitem = document.createElement('div');
    cartitem.innerHTML = `
      <div class="bg-[#F0FDF4] h-[60px] flex flex-row justify-between mb-2">
        <div class="flex flex-col">
            <p class="font-bold">${item.name}</p>
            <p class="font-light">ট ${item.price} X 1</p>
        </div>
        <div class="flex items-center">
            <button class="cross h-[30px] w-[30px] bg-[#15803D] text-white px-2 rounded-4xl hover:bg-red-700">X</button>
        </div>
      </div>
    `;

    totalCost += item.price;
    document.getElementById("tk").innerText = totalCost;
    cartContainer.appendChild(cartitem);

    const crs = cartitem.querySelector(".cross");
    crs.onclick = () => {
        totalCost -= item.price;
        document.getElementById("tk").innerText = totalCost;
        cartContainer.removeChild(cartitem);
        const alertBox = document.createElement("div");
        alertBox.setAttribute("role", "alert");
        alertBox.className = "fixed top-5 right-5 bg-white border border-red-400 text-red-500 px-4 py-3 rounded flex items-center gap-2 shadow-lg z-50";
        alertBox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="font-bold"> "${item.name}" has been removed from cart!</span>
        `;
        document.body.appendChild(alertBox);
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 1000);
    };

    const alertBox = document.createElement("div");
    alertBox.setAttribute("role", "alert");
    alertBox.className = "fixed top-5 right-5 bg-white border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2 shadow-lg z-50";
    alertBox.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-bold"> "${item.name}" has been added to cart!</span>
    `;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 1000);
};

fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displaycategory(data.categories));

const displaycati = () => {
    Array.from(categoryContainer.children).forEach(child => {
        console.log(child.children[0]);
        child.children[0].classList.remove("active");
    });
     document.getElementById("alltree").children[0].classList.add("active");
     
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/categories`)
        .then(res => res.json())
        .then(data => {
            baxo = document.getElementById("catcenter");
            baxo.innerHTML = "";
            data.categories.forEach(category => {
                listclikedall(category.id);
            });
            hideSpinner();
        }).catch(() => hideSpinner());
};

const displaycategory = (categories) => {
    categoryContainer = document.getElementById("list");
    document.getElementById("alltree").children[0].classList.add("active");
    displaycati();

    document.getElementById("alltree").addEventListener("click", () => {
        displaycati();
    });

    categories.forEach(category => {
        let box = document.createElement('div');
        box.innerHTML = `
            <div class="py-2 pl-2 mb-2 hover:cursor-pointer hover:font-bold md:hover:border-2  border-2 border-[#15803D] rounded-2xl md:border-0 m-2 md:my-1 duration-300">
                <p class="">${category.category_name}</p>
            </div>
        `;
        categoryContainer.append(box);
        box.addEventListener("click", () => {
            Array.from(categoryContainer.children).forEach(child => {
                console.log(child.children[0])
                child.children[0].classList.remove("active");
            });
            box.children[0].classList.add("active");
            listcliked(category.id);
        });
    });
};

const listclikedall = (id) => {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displaycatitemsall(data.plants);
            hideSpinner();
        })
        .catch(() => hideSpinner());
};

const listcliked = (id) => {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displaycatitems(data.plants);
            hideSpinner();
        })
        .catch(() => hideSpinner());
};

const displaycatitems = (data) => {
    const baxo = document.getElementById("catcenter");
    baxo.innerHTML = "";
    data.forEach(item => {
        let dibba = document.createElement('div');
        dibba.innerHTML = `
          <div class="h-[350px] bg-white p-2 flex flex-col hover:shadow-lg hover:scale-[1.05] duration-300">
             <img class="h-[50%] w-full rounded-2xl"src=${item.image} alt="">
             <p class="font-bold hover:text-green-700 hover:font-extrabold hover:cursor-pointer">${item.name}</p>
             <div class="h-auto"><p class="overflow-ellipsis text-[10px] font-light line-clamp-2">${item.description}</p></div>
             <div class="flex justify-between">
             <button class="mt-2 bg-[#DCFCE7] text-[#15803D] px-2 text-[10px] rounded-3xl">${item.category}</button>
             <p class="font-bold mt-2">ট ${item.price}</p>
              </div>
             <button class="btn btn-ghost text-sm rounded-4xl bg-[#15803D] hover:bg-[#FACC15] hover:text-black text-white my-3">Get Involved</button>
          </div>
        `;
        baxo.append(dibba);

        const modalClick = dibba.children[0].children[1];
        modalClick.addEventListener("click", () => {
            const my_modal_2 = document.getElementById("my_modal_2");
            my_modal_2.children[0].children[1].innerText = item.name;
            my_modal_2.children[0].children[0].src = item.image;
            my_modal_2.children[0].children[2].innerText = item.description;
            my_modal_2.children[0].children[3].children[0].innerText = item.category;
            my_modal_2.children[0].children[3].children[1].innerText = `ট ${item.price}`;
            const elm = my_modal_2.children[0].children[4];
            elm.onclick = () => addchart(item);
            my_modal_2.showModal();
        });

        dibba.children[0].children[4].addEventListener("click", () => {
            addchart(item);
        });
    });
};

const displaycatitemsall = (data) => {
    const baxo = document.getElementById("catcenter");
    data.forEach(item => {
        let dibba = document.createElement('div');
        dibba.innerHTML = `
          <div class="h-[350px] bg-white p-2 flex flex-col hover:shadow-lg hover:scale-[1.05] duration-300">
             <img class="h-[50%] w-full rounded-2xl"src=${item.image} alt="">
             <p class="font-bold hover:text-green-700 hover:font-extrabold hover:cursor-pointer">${item.name}</p>
             <div class="h-auto"><p class="overflow-ellipsis text-[10px] font-light line-clamp-2">${item.description}</p></div>
             <div class="flex justify-between">
             <button class="mt-2 bg-[#DCFCE7] text-[#15803D] px-2 text-[10px] rounded-3xl">${item.category}</button>
             <p class="font-bold mt-2">ট ${item.price}</p>
              </div>
             <button class="btn btn-ghost text-sm rounded-4xl bg-[#15803D] hover:bg-[#FACC15] hover:text-black text-white my-3">Add to Cart</button>
          </div>
        `;
        baxo.append(dibba);

        const modalClick = dibba.children[0].children[1];
        modalClick.addEventListener("click", () => {
            const my_modal_2 = document.getElementById("my_modal_2");
            my_modal_2.children[0].children[1].innerText = item.name;
            my_modal_2.children[0].children[0].src = item.image;
            my_modal_2.children[0].children[2].innerText = item.description;
            my_modal_2.children[0].children[3].children[0].innerText = item.category;
            my_modal_2.children[0].children[3].children[1].innerText = `ট ${item.price}`;
            const elm = my_modal_2.children[0].children[4];
            elm.onclick = () => addchart(item);
            my_modal_2.showModal();
        });

        dibba.children[0].children[4].addEventListener("click", () => {
            addchart(item);
        });
    });
};
