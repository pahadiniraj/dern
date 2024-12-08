import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import http from "../../Utils/http";

const ViewArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      setIsLoading(true);
      const res = await http.get(`/articles/${id}`);
      const data = res.data.data;
      setTitle(data.title);
      setContent(data.content);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {title}
              </h1>
            </header>
            <figure>
              <img
                src={image}
                alt=""
              />
            </figure>

            <p class="lead mt-10">{content}</p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ViewArticle;
