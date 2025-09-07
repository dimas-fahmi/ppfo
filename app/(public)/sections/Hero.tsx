import { cn } from "@/src/lib/shadcn/utils";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TemporaryData {
  title: string;
  overview: string;
  created_at: string; // should be a timestamp later on
  region: string; // should reference to related table later
  image: string;
  image_alt: string;
  writer: string;
  organization: string;
}

const mocked_data = [
  {
    title:
      "Indonesia: Authorities must investigate eight deaths following violent crackdown on protests",
    overview:
      "Responding to the Indonesian government’s announcement that at least eight people have been killed since nationwide protests against low wages, tax....",
    created_at: "6 hours ago",
    region: "Asia",
    image: "https://images.pexels.com/photos/1237087/pexels-photo-1237087.jpeg",
    image_alt: "anything",
    writer: "Josh Holloway",
    organization: "Press & Public Freedom Organization",
  },
  {
    title:
      "Myanmar: Military junta escalates crackdown on pro-democracy activists",
    overview:
      "The military junta in Myanmar has intensified its suppression of pro-democracy protests, with reports of arbitrary arrests and excessive force used against civilians....",
    created_at: "12 hours ago",
    region: "Asia",
    image: "https://images.pexels.com/photos/2643896/pexels-photo-2643896.jpeg",
    image_alt: "protest scene",
    writer: "Aung San",
    organization: "Human Rights Watch",
  },
  {
    title:
      "Brazil: Amazon deforestation rates surge despite global climate pledges",
    overview:
      "New data shows a 15% increase in deforestation in the Amazon rainforest, raising concerns about Brazil's commitment to global climate agreements....",
    created_at: "1 day ago",
    region: "South America",
    image: "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg",
    image_alt: "deforested land",
    writer: "Clara Mendes",
    organization: "Environmental Justice Network",
  },
  {
    title:
      "Nigeria: Protests erupt over rising fuel prices and economic hardship",
    overview:
      "Thousands of Nigerians have taken to the streets to protest skyrocketing fuel prices and worsening economic conditions, with security forces responding with tear gas....",
    created_at: "2 days ago",
    region: "Africa",
    image: "https://images.pexels.com/photos/3172830/pexels-photo-3172830.jpeg",
    image_alt: "crowd protesting",
    writer: "Fatima Adebayo",
    organization: "Africa Freedom Coalition",
  },
  {
    title:
      "France: Strikes disrupt public transport as workers demand better pensions",
    overview:
      "Nationwide strikes in France have halted public transportation, with unions demanding improved pension plans amid rising inflation and cost-of-living concerns....",
    created_at: "3 days ago",
    region: "Europe",
    image: "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg",
    image_alt: "striking workers",
    writer: "Marie Dubois",
    organization: "Labor Rights Alliance",
  },
  {
    title: "India: Farmers rally against new agricultural reforms in New Delhi",
    overview:
      "Hundreds of farmers gathered in New Delhi to protest new agricultural reforms, claiming they threaten livelihoods and favor large corporations....",
    created_at: "4 days ago",
    region: "Asia",
    image:
      "https://images.pexels.com/photos/10860316/pexels-photo-10860316.jpeg",
    image_alt: "farmers marching",
    writer: "Ravi Sharma",
    organization: "Farmers’ Rights Collective",
  },
  {
    title:
      "Australia: Indigenous communities demand action on land rights disputes",
    overview:
      "Indigenous groups in Australia are calling for urgent resolution to ongoing land rights disputes, citing decades of systemic neglect and broken promises....",
    created_at: "5 days ago",
    region: "Oceania",
    image: "https://images.pexels.com/photos/785129/pexels-photo-785129.jpeg",
    image_alt: "indigenous protest",
    writer: "Emma Wilson",
    organization: "Indigenous Rights Advocacy",
  },
];

const gridLayouts = [
  "w-full h-full overflow-hidden group/article cursor-pointer grid grid-cols-[0.4fr_0.6fr] col-start-1 col-end-4 row-start-1 row-end-3",
  "w-full h-full overflow-hidden col-start-1 col-end-2 row-start-3 row-end-5",
  "w-full h-full overflow-hidden col-start-2 col-end-3 row-start-3 row-end-5",
  "w-full h-full overflow-hidden col-start-3 col-end-4 row-start-3 row-end-5",
  "relative w-full h-full overflow-hidden gap-2 col-start-4 col-end-6 row-start-1 row-end-3",
  "relative w-full h-full overflow-hidden col-start-4 col-end-6 row-start-3 row-end-5",
];

const TheBigCard = (
  props: TemporaryData & { grid: string; className?: string }
) => {
  return (
    <article
      className={cn(
        "bg-black text-white hover:rounded-xl overflow-hidden transition-all duration-300",
        props.grid,
        props.className
      )}
    >
      {/* Content */}
      <div className="flex items-center px-4 py-2">
        <div className="space-y-4">
          <h1 className="group-hover/article:underline text-2xl font-header">
            {props.title}
          </h1>
          <p className="text-sm max-h-16 text-ellipsis max-w-md overflow-hidden">
            {props.overview}
          </p>

          <span className="text-sm font-light">
            {props.created_at} | {props.region}
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          width={380}
          height={180}
          src={props.image}
          alt="anything"
          className="group-hover/article:blur-sm brightness-50 transition-all duration-300 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover/article:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Button variant={"outline"} className="rounded-4xl">
            Read More
          </Button>
        </div>
      </div>
    </article>
  );
};

const TheMediumCard = (
  props: TemporaryData & { grid: string; className?: string }
) => {
  return (
    <article
      className={cn(
        "group/article cursor-pointer hover:rounded-xl overflow-hidden transition-all duration-300",
        props.grid,
        props.className
      )}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <Image
          width={280}
          height={180}
          src={props.image}
          alt="whatever"
          className="group-hover/article:blur-sm brightness-50 transition-all duration-300 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute transition-all duration-300 inset-0 flex items-end p-4 text-white">
        <div className="space-y-4">
          <h1 className="group-hover/article:underline text-lg font-header">
            {props.title}
          </h1>
          <p className="text-sm">{props.overview}</p>

          <span className="text-sm font-light">
            {props.created_at} | {props.region}
          </span>
        </div>
      </div>
    </article>
  );
};

const TheSmallCard = (
  props: TemporaryData & { grid: string; className?: string }
) => {
  return (
    <article
      className={cn(
        "group/article relative cursor-pointer hover:rounded-xl overflow-hidden transition-all duration-300",
        props.grid,
        props.className
      )}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <Image
          width={280}
          height={180}
          src={props.image}
          alt="whatever"
          className="group-hover/article:blur-sm brightness-50 transition-all duration-300 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 text-white flex items-center">
        <div className="space-y-2">
          <h1 className="group-hover/article:underline text-lg font-header">
            {props.title}
          </h1>
          <p className="text-sm max-h-16 overflow-hidden text-ellipsis">
            {props.overview}
          </p>

          <span className="text-sm font-light">
            {props.created_at} | {props.region}
          </span>
        </div>
      </div>
    </article>
  );
};

const Hero = () => {
  return (
    <section className="lg:mt-4" id="hero">
      {/* Container Desktop */}
      {/* Desktop */}
      <div className="layout-width hidden lg:grid grid-cols-5 grid-rows-4 w-full h-screen gap-3">
        {mocked_data.slice(0, gridLayouts.length).map((item, index) => {
          if (index === 0) {
            return (
              <TheBigCard {...item} grid={gridLayouts[index]} key={index} />
            );
          }

          if (index > 0 && index < 4) {
            return (
              <TheSmallCard {...item} grid={gridLayouts[index]} key={index} />
            );
          }

          if (index > 3 && index < 6) {
            return (
              <TheMediumCard {...item} grid={gridLayouts[index]} key={index} />
            );
          }
        })}
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        {/* Top Headline */}
        <article className="group/article">
          {/* Thumbnail */}
          <div>
            <Image
              width={380}
              height={280}
              src={mocked_data[0].image}
              alt={mocked_data[0].image_alt}
              className="w-full max-h-[280px] object-cover"
            />
          </div>

          {/* Article */}
          <div className="p-4 space-y-4">
            <h1 className="text-2xl font-header">{mocked_data[0].title}</h1>
            <p>{mocked_data[0].overview}</p>

            <div className="flex justify-between">
              <span className="font-light text-sm">
                {mocked_data[0].created_at} | {mocked_data[0].region}
              </span>
              {/* Fake Button */}
              <div className="text-sm font-light flex gap-3 items-center">
                Read More <ArrowRight />
              </div>
            </div>
          </div>
        </article>

        <div className="space-y-4">
          {mocked_data.slice(1, 4).map((item, index) => (
            <article key={index} className="grid grid-cols-2">
              {/* Thumbnail */}
              <div>
                <Image
                  width={120}
                  height={80}
                  src={item.image}
                  alt={item.image_alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Artilce */}
              <div className="px-4 space-y-4">
                <h1 className="font-header">{item.title}</h1>
                <p className="text-xs max-h-16 overflow-hidden text-ellipsis">
                  {item.overview}
                </p>

                <div className="flex justify-end">
                  <span className="font-light text-xs">
                    {item.created_at} | {item.writer}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
