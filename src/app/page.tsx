import Image from "next/image";
import { kands } from "@/content/kands";
import HeroBanner from "@/components/HeroBanner";
import KandBubble from "@/components/KandBubble";
import ramDarbar from "../../public/images/ram-darbar.png";

export default function Home() {
  const leftKands = kands.slice(0, 4);
  const rightKands = kands.slice(4);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6 sm:pt-20 sm:pb-12">
      <HeroBanner
        eyebrow="॥ श्रीसीतारामचन्द्राभ्यां नमः ॥"
        title="श्रीरामकथा"
        description="रामचरितमानस पर आधारित रामकथा — सात काण्डों में, प्रवचन-शैली में, हर प्रसंग से एक सीख के साथ। नीचे किसी भी काण्ड पर जाकर कथा पढ़ें।"
      />

      <div className="mt-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.85fr_minmax(0,2.4fr)_0.85fr] lg:gap-5">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          {leftKands.map((kand) => (
            <KandBubble key={kand.slug} kand={kand} />
          ))}
        </div>

        <div
          className="order-1 rounded-[28px] p-[3px] shadow-[0_24px_60px_rgba(124,45,18,0.35)] lg:order-2"
          style={{
            background:
              "linear-gradient(135deg, #fbbf24 0%, #ea580c 45%, #7c2d12 100%)",
          }}
        >
          <div className="overflow-hidden rounded-[26px]">
            <Image
              src={ramDarbar}
              alt="श्रीराम दरबार — श्रीराम, माता सीता, लक्ष्मणजी एवं हनुमानजी"
              className="h-auto w-full"
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
            />
          </div>
        </div>

        <div className="order-3 flex flex-col gap-4">
          {rightKands.map((kand) => (
            <KandBubble key={kand.slug} kand={kand} />
          ))}
        </div>
      </div>
    </div>
  );
}
