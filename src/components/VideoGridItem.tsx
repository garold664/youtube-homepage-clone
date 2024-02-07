import React, { ElementRef, useState, useRef, useEffect } from 'react';
import { formatDuration } from '../utils/formatDuration';
import { formatTimeAgo } from '../utils/formatTimeAgo';

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
});

export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<ElementRef<'video'>>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a className="relative aspect-video" href={`/watch?v=${id}`}>
        <img
          className={`block w-full h-full object-cover rounded-xl transition-[border-radius] duration-700 ${
            isVideoPlaying ? 'rounded-none' : 'rounded-xl'
          }`}
          src={thumbnailUrl}
          alt=""
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        ></video>
      </a>
      <div className="flex gap-2">
        <a className="flex-shrink-0" href={`/@${channel.id}`}>
          <img
            className="w-12 h-12 rounded-full bg-blue-200"
            src={channel.profileUrl}
            alt=""
          />
        </a>
        <div className="flex flex-col">
          <a className="font-bold" href={`/@${id}`}>
            {title}
          </a>
          <a className="text-secondary-text text-sm" href={`/@${channel.id}`}>
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} • Views {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
