import water from '@/assets/water.jpg'

const Image = () => {
  return (
    <img
      src={water}
      alt="Image"
      className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  );
};

export default Image;
