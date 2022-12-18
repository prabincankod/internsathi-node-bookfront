import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchquery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.post(
          `${process.env.BASE_API_URL}/books/search?s=${searchQuery}`
        );
        const books = await data.data;
        setBooks(books);
        console.log(books);
      } catch (error) {}
    })();
  }, [searchQuery, books]);
  return (
    <>
      <Head>
        <title>Book-Dir</title>
        <meta name="description" content="BookDir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
        }}
      >
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative mx-[9rem] ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Books Name"
            onChange={(e) => {
              setSearchquery(e.target.value);
            }}
          />
        </div>
      </form>

      <div className="overflow-x-auto relative mt-4">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Author
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    //  @ts-ignore
                    key={book?.id}
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* @ts-ignore */}
                    {book?.title}
                  </th>
                  {/* @ts-ignore */}
                  <td className="py-4 px-6">{book?.author}</td>
                  <td className="py-4 px-6">
                    <button className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs font-medium mr-3">
                      {/* @ts-ignore */}
                      <Link href={`edit/${book?.id}`}>edit</Link>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        axios.delete(
                          // @ts-ignore
                          `${process.env.BASE_API_URL}/books/delete/${book?.id}`
                        );
                        toast.success("Book Deleted");
                      }}
                      className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs font-medium mr-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Toaster />
      </div>
    </>
  );
}
