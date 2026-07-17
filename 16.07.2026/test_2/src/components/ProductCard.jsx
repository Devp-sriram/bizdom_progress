import { FaPlus } from "react-icons/fa";
import { useCart } from "../context/context";

export default function ProductCard({ product }) {
    const { setCart } = useCart();

    const addToCart = (item) => {
        console.log(item)
        setCart(prev => {
            const existing = prev.find(prod => prod.id === item.id)
            if (existing) {
                existing.qty ? existing.qty++ : existing.qty = 2
                return prev.map(item => item.id === existing.id ? existing : item)
            } else {
                return [item, ...prev]
            }
        })
    };

    return (
        <div key={product.id} className="d-flex border rounded-3 text-start" style={{ width: '400px', height: '220px', fontWeight:'600'}}>
            <img
                src={product.images[0]}
                style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                    objectPosition: "center",
                    backgroundColor: "white"
                }} />
            <div className="m-3 d-flex flex-column justify-content-between w-100 ">
                <h6 className="text-wrap">{product.title}</h6>
                <p>{product.category}</p>
                <p className='m-0 text-brand text-bold'>₹ {product.price}</p>
                <div className="d-flex justify-content-between p-2">
                    <p className="m-0 " style={{ fontSize: '14px', fontWeight: '600', color: '#01cc34' }}> 5% TAX</p>
                    <button onClick={() => addToCart(product)} className='bg-brand text-white rounded-3 p-0'>
                        <FaPlus className="m-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}
