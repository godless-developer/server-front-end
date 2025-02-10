"use client";
import { useEffect, useState } from "react";
import { MovieTypes } from "./utils/type";
import Image from "next/image";

export default function Home() {
  const [fetchedData, setFetchedData] = useState<MovieTypes[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000");
      const data = await response.json();
      console.log(data);
      setFetchedData(data.data.results);
    };
    getData();
  }, []);
  console.log(fetchedData);
  return (
    <div className="w-screen flex gap-12 h-screen flex-wrap">
      {fetchedData?.map((movie: MovieTypes, index: number) => {
        return (
          <div
            key={index}
            className="rounded-[8px] overflow-hidden w-[230px] h-[439px] flex flex-col items-start cursor-pointer "
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt={`Poster of ${movie?.original_title}`}
              width={500}
              height={750}
            />
            <div className="bg-secondary flex p-2 flex-col items-start self-stretch  h-full">
              <div className="flex items-center gap-[2px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                    fill="yellow"
                    stroke="yellow"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>
                  {movie?.vote_average.toFixed(1)}
                  <span className="text-[#71717a] text-[12px]">/10</span>
                </p>
              </div>
              <p>{movie?.original_title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
