import { useState, useRef, useEffect, ReactNode } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import './styles.scss';

type FullscreenBoxProps = {
  children: ReactNode;
  fullScreenScale?: number;
};

const FullscreenBox = ({
  children,
  fullScreenScale = 1,
}: FullscreenBoxProps) => {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const el = containerRef.current as HTMLElement | null;
    if (!isFullscreen) {
      el?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fullscreen-box ${isFullscreen ? 'active' : ''}`}
    >
      <div
        className="content"
        style={{ transform: `scale(${isFullscreen ? fullScreenScale : 1})` }}
      >
        {children}
      </div>
      <span
        onClick={toggleFullscreen}
        role="button"
        className="fullscreen-icon"
      >
        {isFullscreen ? <FaCompress size={30} /> : <FaExpand size={30} />}
      </span>
    </div>
  );
};

export default FullscreenBox;
