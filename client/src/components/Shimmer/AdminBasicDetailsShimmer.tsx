const AdminBasicDetailsShimmer:React.FC = ()=>{
    return (
        <>
        <div role="status" className="grid grid-cols-4 gap-4 mb-4 animate-pulse">
            {Array(4).fill('').map((e,index)=> <div key={index} className="h-16 w-56 shadow-xl bg-gray-200  dark:bg-gray-700  mb-4"></div>)}
        </div>
        </>
    )
}

export default AdminBasicDetailsShimmer;