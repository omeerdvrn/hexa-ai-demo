import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";
import { useState } from "react";

const useLogoStyleSelector = () => {
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const options = [
    {
      id: 0,
      name: "No Style",
      image: null,
    },
    {
      id: 1,
      name: "Monogram",
      imageUrl: "",
      image: monogram,
    },
    {
      id: 2,
      name: "Abstract",
      imageUrl: "",
      image: abstract,
    },
    {
      id: 3,
      name: "Mascot",
      imageUrl: "",
      image: mascot,
    },
  ];

  return {
    selectedStyleId,
    setSelectedStyleId,
    options,
  };
};

export default useLogoStyleSelector;
