import React from "react";
import HeroSection from "./HeroSection";
import ShowSlider from "./ShowSlider";
import ShowTypeSelect from "./ShowTypeSelect";

function ShowContent(){
    return (
        <>
        <HeroSection />
        <div className="bg-linear-to-b from-neutral-900 to-neutral-950">
            <ShowSlider />
            <ShowTypeSelect />
        </div>
        </>
    )
}

export default ShowContent