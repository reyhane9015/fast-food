"use client";

import CustomersOpinions from "@/components/CustomersOpinions";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { descVariants } from "../../../utils/animation";

export default function AboutUsPage() {
  return (
    <section className="bg-light-background dark:bg-dark-background">
      <div className="relative z-40 text-center pt-24">
        <SectionHeader subHeader={"Our"} mainHeader={"Story"} />
      </div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={descVariants}
        className="relative z-40 max-w-4xl mx-auto overflow-hidden text-center text-gray-500 mt-4 text-xl"
      >
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before the final copy is available. In publishing and
        graphic design, Lorem ipsum is a placeholder text commonly used to
        demonstrate
        <div className="mt-4">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
        </div>
      </motion.div>

      <CustomersOpinions />
    </section>
  );
}
