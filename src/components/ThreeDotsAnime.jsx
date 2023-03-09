import { useEffect } from "react";

const ThreeDotsAnimation = () => {
  useEffect(() => {
    const dots = document.querySelectorAll(".dot");

    setInterval(() => {
      dots.forEach((dot, index) => {
        if (index === 0) {
          dot.classList.toggle("dot-1");
        } else if (index === 1) {
          setTimeout(() => {
            dot.classList.toggle("dot-2");
          }, index * 100);
        } else if (index === 2) {
          setTimeout(() => {
            dot.classList.toggle("dot-3");
          }, index * 100);
        }
      });
    }, 300);
  }, []);

  return (
    <div className="flex items-center">
      <span className="dot mr-1 dark:bg-white/60 bg-black/60"></span>
      <span className="dot mr-1 dark:bg-white/60 bg-black/60"></span>
      <span className="dot mr-1 dark:bg-white/60 bg-black/60"></span>

      <style jsx>{`
        .dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }

        .dot-1 {
          animation: dot-animation-1 0.6s infinite ease-in-out;
        }

        .dot-2 {
          animation: dot-animation-2 0.6s infinite ease-in-out;
        }

        .dot-3 {
          animation: dot-animation-3 0.6s infinite ease-in-out;
        }

        @keyframes dot-animation-1 {
          to {
            transform: translateX(8px);
          }
        }

        @keyframes dot-animation-2 {
          from {
            transform: translateX(-8px);
          }
          to {
            transform: translateX(8px);
          }
        }

        @keyframes dot-animation-3 {
          from {
            transform: translateX(-16px);
          }
          to {
            transform: translateX(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeDotsAnimation;
