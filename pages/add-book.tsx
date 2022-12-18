import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Head>
        <title>Add Books</title>
        <meta name="description" content="BookDir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();

          try {
            axios.post(`${process.env.BASE_API_URL}/books/`, {
              author,
              title,
              description,
            });
            toast.success("Book Added Successfully");
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">
              Title
            </label>
            <input
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="enter title of book"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">
              Author
            </label>
            <input
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword1"
              placeholder="enter author of book"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">
              Description
            </label>
            <input
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword1"
              placeholder="enter description of book"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>

      <Toaster />
    </>
  );
}
