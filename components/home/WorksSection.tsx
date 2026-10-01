"use client";

import Image from "next/image";
import { TrendingUp, Palette, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const aboutFeatures = [
    {
        icon: TrendingUp,
        title: "Digital Marketing",
        description:
            "Techshift Technology is the best digital marketing company, that offers varied digital advertising services to an ever-growing roster of clients and businesses.",
    },
    {
        icon: Palette,
        title: "Creative Design",
        description:
            "With our logo designing services, flyers designing services, website, and graphic design services we aim not only to just 'create' but also 'build businesses'.",
    },
    {
        icon: Users,
        title: "Social Media Marketing",
        description:
            "As the best social media marketing company, we help you create innovative posts, eye-catchy videos, stunning graphics, etc., that will engage your audiences.",
    },
];

export default function WorkSection() {
    const router = useRouter();

    return (
        <section id="about" className="py-7 md:py-14 transition-all duration-1000 bg-[#0a0f16]">
            <div className="container">
                <div className="text-center sec-header">
                    <h2 className="sec-title text-white">
                        We Are Defined Not By Our Words But By Our Works
                    </h2>

                    <p className="sec-desc mx-auto text-white/70">
                        We offer you The Best Digital Marketing Services. Regardless of whether you are running a large-scale or small-scale business, we completely understand the value of your business.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        {aboutFeatures.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 group"
                                >
                                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors duration-300">
                                            {item.title}
                                        </h3>

                                        <p className="text-white/60">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <Image
                            src="/images/imac_img.webp"
                            alt="Digital workspace with laptop and code"
                            width={600}
                            height={500}
                            className="w-full max-w-lg mx-auto rounded cursor-pointer"
                            onClick={() => router.push("/contact")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
