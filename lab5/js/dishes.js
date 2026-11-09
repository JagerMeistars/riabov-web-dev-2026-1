const dishes = [
    {
        "keyword": "gazpacho",
        "name": "Гаспачо",
        "price": 195,
        "category": "soup",
        "count": "350 г",
        "image": "images/menu/soups/gazpacho.jpg",
        "kind": "veg"
    },
    {
        "keyword": "mushroom-soup",
        "name": "Грибной суп-пюре",
        "price": 185,
        "category": "soup",
        "count": "330 г",
        "image": "images/menu/soups/mushroom_soup.jpg",
        "kind": "veg"
    },
    {
        "keyword": "norwegian-soup",
        "name": "Норвежский суп",
        "price": 270,
        "category": "soup",
        "count": "330 г",
        "image": "images/menu/soups/norwegian_soup.jpg",
        "kind": "fish"
    },
    {
        "keyword": "fried-potatoes",
        "name": "Жареная картошка с грибами",
        "price": 150,
        "category": "main",
        "count": "250 г",
        "image": "images/menu/main_course/friedpotatoeswithmushrooms1.jpg",
        "kind": "veg"
    },
    {
        "keyword": "lasagna",
        "name": "Лазанья",
        "price": 385,
        "category": "main",
        "count": "310 г",
        "image": "images/menu/main_course/lasagna.jpg",
        "kind": "meat"
    },
    {
        "keyword": "chicken-cutlets",
        "name": "Котлеты из курицы с картофельным пюре",
        "price": 225,
        "category": "main",
        "count": "280 г",
        "image": "images/menu/main_course/chickencutletsandmashedpotatoes.jpg",
        "kind": "meat"
    },
    {
        "keyword": "orange-juice",
        "name": "Апельсиновый сок",
        "price": 120,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/orangejuice.jpg",
        "kind": "cold"
    },
    {
        "keyword": "apple-juice",
        "name": "Яблочный сок",
        "price": 90,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/applejuice.jpg",
        "kind": "cold"
    },
    {
        "keyword": "carrot-juice",
        "name": "Морковный сок",
        "price": 110,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/carrotjuice.jpg",
        "kind": "cold"
    },
    {
        "keyword": "ramen",
        "name": "Рамен",
        "price": 375,
        "category": "soup",
        "count": "425 г",
        "image": "images/menu/soups/ramen.jpg",
        "kind": "meat"
    },
    {
        "keyword": "tom-yum",
        "name": "Том ям с креветками",
        "price": 650,
        "category": "soup",
        "count": "500 г",
        "image": "images/menu/soups/tomyum.jpg",
        "kind": "fish"
    },
    {
        "keyword": "chicken-soup",
        "name": "Куриный суп",
        "price": 330,
        "category": "soup",
        "count": "350 г",
        "image": "images/menu/soups/chicken.jpg",
        "kind": "meat"
    },
    {
        "keyword": "fish-rice",
        "name": "Рыбная котлета с рисом и спаржей",
        "price": 320,
        "category": "main",
        "count": "270 г",
        "image": "images/menu/main_course/fishrice.jpg",
        "kind": "fish"
    },
    {
        "keyword": "pizza",
        "name": "Пицца Маргарита",
        "price": 450,
        "category": "main",
        "count": "470 г",
        "image": "images/menu/main_course/pizza.jpg",
        "kind": "veg"
    },
    {
        "keyword": "shrimp-pasta",
        "name": "Паста с креветками",
        "price": 340,
        "category": "main",
        "count": "280 г",
        "image": "images/menu/main_course/shrimppasta.jpg",
        "kind": "fish"
    },
    {
        "keyword": "korean-salad",
        "name": "Корейский салат с овощами и яйцом",
        "price": 330,
        "category": "salad",
        "count": "250 г",
        "image": "images/menu/salads_starters/saladwithegg.jpg",
        "kind": "veg"
    },
    {
        "keyword": "caesar",
        "name": "Цезарь с цыпленком",
        "price": 370,
        "category": "salad",
        "count": "220 г",
        "image": "images/menu/salads_starters/caesar.jpg",
        "kind": "meat"
    },
    {
        "keyword": "caprese",
        "name": "Капрезе с моцареллой",
        "price": 350,
        "category": "salad",
        "count": "235 г",
        "image": "images/menu/salads_starters/caprese.jpg",
        "kind": "veg"
    },
    {
        "keyword": "tuna-salad",
        "name": "Салат с тунцом",
        "price": 480,
        "category": "salad",
        "count": "250 г",
        "image": "images/menu/salads_starters/tunasalad.jpg",
        "kind": "fish"
    },
    {
        "keyword": "fries-caesar",
        "name": "Картофель фри с соусом Цезарь",
        "price": 280,
        "category": "salad",
        "count": "235 г",
        "image": "images/menu/salads_starters/frenchfries2.jpg",
        "kind": "veg"
    },
    {
        "keyword": "fries-ketchup",
        "name": "Картофель фри с кетчупом",
        "price": 260,
        "category": "salad",
        "count": "235 г",
        "image": "images/menu/salads_starters/frenchfries1.jpg",
        "kind": "veg"
    },
    {
        "keyword": "cappuccino",
        "name": "Капучино",
        "price": 180,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/cappuccino.jpg",
        "kind": "hot"
    },
    {
        "keyword": "green-tea",
        "name": "Зеленый чай",
        "price": 100,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/greentea.jpg",
        "kind": "hot"
    },
    {
        "keyword": "black-tea",
        "name": "Черный чай",
        "price": 90,
        "category": "drink",
        "count": "300 мл",
        "image": "images/menu/beverages/tea.jpg",
        "kind": "hot"
    },
    {
        "keyword": "baklava",
        "name": "Пахлава",
        "price": 220,
        "category": "dessert",
        "count": "300 г",
        "image": "images/menu/desserts/baklava.jpg",
        "kind": "medium"
    },
    {
        "keyword": "cheesecake",
        "name": "Чизкейк",
        "price": 240,
        "category": "dessert",
        "count": "125 г",
        "image": "images/menu/desserts/checheesecake.jpg",
        "kind": "small"
    },
    {
        "keyword": "chocolate-cheesecake",
        "name": "Шоколадный чизкейк",
        "price": 260,
        "category": "dessert",
        "count": "125 г",
        "image": "images/menu/desserts/chocolatecheesecake.jpg",
        "kind": "small"
    },
    {
        "keyword": "chocolate-cake",
        "name": "Шоколадный торт",
        "price": 270,
        "category": "dessert",
        "count": "140 г",
        "image": "images/menu/desserts/chocolatecake.jpg",
        "kind": "small"
    },
    {
        "keyword": "donuts-three",
        "name": "Пончики (3 штуки)",
        "price": 410,
        "category": "dessert",
        "count": "350 г",
        "image": "images/menu/desserts/donuts.jpg",
        "kind": "medium"
    },
    {
        "keyword": "donuts-six",
        "name": "Пончики (6 штук)",
        "price": 650,
        "category": "dessert",
        "count": "700 г",
        "image": "images/menu/desserts/donuts2.jpg",
        "kind": "large"
    }
];
