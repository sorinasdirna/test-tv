fetch('db.json').then(function (response) {
    return response.json();
}).then(function (data) {
    //insert all data into dom 
    appendData(data, "sliderHd", "hd");
    appendData(data, "sliderNews", "news");

    // initiate slider 
    $('.slider-channel').slick({
        slidesToShow: 10,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6
            }
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 3
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
            }
        ]
    });
}).catch(function (err) {
    console.log('error: ' + err);
});

// filter dropdown
let channelSelect = document.getElementById('channelSelect');
channelSelect.addEventListener("change", function(e) {
    let category = channelSelect.value;
    document.querySelectorAll(".slider-container").forEach(x=>x.classList.add('hidden'))
    if(category === 'hd'){
        document.querySelector(".slider-container-hd").classList.remove("hidden");
    } else if(category === 'news') {
        document.querySelector(".slider-container-news").classList.remove("hidden");
    } else {
        document.querySelectorAll(".slider-container").forEach(x=>x.classList.remove('hidden'));
    }
});

function appendData(dbItems, container, category) {
    let mainContainer = document.getElementById(container);
    // filter category
    let data = dbItems.filter((item) => {
        return item.category == category;
    }); 
    for (let i = 0; i < data.length; i++) {
      let div = document.createElement("div");
      div.className = "slider-item";
      div.innerHTML = `
          <div class="slider-item-inner bg-light p-2">
            <img src="${data[i].image}" alt="${data[i].name}" class="mb-2"/>
            <p class="m-0"><small>${data[i].name}</small></p>
          </div>
      `;
      mainContainer.appendChild(div);
    }
}

$('.slider-hbo').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    responsive: [
        {
        breakpoint: 1200,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 800,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
    ]
});

let blueWidget = document.getElementById('blueWidget');
let blueWidgetClose = document.getElementById('blueWidgetClose');
blueWidget.addEventListener("click", function () {
    this.classList.add('js--active');
}, false);
blueWidgetClose.addEventListener("click", function (ev) {
    ev.stopPropagation(); 
    this.parentNode.classList.remove('js--active');   
}, false);


for (var item of document.querySelectorAll(".accordion-item:not(:nth-child(n+6))")) {
    item.classList.remove('hidden');
}
document.getElementById('faqMore').addEventListener('click', function (event) {
    for(var item of document.querySelectorAll(".accordion-item")) {
        item.classList.remove('hidden');
    }
    this.classList.add("hidden");
    document.querySelector('.container-faq').classList.add('js--expanded');
});