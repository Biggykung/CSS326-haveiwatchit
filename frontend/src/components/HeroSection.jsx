import React from "react";
import { Star as StarIcon, Clapperboard as ClapperBoardIcon, SquarePlus as AddWatchIcon } from "lucide-react";

function HeroSection() {
    return (
    <div className="relative w-full h-screen">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-cover bg-center bg-neutral-900 transition-all duration-700">
            {/* Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-900 via-neutral-900/70 to-neutral-900/20">
                <div className="absolute inset-0 bg-linear-to-r from-neutral-900 to-transparent"/>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10 container mx-auto px-4">
                <div className="max-w-3xl">
                    {/* Infos */}
                    <div className="transition-all duration-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-purple-500/90 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                                FEATURED
                            </span>
                            {/* Conditional */}
                            <div className="flex items-center text-white gap-1">
                                <StarIcon color="#ffe234" fill="#ffe234" className="size-1/8"/>
                                <span> Average Review</span>
                            </div>
                            {/* End */}
                            <span className="text-neutral-400">.</span>
                            <span className="text-neutral-300 text-sm">Released Data</span>
                            {/* Conditional */}
                            <>
                            <span className="text-neutral-400">.</span>
                            <span className="bg-neutral-700 text-neutral-300 text-xs text-center px-11.5 py-0.5">14+</span>
                            </>
                            {/* End */}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Titles</h1>
                        <p className="text-neutral-300 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl">Flavor text</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                            <ClapperBoardIcon/>
                            View Info
                            </button>
                            <button className="bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-neutral-600">
                            <AddWatchIcon/>
                            Add to Watch List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
                {/* Conditional */}
                <button className="h-.15 rounded-full transition-all"></button>
            </div>
        </div>
    </div>)
}

export default HeroSection;