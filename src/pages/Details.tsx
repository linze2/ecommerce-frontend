import { IoIosArrowForward } from "react-icons/io";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaFacebookF, FaGithub, FaHeart, FaLinkedin, FaTwitter } from "react-icons/fa";
import Reviews from "../components/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { product_details } from "../store/reducers/homeReducer";
import toast from "react-hot-toast";
import { add_to_card, add_to_wishlist, messageClear } from "../store/reducers/cardReducer";

export default function Details() {
  const [image, setImage] = useState("");
  const discount = 10;
  const stock = 3;
  const [state, setState] = useState("reviews");
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, relatedProducts, moreProducts } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity >= product.stock) {
      toast.error("Out of Stock");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const addWishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const addCart = () => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const buyNow = () => {
    let price = 0;
    if (product.discount !== 0) {
      price = product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }

    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];

    navigate("/shipping", {
      state: {
        products: obj,
        price: price * quantity,
        shippingFee: 50,
        items: 1,
      },
    });
  };

  useEffect(() => {
    dispatch(product_details(slug));
  }, [slug]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      <Header />

      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
              <h2 className='text-3xl font-bold'>Product Details</h2>
              <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                <Link to='/'>Home</Link>
                <span className='pt-1'>
                  <IoIosArrowForward />
                </span>
                <span>Product Details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='bg-slate-100 py-5 mb-5'>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex justify-start items-center text-slate-600 w-full'>
              <Link to='/'>Home</Link>
              <span className='pt-1'>
                <IoIosArrowForward />
              </span>
              <Link to='/'>{product?.category}</Link>
              <span className='pt-1'>
                <IoIosArrowForward />
              </span>
              <span>{product?.name}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
          <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
            <div>
              <div className='p-5 border'>
                <img src={image ? image : product.images?.[0]} alt='product images' className='h-[400px] w-full' />
              </div>
              <div className='py-3'>
                {product.images && (
                  <Carousel autoPlay={true} infinite={true} responsive={responsive} transitionDuration={500}>
                    {product.images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img src={img} alt='product images' className='h-[120px] cursor-pointer' />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='text-3xl text-slate-600 font-bold'>
                <h3>{product.name}</h3>
              </div>
              <div className='flex justify-start items-center gap-4'>
                <div className='flex text-xl'>
                  <Rating ratings={4.5} />
                </div>
                <span className='text-green-500'>(24 reviews)</span>
              </div>

              <div className='text-2xl text-red-500 font-bold flex gap-3'>
                {product.discount !== 0 ? (
                  <>
                    Price : <h2 className='line-through'>${product.price}</h2>
                    <h2>
                      ${product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price : ${product.price}</h2>
                )}
              </div>

              <div className='text-slate-600'>
                <p>{product.description}</p>
                <p className='text-slate-600 py-1 font-bold'>Shop Name : {product.shopName}</p>
              </div>

              <div className='flex gap-3 pb-10 border-b'>
                {product.stock ? (
                  <>
                    <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                      <div onClick={decrement} className='px-6 cursor-pointer'>
                        -
                      </div>
                      <div className='px-6 '>{quantity}</div>
                      <div onClick={increment} className='px-6 cursor-pointer'>
                        +
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={addCart}
                        className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white'
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div>
                  <div
                    onClick={addWishlist}
                    className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'
                  >
                    <FaHeart />
                  </div>
                </div>
              </div>

              <div className='flex py-5 gap-5'>
                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className='flex flex-col gap-5'>
                  <span className={`${product.stock ? "text-green-500" : "text-red-500"}`}>
                    {product.stock ? `In Stock(${product.stock})` : "Out of Stock"}
                  </span>

                  <ul className='flex justify-start items-center gap-3'>
                    <li>
                      <a
                        href='#'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white'
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white'
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white'
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white'
                      >
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='flex gap-3'>
                {product.stock ? (
                  <button
                    onClick={buyNow}
                    className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white'
                  >
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/dashboard/chat/${product.sellerId}`}
                  className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white'
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
          <div className='flex flex-wrap'>
            <div className='w-[72%] md-lg:w-full'>
              <div className='pr-4 md-lg:pr-0'>
                <div className='grid grid-cols-2'>
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "reviews" ? "bg-[#059473] text-white" : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "description" ? "bg-[#059473] text-white" : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div>

                <div>
                  {state === "reviews" ? (
                    <Reviews product={product} />
                  ) : (
                    <p className='py-5 text-slate-600'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, voluptatum. Possimus omnis eius
                      voluptatum aut, esse rem mollitia assumenda doloribus perferendis dolores asperiores molestiae
                      facilis eaque a rerum aliquid perspiciatis minus libero, atque sed! Blanditiis quae recusandae
                      repellendus pariatur, aliquid, aspernatur dolorum quas dolor unde error laudantium eaque quisquam
                      cumque cupiditate. Quas ab reprehenderit corrupti perspiciatis ipsum quidem aliquid minus dicta
                      enim quos, labore mollitia sapiente eveniet rem. Aut labore nobis dolorum sunt obcaecati ipsum
                      voluptas temporibus? A ullam laudantium at, eveniet vel facere molestiae error, eaque dignissimos
                      assumenda minima repudiandae esse architecto officiis tempora nesciunt eius labore voluptate
                      corrupti!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='w-[28%] md-lg:w-full'>
              <div className='pl-4 md-lg:pl-0'>
                <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                  <h2 className='font-semibold'>From {product.shopName}</h2>
                </div>
                <div className='flex flex-col gap-5 mt-3 border p-3'>
                  {moreProducts.map((p, i) => {
                    return (
                      <Link key={i} className='block'>
                        <div className='relative h-[270px]'>
                          <img src={p.images[0]} alt='product' className='w-full h-full' />
                          {p.discount !== 0 && (
                            <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                              {p.discount}%
                            </div>
                          )}
                        </div>

                        <h2 className='text-slate-600 py-1 font-semibold'>{p.name}</h2>
                        <div className='flex gap-2'>
                          <h2 className='text-lg font-bold text-slate-600'>${p.price}</h2>
                          <div className='flex items-center gap-2'>
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
          <h2 className='text-2xl py-8 text-slate-600'>Related Products</h2>
          <div>
            <Swiper
              slidesPerView='auto'
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className='mySwiper'
            >
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className='block'>
                      <div className='relative h-[270px]'>
                        <div className='w-full h-full'>
                          <img src={p.images[0]} alt='products' className='w-full h-full' />
                          <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
                        </div>
                        {p.discount !== 0 && (
                          <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                            {p.discount}%
                          </div>
                        )}
                      </div>

                      <div className='p-4 flex flex-col gap-1'>
                        <h2 className='text-slate-600 text-lg font-semibold'>{p.name}</h2>
                        <div className='flex justify-start items-center gap-3'>
                          <h2 className='text-lg font-bold text-slate-600'>${p.price}</h2>
                          <div className='flex '>
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className='w-full flex justify-center items-center py-8 '>
            <div className='custom_bullet justify-center gap-3 !w-auto'></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
