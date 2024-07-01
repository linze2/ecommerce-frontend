import { useState } from "react";
import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./products/Pagination";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Reviews() {
  const [parPage, setParPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const userInfo = {};
  const [rate, setRate] = useState("");
  const [review, setReview] = useState("");

  return (
    <div className='mt-8'>
      <div className='flex gap-10 md-lg:flex-col'>
        <div className='flex flex-col gap-2 justify-start items-start py-4'>
          <div>
            <span className='text-6xl font-semibold'>4.5</span>
            <span className='text-3xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className='flex text-3xl'>
            <Rating ratings={4.5} />
          </div>
          <p className='text-sm text-slate-600'>15 Reviews</p>
        </div>

        <div className='flex gap-2 flex-col py-4'>
          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[60%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={4} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[70%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>20</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={3} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[40%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>8</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={2} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[30%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>5</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={1} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[10%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>2</p>
          </div>

          <div className='flex justify-start items-center gap-5'>
            <div className='flex gap-1 w-[93px]'>
              <RatingTemp rating={0} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='h-full bg-[#edbb0e] w-[0%]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>0</p>
          </div>
        </div>
      </div>

      <h2 className='text-slate-600 text-xl font-bold py-5'>Product Reviews 10</h2>
      <div className='flex flex-col gap-8 pb-10 pt-4'>
        {[1, 2, 3, 4, 5].map((r, i) => {
          return (
            <div key={i} className='flex flex-col gap-1'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-1 text-xl'>
                  <RatingTemp rating={4} />
                </div>
                <span className='text-slate-600'>8 Jan 2024</span>
              </div>
              <span className='text-slate-600'>Nicolas</span>
              <p className='text-slate-600 text-sm'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit tempore, laboriosam quisquam
                cupiditate deleniti excepturi dicta autem temporibus voluptates tenetur.
              </p>
            </div>
          );
        })}

        <div className='flex justify-end'>
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              parPage={parPage}
              showItem={Math.floor(10 / 3)}
            />
          }
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-1'>
              <RatingReact
                onChange={(e) => setRate(e)}
                initialRating={rate}
                emptySymbol={
                  <span className='text-[#edbb03] text-4xl'>
                    <FaRegStar />
                  </span>
                }
                fullSymbol={
                  <span className='text-[#edbb03] text-4xl'>
                    <FaStar />
                  </span>
                }
              />
            </div>
            <form>
              <textarea required name='' id='' cols='30' rows='5' className='border outline-0 p-3 w-full'></textarea>
              <div className='mt-2'>
                <button className='py-1 px-5 bg-indigo-500 text-white rounded-sm'>Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link to='/login' className='py-1 px-5 bg-red-500 text-white rounded-sm'>
              Login First
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
