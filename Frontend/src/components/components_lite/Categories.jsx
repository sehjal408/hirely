import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobContext";  // ✅ using Context

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useJobs(); // ✅ REPLACES Redux dispatch

  const searchjobHandler = (query) => {
    setSearchQuery(query);   // ✅ update context state
    navigate("/browse");
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Explore our extensive job market.
        </p>
      </div>

      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchjobHandler(category)}>
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
