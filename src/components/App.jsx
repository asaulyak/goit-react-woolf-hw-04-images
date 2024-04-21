import { useCallback, useEffect, useRef, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImages } from '../api/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const loadImages = useCallback(
    async clean => {
      setLoadMore(false);
      setLoading(true);

      try {
        const images = await searchImages(query, page);

        setImages(prev => {
          if (clean) {
            return images.hits;
          }

          return [...prev, ...images.hits];
        });

        setLoadMore(page < Math.ceil(images.total / 12));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [page, query]
  );
  const queryRef = useRef(null);

  useEffect(() => {
    if (query) {
      const queryChanged = queryRef.current !== query;
      loadImages(queryChanged);
    }

    queryRef.current = query;
  }, [page, query, loadImages]);

  const handleQuerySubmit = query => {
    setQuery(query);
  };

  const handleImageClick = url => {
    setModalOpen(true);
    setModalUrl(url);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleQuerySubmit} />
      <ImageGallery images={images} onOpenModal={handleImageClick} />

      {loadMore && <Button onLoadMoreClick={handleLoadMore} />}

      <Loader visible={loading} />
      {modalOpen && <Modal url={modalUrl} onClose={handleModalClose} />}
    </div>
  );
};
