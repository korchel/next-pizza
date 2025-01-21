export const categories = [
  { name: "Пиццы" },
  { name: "Завтрак" },
  { name: "Закуски" },
  { name: "Коктейли" },
  { name: "Напитки" },
  { name: "Десерты" },
  { name: "Соусы" },
];

export const ingredients = [
  {
    name: "Моцарелла",
    price: 79,
    imageUrl: "/ingredients/Моцарелла.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl: "/ingredients/Сыры чеддер и пармезан.png",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl: "/ingredients/Острый перец халапеньо.png",
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrl: "/ingredients/Шампиньоны.png",
  },
  {
    name: "Бекон",
    price: 79,
    imageUrl: "/ingredients/Бекон.png",
  },
  {
    name: "Пепперони",
    price: 79,
    imageUrl: "/ingredients/Пепперони.png",
  },
  {
    name: "Маринованные огурцы",
    price: 59,
    imageUrl: "/ingredients/Маринованные огурцы.png",
  },
  {
    name: "Свежие томаты",
    price: 59,
    imageUrl: "/ingredients/Свежие томаты.png",
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrl: "/ingredients/Красный лук.png",
  },
  {
    name: "Ананасы",
    price: 59,
    imageUrl: "/ingredients/Ананасы.png",
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrl: "/ingredients/Итальянские травы.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrl: "/ingredients/Сладкий перец.png",
  },
  {
    name: "Брынза",
    price: 79,
    imageUrl: "/ingredients/Брынза.png",
  },
].map((ingredient, index) => ({ id: index + 1, ...ingredient }));

export const products = [
  {
    name: "Сырники",
    imageUrl: "/products/Сырники.avif",
    categoryId: 2,
  },
  {
    name: "Кофе Американо",
    imageUrl: "/products/Кофе Американо.avif",
    categoryId: 2,
  },
  {
    name: "Сырники с малиновым вареньем",
    imageUrl: "/products/Сырники с малиновым вареньем.avif",
    categoryId: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/products/Кофе Латте.avif",
    categoryId: 2,
  },
  {
    name: "Картофель из печи с соусом",
    imageUrl: "/products/Картофель из печи с соусом.avif",
    categoryId: 3,
  },
  {
    name: "Салат Цезарь",
    imageUrl: "/products/Салат Цезарь.avif",
    categoryId: 3,
  },
  {
    name: "Молочный коктейль Ежевика-малина",
    imageUrl: "/products/Молочный коктейль Ежевика-малина.avif",
    categoryId: 4,
  },
  {
    name: "Добрый Кола",
    imageUrl: "/products/Добрый Кола.avif",
    categoryId: 5,
  },
  {
    name: "Морс Черная смородина",
    imageUrl: "/products/Морс Черная смородина.avif",
    categoryId: 5,
  },
  {
    name: "Яблочный сок",
    imageUrl: "/products/Яблочный сок.avif",
    categoryId: 5,
  },
  {
    name: "Добрый Лимон-Лайм",
    imageUrl: "/products/Добрый Лимон-Лайм.avif",
    categoryId: 5,
  },
  {
    name: "Добрый Апельсин",
    imageUrl: "/products/Добрый Апельсин.avif",
    categoryId: 5,
  },
  {
    name: "Морс Клюква",
    imageUrl: "/products/Морс Клюква.avif",
    categoryId: 5,
  },
  {
    name: "Сорбет Лимонный фреш",
    imageUrl: "/products/Сорбет Лимонный фреш.avif",
    categoryId: 6,
  },
  {
    name: "Чизкейк Нью-Йорк с кокосом",
    imageUrl: "/products/Чизкейк Нью-Йорк с кокосом.avif",
    categoryId: 6,
  },
  {
    name: "Макарон манго-маракуйя",
    imageUrl: "/products/Макарон манго-маракуйя.avif",
    categoryId: 6,
  },
  {
    name: "Шоколадное печенье",
    imageUrl: "/products/Шоколадное печенье.avif",
    categoryId: 6,
  },
];

export const stories = [
  {
    previewImageUrl: "/stories/1.webp",
  },
  {
    previewImageUrl: "/stories/2.webp",
  },
  {
    previewImageUrl: "/stories/3.webp",
  },
  {
    previewImageUrl: "/stories/4.webp",
  },
  {
    previewImageUrl: "/stories/5.webp",
  },
  {
    previewImageUrl: "/stories/6.webp",
  },
];

export const storiesItems = [
  {
    storyId: 1,
    sourceUrl: "/stories/storiesItems/1/1.webp",
  },
  {
    storyId: 1,
    sourceUrl: "/stories/storiesItems/1/2.webp",
  },
  {
    storyId: 1,
    sourceUrl: "/stories/storiesItems/1/3.webp",
  },
  {
    storyId: 1,
    sourceUrl: "/stories/storiesItems/1/4.webp",
  },
  {
    storyId: 1,
    sourceUrl: "/stories/storiesItems/1/5.webp",
  },
];
