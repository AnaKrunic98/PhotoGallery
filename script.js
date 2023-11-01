const currentPhotoElement = document.querySelector('#currentPhoto')
const currentCaptionElement = document.querySelector('#photoCaption')
const photosDiv = document.querySelector('.photos')
const navDiv = document.querySelector('.nav')

const photos = [
    {
        src: './img/animal1.jpg',
        caption:"Tiger",
        category:"Animal",
    },
    {
        src:'./img/animal2.jpg',
        caption:"Koala",
        category:"Animal",
    },
    {
        src:'./img/nature1.jpg',
        caption:"Tree",
        category:"Nature",
    },
    {
        src:'./img/nature2.jpg',
        caption:"River",
        category:"Nature",
    },
    {
        src:'./img/cookie1.jpg',
        caption:"Cookie with chocolate",
        category:"Sweets",
    },
    {
        src:'./img/cookie2.jpg',
        caption:"Colorful cakes",
        category:"Sweets",
    },
]

let photosToRender = photos             
const categories = []

// photos.forEach(photo => {
//     if (!categories.includes(photo.category)) {
//         categories.push(photo.category);
//     }
// });

for (let photo of photos) {
    if (!categories.includes(photo.category)) {
        categories.push(photo.category);
    }
}

function renderCategoriesAndInput () {
    const createInput = document.createElement("input")
    createInput.setAttribute('placeholder', 'Search category...')

    navDiv.appendChild(createInput)

    // categories.forEach(category => {
    //     const categoryBtn = `<button onclick=filterCategory(event) id="btn-category" data-category="${category}">${category}</button>`
    //     navDiv.innerHTML += categoryBtn
    // })
    
    for (let category of categories) {
        const categoryBtn = `<button class="ctg-btn" onclick=activeCategoryButton("${category}") id="${category}">${category}</button>`
        navDiv.innerHTML += categoryBtn
    } 
}
renderCategoriesAndInput()

let targetCategory = ""
let previousCategory = ""
function activeCategoryButton(category) {
    const targetButtonCategory = document.getElementById(category)

    removePreviousCategory ()
    if (targetCategory === category){
        targetCategory = ""
        targetButtonCategory.classList.remove('button-active')
    }else{
        targetCategory = category
        previousCategory = targetCategory
    }

    filterCategory(targetCategory) 
}

function filterCategory(targetCategory) {
    photosDiv.innerHTML = ""
    
    photosToRender = photos.filter(photo => {
        return photo.category.includes(targetCategory)
    }) 

    const targetButtonCategory = document.getElementById(photosToRender[0].category)
    targetButtonCategory.classList.add('button-active')

    if(photosToRender.length === photos.length){
        removePreviousCategory() 
    }

    updateCurrentPhotoAndGallery()
    }



function updateCurrentPhotoAndGallery() {
    currentPhotoElement.src = photosToRender[0].src
    currentCaptionElement.innerHTML = photosToRender[0].caption

    photosToRender.forEach(photo => {
        const imgEl = `<img src="${photo.src}" onclick=changePhoto(event) data-caption="${photo.caption}">`
        photosDiv.innerHTML += imgEl
    })
}
updateCurrentPhotoAndGallery()

let previousActivePhoto                             
function changePhoto (e) {
    const targetPhoto = e.target
    const targetCaption = targetPhoto.dataset.caption

    if (previousActivePhoto){
        previousActivePhoto.classList.remove('active-img')
    }
    previousActivePhoto = targetPhoto

    currentCaptionElement.innerHTML = targetCaption
    currentPhotoElement.src = targetPhoto.src

    targetPhoto.classList.add('active-img')
}

const inputElement = document.querySelector("input")

inputElement.addEventListener("input", (e) => {
    removePreviousCategory ()

    let inputValue = e.target.value
    const inputCapitalizeFirstLetter = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    filterCategory(inputCapitalizeFirstLetter)
})

function removePreviousCategory () {
    if (previousCategory){
        const ctgBtn = document.querySelectorAll(".ctg-btn")
        ctgBtn.forEach(btn => btn.classList.remove('button-active'))
    }
}