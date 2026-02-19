import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "@/app/reducers/sidebarSlice";
import { CloseCircle, SidebarLeft } from "iconsax-reactjs";
import Language from "./Language";

const Header = ({ title }: { title: string }) => {
  const dispatch = useDispatch();

  const toggle = useSelector((state: any) => state.sidebar.toggle);

  return (
    <div className="sticky top-0 h-18 bg-background px-4 z-40 w-full flex flex-row justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      <div className="flex gap-2 items-center">
        <Language />
        <div className="lg:hidden">
          {toggle ? (
            <CloseCircle onClick={() => dispatch(setToggle())} size="28" />
          ) : (
            <SidebarLeft size="28" onClick={() => dispatch(setToggle())} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
