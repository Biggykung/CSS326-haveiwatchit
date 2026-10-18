import React from "react";
import { ChevronLeft as LeftArrow, ChevronRight as RightArrow, Star as StarIcon } from "lucide-react";

function ShowSlider() {
    return(
        <section className="py-12 relative z-10" id="">
            <div className="container mx-auto px-4">
                <div className="flex items-baseline justify-between mb-8">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                        <h2>Title</h2>
                        {/* Conditional */}
                        <p className="text-neutral-400 text-sm mt-1">Subtitle</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all" aria-label="Scroll left">
                        <LeftArrow />
                        </button>
                        <button className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all" aria-label="Scroll Right">
                        <RightArrow />
                        </button>
                    </div>
                </div>
                {/* Slider */}
                <div className="relative">
                    <div className="flex space-x-4 overflow-x-hidden pb-4 snap-x">
                        {/* Conditional */}
                        <div className="min-w-50 md:min-w-60 snap-start relative group cursor-pointer">
                            <div className="rounded-lg overflow-hidden bg-neutral-800">
                                <div className="relative aspect-2/3">
                                    <img src="" alt="" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"/>
                                    {/* Overlay hover */}
                                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-1">

                                                    <span className="text-yellow-400 text-sm font-medium"> Reviews Average </span>
                                                </div>
                                                <span className="text-neutral-400 text-sm"> Release Year </span>
                                            </div>
                                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2 py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Shows Info */}
                            <div className="mt-3">
                                <h3 className="text-white text-sm font-medium truncate">
                                    This is title
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <StarIcon color="#ffe234" fill="#ffe234" className="size-1/6"/>
                                        <span className="text-neutral-400 text-xs">Score</span>
                                    </div>
                                    <span className="text-neutral-500 text-xs">Release Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowSlider