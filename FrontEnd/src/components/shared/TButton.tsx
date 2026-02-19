import ButtonLoader from "@/components/shared/ButtonLoader";
import { Button } from "@/components/ui/button";

interface TButton {
  label: string;
  isPending: boolean;
}

const TButton = ({ label, isPending }: TButton) => {
  return (
    <Button type="submit" disabled={isPending} className="w-full text-white">
      {isPending ? <ButtonLoader /> : label}
    </Button>
  );
};

export default TButton;
