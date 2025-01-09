type Locale = string;

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

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  hi: () => import("./dictionaries/hi.json").then((module) => module.default),
  mr: () => import("./dictionaries/mr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
