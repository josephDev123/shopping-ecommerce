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
    category_name: "electronic",
  },
  {
    id: "kjsdfhlsdflskdf",
    imgurl: Images.productCat2,
    category_name: "fashion",
  },
  {
    id: "sldkfjsldkfjsldk",
    imgurl: Images.productCat3,
    category_name: "home",
  },
  {
    id: "lsdkfjlskdjflskdj",
    imgurl: Images.productCat1,
    category_name: "beauty",
  },
  {
    id: "alskdjflskdjflsdk",
    imgurl: Images.productCat2,
    category_name: "sports",
  },
];
