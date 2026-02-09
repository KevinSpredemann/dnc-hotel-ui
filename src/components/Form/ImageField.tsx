"use client";

import Image from "next/image";
import { InputHTMLAttributes, useState } from "react";

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const MAX_SIZE = 300 * 1024; // 300KB

const ImageField = ({ id, label, name }: ImageFieldProps) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null);
  const [exceededImageSize, setExceededImageSize] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];
    const reader = new FileReader();

    setExceededImageSize((file?.size as number) > MAX_SIZE);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        src={image ? (image as string) : "/no-avatar.png"}
        width={100}
        height={100}
        alt="Profile picture"
        className="rounded-full relative object-cover w-24 h-24"
      />
      <label
        htmlFor={id}
        className="py-4 px-6 border-none rounded-lg font-bold text-center cursor-pointer"
      >
        {label}
      </label>
      {exceededImageSize && (
        <p className="text-red-500 text-sm font-bold">
          A imagem excede o tamanho máximo de 300KB.
        </p>
      )}
      <input
        type="file"
        name={name}
        id={id}
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImageField;
