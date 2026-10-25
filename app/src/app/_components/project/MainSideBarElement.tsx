"use client"

const MainSideBarElement = ({img, link}: {img: string, link: string}) => {
    
    return (
        <>
        <button className="flex justify-center items-center h-20 w-20 border-none rounded-sm hover:bg-accent-secondary hover:scale-110 shadow-md">
            <img className="h-10 w-10 shrink-0 object-contain" src={img}/>
        </button>
           

        </>
    )
}

export default MainSideBarElement