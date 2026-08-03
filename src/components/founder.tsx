"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { assets } from "@/lib/assets";

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxOn = mounted && reduce !== true;
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxOn ? ["6%", "-6%"] : ["0%", "0%"]
  );

  return (
    <section
      ref={sectionRef}
      id="fundadora"
      className="w-full bg-surface py-20 md:py-28 overflow-hidden border-t border-line"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={
              reduce === true
                ? { duration: 0 }
                : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="relative aspect-[3/4] w-full max-w-md md:max-w-none overflow-hidden rounded-2xl bg-ink border border-line">
              <motion.div
                className="absolute inset-[-6%] will-change-transform"
                style={parallaxOn ? { y: imageY } : undefined}
              >
                <Image
                  src={assets.nathalia}
                  alt="Nathalia Fava, fundadora da SÓC.IA"
                  fill
                  sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
                  quality={95}
                  priority
                  className="object-cover object-[center_18%]"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="md:col-span-7 md:pl-2 lg:pl-8">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                reduce === true
                  ? { duration: 0 }
                  : {
                      duration: 0.65,
                      delay: 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.2] tracking-[-0.02em] text-paper text-balance"
            >
              “Eu abri a caixa-preta da minha gestão para você não precisar
              começar do zero.”
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={
                reduce === true
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="mt-8 flex flex-col gap-1"
            >
              <cite className="not-italic text-base font-medium text-paper">
                Nathalia Fava
              </cite>
              <span className="text-sm text-muted">
                Fundadora da SÓC.IA · Advogada, empresária e gestora de
                escritório
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={
                reduce === true
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="mt-7 max-w-lg space-y-4 text-[15px] leading-relaxed text-paper/65"
            >
              <p>
                A Caixa Preta SÓC.IA nasceu da prática de quem vive a gestão de
                um escritório de advocacia todos os dias.
              </p>
              <p>
                Eu reuni procedimentos, modelos, ferramentas e estruturas de IA
                criadas ou utilizadas na operação real do meu escritório para
                que você possa adaptar tudo à sua realidade, sem passar meses
                tentando organizar o que já poderia estar pronto.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
