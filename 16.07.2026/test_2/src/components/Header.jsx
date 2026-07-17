import { IconContext } from 'react-icons'
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../context/context'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ search, setSearch }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useCart();

    const cartitem = useMemo(() => {
        return cart?.length
    }, [cart])

    return (
        <header className='w-100 d-flex justify-content-between p-3 border-bottom ' style={{ height: "80px" }}>
            <h1 className="m-0 text-brand">SOS</h1>
            <div className={`w-50 position-relative`}>
                <CiSearch className="position-absolute" style={{ left: "8px", top: "15px" }} />
                <input className="p-2 form-control px-4" value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <div className="d-flex gap-3">
                <button className={`btn btn-light text-brand `}> <GoStack /> Filter</button>
                <div onClick={() => navigate('/cart')} className='m-2 position-relative'>
                    <IconContext value={{ size: '24px' }}>
                        <FaShoppingCart />
                    </IconContext>
                    {cartitem != 0 &&
                        <div className='position-absolute rounded-pill text-light' style={{ backgroundColor: "red", fontSize: '12px', width: '18px', right: '-10px', top: '-5px' }}>
                            {cartitem}
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}
