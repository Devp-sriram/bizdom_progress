import { IconContext } from 'react-icons'
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCart } from '../context/context'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ search, setSearch , showSideBar ,setShowSideBar}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useCart();

    const cartitem = useMemo(() => {
        return cart?.length
    }, [cart])

    return (
        <header className='w-100 d-flex justify-content-between p-3 border-bottom position-fixed bg-white' style={{ height: "80px" }}>
            <div className='d-flex gap-3 align-items-center'>
                <IconContext value={{ size: '24px' ,color:'var(--brand)'}}>
                    <RxHamburgerMenu onClick={()=>setShowSideBar(true)} className='d-md-none' />
                </IconContext>
                <h1 className="m-0 text-brand">SOS</h1>
            </div>
            <div className={`d-none d-md-block w-50 position-relative`}>
                <CiSearch className="position-absolute" style={{ left: "8px", top: "15px" }} />
                <input className="p-2 form-control px-4" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="d-flex gap-3">
                <button className={`d-none d-md-block btn btn-light text-brand `}> <GoStack /> Filter</button>
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
