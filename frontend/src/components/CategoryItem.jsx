import { Link } from "react-router-dom";

function CategoryItem({ category }) {
  return (
    <div
      className="relative bg-emerald-900  min-h-60 w-full scroll-smooth overflow-hidden mx-auto my-5 rounded-lg shadow-emerald-600
         shadow-md  hover:shadow-emerald-600 hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <Link
        to={"/category" + category.href}
        className="px-2 py-1 flex flex-col items-center"
      >
        <img
          src={category.imageUrl}
          alt={category.name}
          className="absolute inset-0 z-10 h-full w-full object-cover  rounded-4xl  p-5  "
          loading="lazy"
        />
        <div className="absolute  z-30 text-white top-1/2 animate-bounce ">
          <h3 className="text-2xl ">{category.name}</h3>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItem;
