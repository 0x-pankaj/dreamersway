import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  url: string; // The actual image URL
  description: string;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram: string;
    linkedin: string;
  };
}

export function TeamMember({
  name,
  role,
  url,
  description,
  socials,
}: TeamMemberProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-sky-100 transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-sky-100 transition-all">
          <Image
            src={url}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-sky-600 font-medium mb-4">{role}</p>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-xs mx-auto">
            {description}
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-3">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
