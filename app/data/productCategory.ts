import { Images } from "../Images";

export type IproductCategory = {
  id: string;
  imgurl: string;
  category_name: string;
};

export const productCategory = [
  {
    id: "dhdgdddhwhwwwu",
    imgurl: Images.productCat1,
    category_name: "Health & Beauty",
  },
  {
    id: "kjsdfhlsdflskdf",
    imgurl: Images.productCat2,
    category_name: "Crafts & Handmade",
  },
  {
    id: "sldkfjsldkfjsldk",
    imgurl: Images.productCat3,
    category_name: "Travel & Events",
  },
  {
    id: "lsdkfjlskdjflskdj",
    imgurl: Images.productCat1,
    category_name: "Fashion",
  },
  {
    id: "alskdjflskdjflsdk",
    imgurl: Images.productCat2,
    category_name: "Food & Beverage",
  },
];
