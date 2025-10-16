import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HardHat, Truck, Building2, Hammer, Users } from "lucide-react";

const ArchitectPageCards: React.FC = () => {
  const cards = [
    {
      title: "Worker",
      link: "/categories/workers",
      icon: <Users size={36} className="text-red-600 mb-2" />,
      img: "https://www.shutterstock.com/image-photo/uttar-pradesh-india-feb-18-600nw-2056375556.jpg",
    },
    {
      title: "Material Supplier",
      link: "/categories/suppliers",
      icon: <Truck size={36} className="text-green-600 mb-2" />,
      img: "https://5.imimg.com/data5/ANDROID/Default/2024/7/435955371/OY/II/MI/199425361/product-jpeg.jpg",
    },
    {
      title: "Architect",
      link: "/categories/architects",
      icon: <Building2 size={36} className="text-blue-600 mb-2" />,
      img: "https://media.istockphoto.com/id/473849812/photo/female-architect.jpg?s=612x612&w=0&k=20&c=sn4gWawpyE_wPQyl7tURhnj6sIsmrGitbpuHDTOEnDc=",
    },
    {
      title: "Contractor",
      link: "/categories/contractors",
      icon: <Hammer size={36} className="text-purple-600 mb-2" />,
      img: "https://media.istockphoto.com/id/2158230802/photo/happy-home-owner-and-construction-site-worker-handshaking-at-renovating-house.jpg?s=612x612&w=0&k=20&c=6DZv143Y_FE58cowOF0iWV6cvxnys8kzRwE0zkLgXkE=",
    },
    {
      title: "Developer",
      link: "/categories/developers",
      icon: <HardHat size={36} className="text-yellow-600 mb-2" />,
      img: "https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/good-software-developer-1128x635.jpg",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <style>
        {`
        @keyframes borderAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-border {
          padding: 3px; /* thickness */
          border-radius: 1rem;
          background: conic-gradient(red, orange, yellow, green, blue, indigo, violet, red);
          background-size: 300% 300%;
          animation: borderAnimation 5s linear infinite;
        }

        .card-inner {
          border-radius: 1rem;
          overflow: hidden;
          background: white;
        }
        `}
      </style>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          <span className="text-blue-600">GoBuild</span> Solutions
        </h2>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8">
          {cards.map((card, idx) => (
            <Link key={idx} to={card.link}>
              <div className="animated-border">
                <Card className="card-inner transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                  <div className="h-28 w-full">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-white to-gray-50">
                    {card.icon}
                    <h3 className="text-xl font-semibold text-gray-700 mt-2">
                      {card.title}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center gap-5">
          <Link to={cards[0].link} className="w-full">
            <div className="animated-border">
              <Card className="card-inner transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="h-40 w-full">
                  <img
                    src={cards[0].img}
                    alt={cards[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-center justify-center py-5 bg-gradient-to-b from-white to-gray-50">
                  {cards[0].icon}
                  <h3 className="text-lg font-semibold text-gray-700 mt-2">
                    {cards[0].title}
                  </h3>
                </CardContent>
              </Card>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4 w-full">
            {cards.slice(1).map((card, idx) => (
              <Link key={idx} to={card.link}>
                <div className="animated-border">
                  <Card className="card-inner transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                    <div className="h-24 w-full">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col items-center justify-center py-4 bg-gradient-to-b from-white to-gray-50">
                      {card.icon}
                      <h3 className="text-base font-semibold text-gray-700 mt-2">
                        {card.title}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectPageCards;
