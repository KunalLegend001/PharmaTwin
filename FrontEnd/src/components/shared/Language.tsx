import { getLanguage } from "@/lib/helpers/getLanguage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LanguageCircle } from "iconsax-reactjs";

const Language = () => {
  const [lang, setLang] = useState("Language");
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", lang: "English" },
    { code: "hi", lang: "Hindi" },
    { code: "mr", lang: "Marathi" },
  ];

  useEffect(() => {
    setLang(getLanguage(localStorage.getItem("i18nextLng") || "en"));
  }, []);

  const changeLanguage = (code: string, lang: string) => {
    setLang(lang);
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LanguageCircle className="h-5! w-5!" /> {lang}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-1" align="start">
        <DropdownMenuGroup>
          {languages.map((lang) => {
            return (
              <DropdownMenuItem
                className="p-1"
                key={lang.code}
                onClick={() => changeLanguage(lang.code, lang.lang)}
              >
                <span className="cursor-context-menu">{lang.lang}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
