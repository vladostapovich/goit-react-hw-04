const ImageCard = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={handleClick}
      />
    </div>
  );
};
export default ImageCard;
