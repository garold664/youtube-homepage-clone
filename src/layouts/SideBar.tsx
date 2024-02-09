import React, { ElementType, ReactNode, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Home,
  Library,
  Repeat,
  History,
  PlaySquare,
  Clock,
  ListVideo,
  ShoppingBag,
  Flame,
  Film,
  Gamepad2,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from 'lucide-react';
import Button, { buttonStyles } from '../components/Button';
import { twMerge } from 'tailwind-merge';
import { playlists, subscriptions } from '../data/sidebar';

export default function SideBar() {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2">
        <LargeSidebarSection title="Home" visibleItemCount={1}>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Repeat}
            title="Shorts"
            url="/shorts"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Home" visibleItemCount={5}>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="Your videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => {
            return (
              <LargeSidebarItem
                key={playlist.id}
                IconOrImgUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={1}>
          {subscriptions.map((subscription) => {
            return (
              <LargeSidebarItem
                IconOrImgUrl={subscription.imgUrl}
                title={subscription.channelName}
                url={`/@${subscription}`}
              />
            );
          })}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url={`/trending`}
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url={`/shopping`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url={`/movies-tv`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url={`/gaming`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url={`/sports`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url={`/learning`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url={`/fashion-beauty`}
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url={`/podcasts`}
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  // Icon: ReactNode;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'py-4 px-1 flex flex-col items-center rounded-lg gap-1 hidden'
      )}
      href={url}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? <ChevronUp /> : <ChevronDown />;
  return (
    <div>
      {title && <div className="text-lg ml-4 mt-2 mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
          onClick={() => setIsExpanded((state) => !state)}
        >
          {ButtonIcon}
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : ''
        }`
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
