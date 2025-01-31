import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  ShieldCheck,
  Truck,
  Star,
  Flame,
  Heart,
  Award,
} from "lucide-react";
import playstorePng from "../../public/playstore.png";
import appstorePng from "../../public/appstore.png";
import { signatureDishes, testimonials } from "@/utils/landingpageConfigs";

const LandingPage = () => {
  return (
    <div className="dark bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover transform scale-105"
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Taste the <span className="text-purple-400">Difference</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience culinary excellence delivered to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/home"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2 group"
              >
                Explore Menu
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container px-4 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
            <div className="mb-4 text-purple-400">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Lightning Fast Delivery
            </h3>
            <p className="text-gray-400">
              Get your food hot and fresh in under 30 minutes
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
            <div className="mb-4 text-purple-400">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Quality Assured
            </h3>
            <p className="text-gray-400">
              100% hygiene guaranteed from top-rated restaurants
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
            <div className="mb-4 text-purple-400">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">24/7 Service</h3>
            <p className="text-gray-400">
              Late night cravings? We've got you covered
            </p>
          </div>
        </div>
      </section>

      {/* Cuisine Section */}
      <section className="min-h-screen flex items-center py-20">
        <div className="container px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cuisine"
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore <span className="text-purple-400">Global Flavors</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              From sizzling street food to gourmet experiences, discover a world
              of tastes curated by our expert chefs
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Restaurants
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-20 bg-gray-900">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-purple-400">Signature</span> Creations
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most loved dishes crafted by master chefs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="group relative overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">
                      {dish.rating}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-300">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-purple-400">Simple</span> Steps
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get your favorite food in 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute inset-x-0 top-1/2 h-1 hidden md:block" />
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Choose Your Favorite",
                description:
                  "Browse through our menu and select dishes you love. We have something for everyone!",
              },
              {
                icon: <Flame className="h-8 w-8" />,
                title: "We Prepare Your Order",
                description:
                  "Our chefs prepare your meal with the freshest ingredients and utmost care.",
              },
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Fast Delivery",
                description:
                  "Your order is delivered hot and fresh right to your doorstep in no time.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-gray-900/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group transform hover:-translate-y-2"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white text-center mt-8 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our <span className="text-purple-400">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied food lovers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(testimonial.rating))].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        )
                      )}
                      {testimonial.rating % 1 !== 0 && ( // Handle half-star ratings
                        <Star
                          className="h-4 w-4 text-yellow-400 fill-current"
                          style={{ clipPath: "inset(0 50% 0 0)" }} // Half-star effect
                        />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="min-h-screen flex items-center bg-gray-800/30">
        <div className="container px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-last lg:order-first">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get the <span className="text-purple-400">Mobile App</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Enjoy exclusive offers, track your orders in real-time, and get
              personalized recommendations
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <img src={playstorePng} className="h-6 w-6" alt="Google Play" />
                Google Play
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <img src={appstorePng} className="h-6 w-6" alt="App Store" />
                App Store
              </button>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1587573578335-9672da4d0292?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mobile App"
              className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
