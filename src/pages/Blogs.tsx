import { BlogRead } from "@/components/BlogRead";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogWrite } from "@/components/BlogWrite";
import { toast } from "sonner";

interface BlogsProps {
    user_role?: string | null;
}

const Blogs = ({ user_role }: BlogsProps) => {
    const [writeBlogs,setwriteBlogs] = useState(false);

    function handleWriterButton(){
        if(writeBlogs === false){
            setwriteBlogs(true);
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden hero-pattern from-primary/8 to-accent/8 py-10 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        {/* Left Content */}
                        <div className="lg:w-1/2 mb-12 lg:mb-0">
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                We are building the Next-Gen
                                <br />
                                <span className="text-primary">Workers</span> Platform
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                GoBuild is a platform that connects Workers, Clients, Material Suppliers, and other Professionals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                                    See Latest Posts
                                </button>
                                {user_role === "writer" && (
                                    <button className="text-primary hover:text-primary/80 font-semibold px-8 py-4 transition-colors flex items-center" onClick={handleWriterButton}>
                                    Become a Contributor
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                                )}
                            </div>
                        </div>

                        {/* Right Content - Profile Cards */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative w-full max-w-2xl mx-auto h-96 lg:h-[500px]">
                                {/* Main central image */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                                    <img 
                                        src="/worker1.jpg" 
                                        alt="Featured Professional" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Floating profile cards */}
                                <div className="absolute top-4 left-2 sm:top-8 sm:left-4 lg:top-16 lg:left-10 bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl border border-gray-100 w-36 sm:w-44 lg:w-56 z-30 animate-float">
                                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                                        <img 
                                            src="/ppl7.jpg" 
                                            alt="Sukpal Singh" 
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-xs lg:text-sm">Sukpal Singh</h4>
                                            <p className="text-gray-600 text-xs">Tile Worker</p>
                                            <p className="text-gray-500 text-xs hidden lg:block">25+ years experience</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-2 sm:top-8 sm:right-4 lg:top-20 lg:right-16 bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl border border-gray-100 w-36 sm:w-44 lg:w-56 z-30 animate-float-delayed">
                                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                                        <img 
                                            src="/pp5.jpg" 
                                            alt="Deborah" 
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-xs lg:text-sm truncate">Deborah</h4>
                                            <p className="text-gray-600 text-xs truncate">Architect</p>
                                            <p className="text-gray-500 text-xs hidden lg:block">Project specialist</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-16 left-2 sm:bottom-20 sm:left-4 lg:bottom-24 lg:left-16 bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl border border-gray-100 w-36 sm:w-44 lg:w-56 z-30 animate-float">
                                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                                        <img 
                                            src="/pp6.jpg" 
                                            alt="Saurabh" 
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-xs lg:text-sm truncate">Saurabh</h4>
                                            <p className="text-gray-600 text-xs truncate">Electrician</p>
                                            <p className="text-gray-500 text-xs hidden lg:block">Expert electrician</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-16 right-2 sm:bottom-20 sm:right-4 lg:bottom-20 lg:right-16 bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl border border-gray-100 w-36 sm:w-44 lg:w-56 z-30 animate-float-delayed">
                                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                                        <img 
                                            src="/carpenter.jpg" 
                                            alt="Junaid" 
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-xs lg:text-sm truncate">Junaid</h4>
                                            <p className="text-gray-600 text-xs truncate">Carpenter</p>
                                            <p className="text-gray-500 text-xs hidden lg:block">All kinds of wood work</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative dots - Mobile responsive */}
                                <div className="absolute top-12 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-primary/40 rounded-full animate-pulse z-40"></div>
                                <div className="absolute top-1/3 right-8 sm:right-12 w-2 h-2 sm:w-3 sm:h-3 bg-accent/40 rounded-full animate-pulse delay-1000 z-40"></div>
                                <div className="absolute bottom-1/3 left-8 sm:left-12 w-1 h-1 sm:w-2 sm:h-2 bg-primary/40 rounded-full animate-pulse delay-500 z-40"></div>
                                <div className="absolute bottom-12 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-accent/40 rounded-full animate-pulse delay-1500 z-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <main className="flex-1 py-16 bg-gray-50">
                <div className="container mx-auto px-4 mb-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles & Insights</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover stories, thinking, and expertise from GoBuild on industry trends, workers and the new platform.
                        </p>
                    </div>
                </div>

                {writeBlogs === false ? (
                    <BlogRead />
                ) : (
                    user_role === "writer" && (
                        <BlogWrite />
                    )
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blogs;