import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header";

export default function EditBook(data: any) {
  const [title, setTitle] = useState(data.title);
  const [author, setAuthor] = useState(data.author);
  const [description, setDescription] = useState(data.description);

  return (
    <>
      <Head>
        <title>Edit Books</title>
        <meta name="description" content="BookDir" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();

          try {
            axios.put(`${process.env.BASE_API_URL}/books/edit/${data.id}`, {
              author,
              title,
              description,
            });
            toast.success("Book Updated Successfully");
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
              defaultValue={data.title}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
              defaultValue={data.author}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
              defaultValue={data.description}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="enter description of book"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>

      <Toaster />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;
  const res = await fetch(`${process.env.BASE_API_URL}/books/view/${id}`);
  const data = await res.json();
  return {
    props: data,
  };
};
