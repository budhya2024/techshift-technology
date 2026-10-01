import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="py-7 md:py-14 rounded overflow-hidden container mx-auto">
            <div className="bg-gradient-to-r from-black to-gray-900 p-4 sm:p-8 md:p-12 pb-0! rounded-lg">
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-2">
                        <h2 className="sec-title text-white! mb-6">
                            Get the Best Business Service That Your Company Needs?
                        </h2>

                        <p className="sec-desc text-white! mb-8">
                            Get connected with our people who navigate your business to the right platforms, so that your business can get the exposure and traction that it deserves.
                        </p>

                        <Link
                            href="/contact"
                            className="relative inline-flex items-center justify-center bg-red-500 text-white font-bold text-base px-8 py-4 rounded-2xl overflow-hidden group shadow-xl shadow-red-500/25 transition-all duration-700 ease-out"
                        >
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                            <span className="relative z-10">Get Started</span>
                        </Link>
                    </div>

                    <div className="text-center">
                        <Image
                            src="/images/img_team.webp"
                            alt="Professional man working on laptop"
                            width={500}
                            height={500}
                            className="w-full max-w-lg mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
