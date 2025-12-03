import CTAButton from "./components/CTAButton"
import Image from "next/image"
import TopNav from "./components/TopNav"

export default function Home() {
  return (
    <div
      className="text-white"
      style={{
        background:
          "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
      }}
    >
      <div className="w-full">
        {/* Header - no back button on home screen */}
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <TopNav showBackButton={false} />
        </div>

        {/* Gradient Blob with Text Overlays */}
        <div className="relative w-full max-w-px-390 mx-auto">
          <div className="relative py-px-28">
            <Image
              src="/images/blob.svg"
              alt="background image"
              width={274}
              height={290}
              className="rotate-180 mx-auto"
            />

            {/* Text overlays - positioned relative to the blob */}
            <p className="absolute font-sohne text-xs text-[#fafafa] w-px-292 left-px-20 top-10 leading-[1.35] tracking-[0.02em]">
              WA businesses feel confident about future growth
            </p>
            <p className="absolute font-sohne text-xs text-[#fafafa] text-right right-px-20 top-px-86 leading-[1.35] tracking-[0.02em]">
              AI cant replace creativity
            </p>
            <p className="absolute font-sohne text-xs text-[#fafafa] left-px-20 top-px-147 leading-[1.35] tracking-[0.02em]">
              Sales measure true success
            </p>
            <p className="absolute font-sohne text-xs text-[#fafafa] text-right right-px-30 top-px-211 bottom-px-80 leading-[1.35] tracking-[0.02em]">
              Human connection drives WA business
            </p>
            <p className="absolute font-sohne text-xs text-[#fafafa] left-px-20 top-px-274 bottom-px-20 max-w-px-226 leading-[1.35] tracking-[0.02em]">
              The primary barrier to digital transformation is financial
              investment
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="font-bagoss text-2xl text-center mx-5 pb-6 leading-[1.2] tracking-[0.01em] text-[#FAFAFA]">
          Compare your thoughts on{" "}
          <span
            className="font-bagoss"
            style={{
              background:
                "linear-gradient(90deg, #FABBFF 0%, #B179FF 35%, #6DDDFF 83%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            technology
          </span>{" "}
          with current industry opinions.
        </h2>

        {/* CTA Button */}
        <CTAButton text="Get a reality check" variant="primary" />
      </div>
    </div>
  )
}
