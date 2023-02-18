import Image from "next/image";
import Link from "next/link";

const Message = ({ link, msg }) => {
  return (
    <div className="hover:bg-white/10 rounded transition">
      <Link href={link}>
        <div className="flex items-center gap-2 p-3 relative">
          <div className="w-4 h-4 relative invert">
            <Image src={"/svgs/chat.svg"} alt="Chat" fill={true} />
          </div>

          <div className="capitalize truncate text-sm flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
            {msg}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Message;
