import { Images } from "../Images";

type ProductImage = {
  url: string;
  path: string;
  _id: string;
};

export type IproductCardTypes = {
  _id: string;
  user_id: string;
  productName: string;
  Description: string;
  productCategory: string;
  productTag: string;
  productPrice: string;
  productDiscount: string;
  productQuantity: number;
  productSKU: string;
  productSize: string;
  productItemWeight: number;
  productUnit: string;
  productBreath: number;
  productLength: number;
  productWidth: number;
  productImgUrl: ProductImage[];
};

export const productCardData = [
  {
    id: "dhdjdhddjdjdj",
    img: Images.product4,
    productname: "Laptop",
    price: "N20",
    description:
      "This sleek and powerful laptop is perfect for work, gaming, and entertainment. With a high-resolution display and fast processor, it ensures smooth performance for all your tasks.",
    discount: 30,
  },
  {
    id: "skdflksdflskdf",
    img: Images.product5,
    productname: "Smartphone",
    price: "N15",
    description:
      "Stay connected with the latest smartphone technology. This device features a stunning display, advanced camera system, and long-lasting battery life.",
    discount: 20,
  },
  {
    id: "sldkfjslkdfjsldk",
    img: Images.product6,
    productname: "Headphones",
    price: "N10",
    description:
      "Immerse yourself in your favorite music with these premium headphones. They offer crystal-clear sound quality and comfortable design for extended wear.",
    discount: 25,
  },
  {
    id: "slkdjfslkdjflskdj",
    img: Images.productCat1,
    productname: "Watch",
    price: "N18",
    description:
      "Elevate your style with this elegant and sophisticated watch. It features a durable build, precise timekeeping, and timeless design that complements any outfit.",
    discount: 15,
  },
  {
    id: "alskdjflsdkfjsld",
    img: Images.productCat2,
    productname: "Tablet",
    price: "N25",
    description:
      "Experience the ultimate versatility with this powerful tablet. Whether you're working on-the-go or enjoying multimedia entertainment, this device delivers exceptional performance.",
    discount: 35,
  },
  {
    id: "slkdfjlskdjfslkdj",
    img: Images.productCat3,
    productname: "Camera",
    price: "N30",
    description:
      "Capture life's precious moments with stunning clarity using this high-performance camera. From family gatherings to outdoor adventures, it ensures every memory is preserved in vivid detail.",
    discount: 40,
  },
  {
    id: "dhdjdhddjdjdj",
    img: Images.product4,
    productname: "Laptop",
    price: "N20",
    description:
      "This sleek and powerful laptop is perfect for work, gaming, and entertainment. With a high-resolution display and fast processor, it ensures smooth performance for all your tasks.",
    discount: 30,
  },
  {
    id: "skdflksdflskdf",
    img: Images.product5,
    productname: "Smartphone",
    price: "N15",
    description:
      "Stay connected with the latest smartphone technology. This device features a stunning display, advanced camera system, and long-lasting battery life.",
    discount: 20,
  },
];
