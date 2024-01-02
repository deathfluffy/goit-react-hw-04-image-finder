import PropTypes from 'prop-types';
import ImageGalleryItem  from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';


export default function ImageGallery  ({ images })  {
  return (
    <div>
     <ul className={css.ImageGallery}>
       {images.map(image => (
         <ImageGalleryItem key={image.id} image={image} />
      ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func,
};