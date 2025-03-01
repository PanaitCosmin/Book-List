import { Link } from "react-router-dom";
import { SquarePlus } from "lucide-react";

const AddButton = () => {
  return (
    <Link to="/books/create">
        <SquarePlus className="text-sky-800 text-4xl" size={32} />
    </Link>
  )
}

export default AddButton