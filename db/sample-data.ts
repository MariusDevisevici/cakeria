import { hashSync } from "bcrypt-ts-edge";
export const SAMPLE_DATA = {
  products: [
    {
      name: "Tort 1",
      slug: "tort-1",
      category: "Torturi",
      description: "Tort cu ciocolata",
      images: ["/images/p1-1.jpg", "/images/p1-2.jpg"],
      price: "100",
      rating: "4.5",
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
    },
    {
      name: "Prajituri 1",
      slug: "prajituri-1",
      category: "Prajituri",
      description: "Prajitura cu frisca",
      images: ["/images/p2-1.jpg", "/images/p2-2.jpg"],
      price: "120",
      rating: "4.5",
      numReviews: 10,
      stock: 0,
      isFeatured: true,
      banner: "banner-2.jpg",
    },
  ],
  users: [
    {
      name: "admin",
      email: "admin@admin.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "user",
      email: "user@user.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
};
