import { IconType } from "react-icons"
interface CategoryInputProps{
    onClick: (value:string)=>void
    selected?: boolean
    label: string
    icon: IconType
}

const CategoryInput: React.FC<CategoryInputProps> = ({onClick, selected, label, icon: Icon})=>{
    return(
        <div
        onClick={()=>onClick(label)}
        className={`rounded-xl p-4 flex flex-col border-2 gap-3 hover:border-black transition cursor-poniter 
        ${selected ? 'border-black' : 'border-netral-200'}`}
        >
            <Icon size={30} />
            <div className="font-semibold">{label}</div>
        </div>
    )
}
export default CategoryInput