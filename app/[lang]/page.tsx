"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/getDictionary";

type Dictionary = {
  navigation: {
    home: string;
    about: string;
    contact: string;
  };
  common: {
    loading: string;
    error: string;
    switchLanguage: string;
  };
  home: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  services: {
    title: string;
    service1: {
      name: string;
      description: string;
    };
    service2: {
      name: string;
      description: string;
    };
    service3: {
      name: string;
      description: string;
    };
  };
  blog: {
    title: string;
    latestPost: {
      title: string;
      date: string;
      excerpt: string;
    };
  };
};

type PageProps = {
  params: {
    lang: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState(params.lang);
  const [dictionary, setDictionary] = useState<Dictionary>();

  // Fetch dictionary when the language changes
  useEffect(() => {
    const fetchDictionary = async () => {
      const fetchedDictionary = await getDictionary(currentLang);
      setDictionary(fetchedDictionary);
    };
    fetchDictionary();
  }, [currentLang]);

  const languageChangeHandler = (value: string) => {
    setCurrentLang(value);
    console.log("Selected language:", value);

    // Optionally navigate or handle routing
    router.push(`/${value}`);
  };

  if (!dictionary) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex">
        {/* Language Select */}
        <label className="me-2"> Select Language</label>

        <Select
          onValueChange={languageChangeHandler}
          defaultValue={currentLang}
        >
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="mr">Marathi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-10">
        {/* Services Section */}
        <section>
          <h2 className="text-3xl font-semibold">
            {dictionary.services.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              <h3 className="text-xl font-bold">
                {dictionary.services.service1.name}
              </h3>
              <p className="mt-2">{dictionary.services.service1.description}</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              <h3 className="text-xl font-bold">
                {dictionary.services.service2.name}
              </h3>
              <p className="mt-2">{dictionary.services.service2.description}</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
              <h3 className="text-xl font-bold">
                {dictionary.services.service3.name}
              </h3>
              <p className="mt-2">{dictionary.services.service3.description}</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section>
          <h2 className="text-3xl font-semibold">{dictionary.blog.title}</h2>
          <div className="mt-6 p-6 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">
              {dictionary.blog.latestPost.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {dictionary.blog.latestPost.date}
            </p>
            <p className="mt-2">{dictionary.blog.latestPost.excerpt}</p>
            <button className="mt-4 text-blue-500 hover:text-blue-700">
              Read More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
