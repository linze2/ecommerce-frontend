import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  get_card_products,
  delete_card_product,
  messageClear,
  quantity_increment,
  quantity_decrement,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";

export default function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cardProducts, successMessage, price, buyProductItem, shippingFee, outOfStockProducts } = useSelector(
    (state) => state.card
  );

  // const cardProducts = [1, 2];
  // const outOfStockProducts = [1, 2];

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: cardProducts,
        price: price,
        shippingFee: shippingFee,
        items: buyProductItem,
      },
    });
  };

  const increment = (quantity, stock, id) => {
    {
      const temp = quantity + 1;
      if (temp <= stock) {
        dispatch(quantity_increment(id));
      }
    }
  };

  const decrement = (quantity, id) => {
    {
      const temp = quantity - 1;
      if (temp !== 0) {
        dispatch(quantity_decrement(id));
      }
    }
  };

  useEffect(() => {
    dispatch(get_card_products(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_card_products(userInfo.id));
    }
  }, [successMessage]);
  return (
    <div>
      <Header />

      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Shop Page</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Card Page</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#eee]'>
        <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
          {cardProducts?.length || outOfStockProducts?.length ? (
            <div className='flex flex-wrap'>
              <div className='w-[67%] md-lg:w-full'>
                <div className='pr-3 md-lg:pr-0'>
                  <div className='flex flex-col gap-3'>
                    <div className='bg-white p-4'>
                      <h2 className=' text-green-500 font-semibold'>Stock Products {cardProducts.length}</h2>
                    </div>

                    {cardProducts.map((p, i) => (
                      <div key={i} className='flex bg-white p-4 flex-col gap-2'>
                        <div className='flex justify-start items-center'>
                          <h2 className='text-slate-600 font-bold'>{p.shopName}</h2>
                        </div>

                        {p.products.map((pt, i) => (
                          <div key={i} className='w-full flex flex-wrap'>
                            <div className='flex sm:w-full gap-2 w-7/12'>
                              <div className='flex gap-2 justify-start items-center'>
                                <img src={pt.productInfo.images[0]} alt='products' className='w-[80px] h-[80px]' />
                                <div className='pr-4 text-slate-600'>
                                  <h2 className='font-semibold'>{pt.productInfo.name}</h2>
                                  <span className='text-sm'>Brand: {pt.productInfo.brand}</span>
                                </div>
                              </div>
                            </div>

                            <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                              <div className='pl-4 sm:pl-0'>
                                <h2 className='text-lg text-orange-500'>
                                  $
                                  {pt.productInfo.price -
                                    Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}
                                </h2>
                                <p className='line-through'>${pt.productInfo.price}</p>
                                <p>-{pt.productInfo.discount}%</p>
                              </div>
                              <div className='flex gap-2 flex-col'>
                                <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                  <div onClick={() => decrement(pt.quantity, pt._id)} className='px-3 cursor-pointer'>
                                    -
                                  </div>
                                  <div className='px-3'>{pt.quantity}</div>
                                  <div
                                    onClick={() => increment(pt.quantity, pt.productInfo.stock, pt._id)}
                                    className='px-3 cursor-pointer'
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() => dispatch(delete_card_product(pt._id))}
                                  className='px-5 py-[3px] bg-red-500 text-white'
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStockProducts?.length > 0 && (
                      <div className='flex flex-col gap-3'>
                        <div className='bg-white p-4'>
                          <h2 className=' text-red-500 font-semibold'>Out of Stock {outOfStockProducts.length}</h2>
                        </div>
                        <div className='bg-white p-4'>
                          {outOfStockProducts.map((p, i) => (
                            <div key={i} className='w-full flex flex-wrap'>
                              <div className='flex sm:w-full gap-2 w-7/12'>
                                <div className='flex gap-2 justify-start items-center'>
                                  <img src={p.products[0].images[0]} alt='products' className='w-[80px] h-[80px]' />
                                  <div className='pr-4 text-slate-600'>
                                    <h2 className='font-semibold'>{p.products[0].name}</h2>
                                    <span className='text-sm'>Brand: {p.products[0].brand}</span>
                                  </div>
                                </div>
                              </div>

                              <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                <div className='pl-4 sm:pl-0'>
                                  <h2 className='text-lg text-orange-500'>
                                    $
                                    {p.products[0].price -
                                      Math.floor((p.products[0].price * p.products[0].discount) / 100)}
                                  </h2>
                                  <p className='line-through'>${p.products[0].price}</p>
                                  <p>-{p.products[0].discount}%</p>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                    <div onClick={() => decrement(p.quantity, p._id)} className='px-3 cursor-pointer'>
                                      -
                                    </div>
                                    <div className='px-3'>{p.quantity}</div>
                                    <div className='px-3 cursor-pointer'>+</div>
                                  </div>
                                  <button
                                    onClick={() => dispatch(delete_card_product(p._id))}
                                    className='px-5 py-[3px] bg-red-500 text-white'
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='w-[33%] md-lg:w-full'>
                <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                  {cardProducts.length && (
                    <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                      <h2 className='text-xl font-bold'>Order Summary</h2>
                      <div className='flex justify-between items-center'>
                        <span>{buyProductItem} Items</span>
                        <span>${price}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Shipping Fee</span>
                        <span>${shippingFee}</span>
                      </div>
                      <div className='flex gap-2'>
                        <input
                          type='text'
                          placeholder='Input Coupon'
                          className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm'
                        />
                        <button className='px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm'>
                          Apply
                        </button>
                      </div>

                      <div className='flex justify-between items-center'>
                        <span>Total</span>
                        <span className='text-lg text-[#059473]'>${price + shippingFee}</span>
                      </div>
                      <button
                        onClick={redirect}
                        className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase'
                      >
                        Process to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to='/shop' className='px-4 py-1 bg-indigo-500 text-white'>
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
